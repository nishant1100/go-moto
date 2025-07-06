from django.shortcuts import render, redirect
from .forms import UserForm
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm,AuthenticationForm
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import IDVerification
from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator
from django.shortcuts import get_object_or_404
from accounts.models import Favourite
from booking.models import Car
from django.core.files.base import ContentFile
from datetime import timedelta
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import UserSerializer
from django.contrib import messages
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes


# Create your views here.
User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully."}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def api_login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    print("Received email:", email)
    print("Received password:", password)

    user = authenticate(request, username=email, password=password)
    print("Authenticated user:", user)

    if user is not None:
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'message': 'Login successful.',
            'token': token.key,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        })
    else:
        return Response({'error': 'Invalid email or password.'}, status=status.HTTP_401_UNAUTHORIZED)


def signup(request):
    form = UserForm()
    if request.method == 'POST':
        form = UserForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, 'Account created successfully. You may now Login.')
            return redirect('login')
        else:
            messages.get_messages(request).used = True
    context = {"form": form}
    return render(request, 'signup.html', context)

def login_view(request):
    form = AuthenticationForm()
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')
            else:
                pass
            #     messages.error(request, 'Invalid username or password.')
        else:
            messages.error(request, 'Invalid username or password.')
            messages.get_messages(request).used = True

    context = {"form": form}
    return render(request, 'login.html', context)


def logout_view(request):
    logout(request)
    return redirect('home')




from django.core.exceptions import ValidationError
from django.core.files.base import ContentFile
from django.core.validators import FileExtensionValidator
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from datetime import datetime
from .models import IDVerification

@login_required
def verify_id(request):
    try:
        id_verification = IDVerification.objects.get(user=request.user)
        if id_verification.status == 'verified':
            messages.error(request, 'Your ID has already been verified.')
            return render(request, 'verify_id.html')
        elif id_verification.status == 'pending':
            messages.error(request, 'Your ID is under verification. Please wait.')
            return render(request, 'verify_id.html')
    except IDVerification.DoesNotExist:
        pass

    if request.method == 'POST':
        id_image = request.FILES.get('id_photo')
        name = request.POST.get('name')
        dob = request.POST.get('dob')
        address = request.POST.get('address')

        if id_image and name and dob and address:
            validate_image = FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png'])
            try:
                validate_image(id_image)
                sanitized_filename = id_image.name.replace(' ', '_')
                id_image.file = ContentFile(id_image.read(), name=sanitized_filename)
                dob = datetime.strptime(dob, '%Y-%m-%d 00:00').date()
                if dob > datetime.now().date() - timedelta(days=18*365):
                    messages.error(request, 'You must be at least 18 years old.')
                    return render(request, 'verify_id.html')
                IDVerification.objects.create(user=request.user, id_image=id_image, name=name, dob=dob, address=address)
                messages.success(request, 'ID image and details uploaded successfully. They will be verified soon.')
            except ValidationError:
                messages.error(request, 'Invalid file type. Please upload a jpg, jpeg, or png image.')
        else:
            messages.error(request, 'Please fill in all fields and upload an image.')
    return render(request, 'verify_id.html')


from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Favourite
from booking.models import Car

@login_required(login_url='login')
def toggle_favourite(request):
    car_id = request.POST.get('car_id')
    car = get_object_or_404(Car, id=car_id)
    favourited = False

    if Favourite.objects.filter(user=request.user, car=car).exists():
        Favourite.objects.filter(user=request.user, car=car).delete()
        favourited = False
    else:
        Favourite.objects.create(user=request.user, car=car)
        favourited = True

    print(favourited)

    return JsonResponse({'favourited': favourited})


@login_required(login_url='login')
def favourite_cars(request):
    favourites = Favourite.objects.filter(user=request.user)
    return render(request, 'favourites.html', {'favourites': favourites})

@login_required(login_url='login')
def check_favourite(request):
    car_id = request.POST.get('car_id')
    favourited = Favourite.objects.filter(user=request.user, car_id=car_id).exists()
    return JsonResponse({'favourited': favourited})

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        # Add more fields if needed
    })

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.core.files.base import ContentFile
import base64, uuid

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    user = request.user
    data = request.data

    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)

    avatar_data = data.get('avatar')
    if avatar_data and avatar_data.startswith('data:image'):
        format, imgstr = avatar_data.split(';base64,') 
        ext = format.split('/')[-1]
        file_name = f"{uuid.uuid4()}.{ext}"
        user.avatar.save(file_name, ContentFile(base64.b64decode(imgstr)), save=False)

    license_data = data.get('license_front')
    if license_data and license_data.startswith('data:image'):
        format, imgstr = license_data.split(';base64,') 
        ext = format.split('/')[-1]
        file_name = f"{uuid.uuid4()}.{ext}"
        user.license_front.save(file_name, ContentFile(base64.b64decode(imgstr)), save=False)

    if data.get('password'):
        user.set_password(data['password'])

    user.save()
    return Response({"message": "Profile updated successfully"}, status=status.HTTP_200_OK)



from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

User = get_user_model()

# Step 1: Send reset email
@api_view(['POST'])
@permission_classes([AllowAny])
def send_reset_email(request):
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'No user found with this email.'}, status=status.HTTP_404_NOT_FOUND)

    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = default_token_generator.make_token(user)

    reset_link = f"http://localhost:5173/reset-password/{uid}/{token}"

    send_mail(
        subject='Password Reset Request',
        message=f'Hi {user.username},\n\nClick the link below to reset your password:\n{reset_link}',
        from_email='noreply@go-moto.com',
        recipient_list=[email],
        fail_silently=False,
    )

    return Response({'message': 'Password reset email sent.'}, status=status.HTTP_200_OK)


# Step 2: Handle password reset form submission
@api_view(['POST'])
@permission_classes([AllowAny])
def reset_password_confirm(request, uidb64, token):
    password = request.data.get('password')
    confirm_password = request.data.get('confirm_password')

    if not password or not confirm_password:
        return Response({'error': 'Both password fields are required.'}, status=status.HTTP_400_BAD_REQUEST)
    if password != confirm_password:
        return Response({'error': 'Passwords do not match.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (User.DoesNotExist, ValueError, TypeError, OverflowError):
        return Response({'error': 'Invalid link.'}, status=status.HTTP_400_BAD_REQUEST)

    if not default_token_generator.check_token(user, token):
        return Response({'error': 'Invalid or expired token.'}, status=status.HTTP_400_BAD_REQUEST)

    user.set_password(password)
    user.save()
    return Response({'message': 'Password has been reset successfully.'}, status=status.HTTP_200_OK)
