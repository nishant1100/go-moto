from django.shortcuts import render
from .forms import CarSearchForm
from .models import Car, CarImage
from decimal import Decimal
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect
from .models import Booking, Car
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from vroom.settings import EMAIL_HOST_USER
from django.urls import reverse
from django.views.decorators.http import require_GET
from django.http import JsonResponse
from django.core.mail import send_mail
from django.shortcuts import render
from .forms import ContactForm
from accounts.models import CustomUser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from decimal import Decimal
from .models import Car, Booking

from accounts.models import IDVerification
from accounts.models import Favourite


def search_cars(request):
    if request.method == 'POST':
        form = CarSearchForm(request.POST)
        if form.is_valid():
            pickup_datetime = form.cleaned_data['pickup_datetime']
            dropoff_datetime = form.cleaned_data['dropoff_datetime']
            location = form.cleaned_data['location']

            # Query available cars within the specified date range and location
            available_cars = Car.objects.filter(
                # availability='available',
                car_location=location
            )

            # Calculate duration in hours
            duration_hours = Decimal((dropoff_datetime - pickup_datetime).total_seconds()) / Decimal(3600)

            # Calculate price for each car
            for car in available_cars:
                car.total_price = round(duration_hours * car.hourly_rate, 2)
            
            return render(request, 'available_cars.html', {'cars': available_cars})
    else:
        form = CarSearchForm()
    
    return render(request, 'Vroom.html', {'form': form})

def available_cars(request):
    cars = Car.objects.all()

    car_location = request.GET.getlist('car_location')
    type = request.GET.getlist('type')
    availability = request.GET.getlist('availability')
    query = request.GET.get('q', '')  # Use an empty string as the default value

    print(car_location)

    # if request.GET:
    if 'q' in request.GET:  # Add this line to apply the search query filter
        cars = cars.filter(model__icontains=query)
    if 'car_location' in request.GET:
        cars = cars.filter(car_location__in=car_location)
    if 'type' in request.GET:
        cars = cars.filter(type__in=type)
    if 'availability' in request.GET:
        cars = cars.filter(availability__in=availability)
        

    return render(request, 'availablecar.html', {
        'cars': cars,
        'car_location': car_location,
        'type': type,
        'availability': availability,
        'query': query, 
        # Pass other context variables as needed
    })

def car_list_api(request):
    cars = Car.objects.all()

    # Filtering
    car_location = request.GET.getlist('car_location')
    types = request.GET.getlist('type')
    availability = request.GET.getlist('availability')

    if car_location:
        cars = cars.filter(car_location__in=car_location)
    if types:
        cars = cars.filter(type__in=types)
    if availability:
        cars = cars.filter(availability__in=availability)

    # Serializing
    car_data = []
    for car in cars:
        # ✅ Get additional images
        images = CarImage.objects.filter(car=car)
        image_urls = [img.image.url for img in images]

        # ✅ Get equipment list (assuming ManyToMany)
        equipment_list = list(car.equipment.values_list('name', flat=True)) if hasattr(car, 'equipment') else []

        car_data.append({
            'id': car.id,
            'name': car.model,
            'type': car.type,
            'price': float(car.daily_rate),
            'transmission': car.transmission,
            'ac': car.has_ac,
            'doors': car.doors,
            'fuel': car.fuel,
            'seats': car.seats,
            'mileage': car.mileage,
            'luggage': car.luggage,
            'location': car.car_location,
            'available': car.availability == 'available',
            'image': car.image.url if car.image else None,
            'images': image_urls,
            'equipment': equipment_list,
        })

    return JsonResponse({'cars': car_data})

def car_detail_api(request, id):
    car = get_object_or_404(Car, id=id)
    images = CarImage.objects.filter(car=car)
    image_urls = [img.image.url for img in images]

    # Collect all equipment flags dynamically
    equipment_map = {
        'ABS': car.abs,
        'Seat Belt Warning': car.seat_belt_warning,
        'Cruise Control': car.cruise_control,
        'Air Conditioner': car.air_conditioner,
        'Air Bags': car.air_bags,
        'GPS Navigation System': car.gps_navigation
    }
    selected_equipment = [key for key, value in equipment_map.items() if value]

    data = {
        'id': car.id,
        'name': car.model,
        'type': car.type,
        'price': float(car.daily_rate),
        'transmission': car.transmission,
        'fuel': car.fuel,
        'doors': car.doors,
        'ac': car.has_ac,
        'seats': car.seats,
        'mileage': float(car.mileage),
        'distance': float(car.distance),
        'luggage': car.luggage,
        'available': car.availability == 'available',
        'location': car.car_location,
        'image': car.image.url if car.image else None,
        'images': image_urls,
        'equipment': selected_equipment,
    }

    return JsonResponse(data)


@login_required(login_url='login')
def book_car(request, car_id):
    # car = Car.objects.prefetch_related('reviews').get(id=car_id)
    
    car = get_object_or_404(Car, id=car_id)
    approved_reviews = car.reviews.filter(approved=True)
    
    # Check if the user is verified
    try:
        id_verification = IDVerification.objects.get(user=request.user)
        id_verification_status = id_verification.status == 'verified'
    except IDVerification.DoesNotExist:
        id_verification_status = False
    
    # Check if the user has already booked this car
    if Booking.objects.filter(user=request.user, car=car, status='pending').exists():
        return render(request, 'booking.html', {'car': car, 'message': 'You have already booked this car.', 'isbooked': True,'reviews': approved_reviews})
    
    if request.method == 'POST':
        form = CarSearchForm(request.POST)
        if form.is_valid():
            pickup_datetime = form.cleaned_data['pickup_datetime']
            dropoff_datetime = form.cleaned_data['dropoff_datetime']

            duration_hours = Decimal((dropoff_datetime - pickup_datetime).total_seconds()) / Decimal(3600)
            total_price = round(duration_hours * car.hourly_rate, 2)

            # Convert pickup_datetime and dropoff_datetime to strings
            pickup_datetime_str = pickup_datetime.strftime('%Y-%m-%d %H:%M:%S')
            dropoff_datetime_str = dropoff_datetime.strftime('%Y-%m-%d %H:%M:%S')

            # Create a context dictionary
            context = {
                'car': car,
                'pickup_datetime': pickup_datetime_str,
                'dropoff_datetime': dropoff_datetime_str,
                'total_price': total_price,
            }

            # Redirect to the payment page with necessary data
            return render(request, 'payment.html', context)
        
    else:
        form = CarSearchForm()
    return render(request, 'booking.html', {'car': car,'form':form, 'id_verification_status': id_verification_status, 'reviews': approved_reviews})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_book_car(request, car_id):
    car = get_object_or_404(Car, id=car_id)
    
    # Check if already booked
    if Booking.objects.filter(user=request.user, car=car, status='pending').exists():
        return Response({"error": "You have already booked this car."}, status=400)

    pickup_datetime = request.data.get('pickup_datetime')
    dropoff_datetime = request.data.get('dropoff_datetime')

    if not pickup_datetime or not dropoff_datetime:
        return Response({"error": "Pickup and dropoff datetime required."}, status=400)
    
    # Parse datetime strings to datetime objects
    from django.utils.dateparse import parse_datetime
    pickup_dt = parse_datetime(pickup_datetime)
    dropoff_dt = parse_datetime(dropoff_datetime)
    if not pickup_dt or not dropoff_dt:
        return Response({"error": "Invalid datetime format."}, status=400)
    
    # Calculate duration and price
    duration_hours = (dropoff_dt - pickup_dt).total_seconds() / 3600
    total_price = round(duration_hours * car.hourly_rate, 2)

    # Create booking record
    booking = Booking.objects.create(
        user=request.user,
        car=car,
        pickup_datetime=pickup_dt,
        dropoff_datetime=dropoff_dt,
        total_price=total_price,
        status='pending',
        payment_method=request.data.get('payment_method', 'unknown')
    )

    return Response({
        "booking_id": booking.id,
        "car": car.name,
        "total_price": total_price,
        "status": booking.status,
        "message": "Booking created successfully."
    }, status=201)

@login_required(login_url='login')
def view_bookings(request):
    bookings = Booking.objects.filter(user=request.user).order_by('-booking_date')
    favourites = Favourite.objects.filter(user=request.user)
    try:
        id_verification = IDVerification.objects.get(user=request.user)
        id_verification_status = id_verification.status == 'verified'
    except IDVerification.DoesNotExist:
        id_verification_status = False
    return render(request, 'userprofile.html', {'bookings': bookings, 'user': request.user, 'id_verification_status': id_verification_status, 'favourites': favourites})


from django.utils import timezone
from datetime import timedelta
from decimal import Decimal

@csrf_exempt
def cancel_booking(request):
    if request.method == 'POST':
        booking_id = request.POST.get('booking_id')
        booking = Booking.objects.get(id=booking_id)

        # Check if the current time is more than 3 hours from the booking time
        if timezone.now() > booking.booking_date + timedelta(hours=3):
            # Deduct 20% from the payment
            booking.estimated_price *=  Decimal('0.2')

        else:
            booking.estimated_price = 0
        # Change the booking status to 'rejected'
        booking.status = 'cancelled'
        # Save the changes
        booking.save()

        return JsonResponse({'status':'ok'})
        
    else:
        return JsonResponse({'status':'error'})
    
from django.contrib import messages

from django.shortcuts import render, get_object_or_404
from django.core.mail import send_mail
from .models import Booking, Car

def payment(request, car_id, pickup_datetime, dropoff_datetime, total_price):
    car = get_object_or_404(Car, id=car_id)

    if request.method == 'POST':
        # Check if a booking already exists
        existing_booking = Booking.objects.filter(user=request.user, car=car, pick_up_date=pickup_datetime, drop_off_date=dropoff_datetime,status='pending').exists()

        if existing_booking:
            # Render the payment page with an error message
            return render(request, 'payment.html', {'car': car, 'pickup_datetime': pickup_datetime, 'dropoff_datetime': dropoff_datetime, 'total_price': total_price, 'error_message': 'You have already booked this car for the selected time range.'})
        else:
            # Create the booking
            Booking.objects.create(user=request.user, car=car, status='pending', estimated_price=total_price, drop_off_date=dropoff_datetime, pick_up_date=pickup_datetime)

            # Send an email to the user
            send_mail(
                f'Booking Successful for Car {car.model} on {pickup_datetime}',
                f'''Your booking has been successful and waiting confiramation by the dealer.
                Car: {car.model}.
                For date {pickup_datetime} to {dropoff_datetime}.
                Total Price: {total_price}.\n
                Thank you for booking with us.
                ''',
                EMAIL_HOST_USER,
                [request.user.email],
                fail_silently=False,
            )

            # Render the payment page with the success message
            return render(request, 'payment.html', {'car': car, 'pickup_datetime': pickup_datetime, 'dropoff_datetime': dropoff_datetime, 'total_price': total_price, 'booking_confirmed': True})

    # Render the payment page
    return render(request, 'payment.html', {'car': car, 'pickup_datetime': pickup_datetime, 'dropoff_datetime': dropoff_datetime, 'total_price': total_price})



from .forms import ReviewForm
from .models import Car  # Import the Car model

def submit_review(request, car_id):
    car = Car.objects.get(id=car_id)  # Retrieve the car from the database
    if request.method == 'POST':
        form = ReviewForm(request.POST)
        if form.is_valid():
            review = form.save(commit=False)
            review.user = request.user
            review.car = car  # Set the car of the review
            review.save()
            return redirect('view_bookings')
    else:
        form = ReviewForm()
    return render(request, 'submit_review.html', {'form': form, 'car': car})  # Pass the car to the template




def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            title = form.cleaned_data['title']
            email = form.cleaned_data['email']
            message = form.cleaned_data['message']

            # Fetch all admin emails
            admin_emails = CustomUser.objects.filter(is_staff=True).values_list('email', flat=True)

            send_mail(
                f'From - {email} | {title}',
                f'From - {email} \n {message}',
                email,
                admin_emails,
                fail_silently=True,
            )

            return render(request, 'contact.html', {'form': form, 'success': True})

    else:
        form = ContactForm()

    return render(request, 'contact.html', {'form': form})

def popular_cars_api(request):
    from .models import Car

    # Get top 4 popular cars by revenue
    popular_cars = Car.get_cars_by_revenue()[:4]

    data = []
    for car in popular_cars:
        data.append({
            'id': car.id,
            'name': car.model,
            'type': car.type,
            'price': float(car.daily_rate),
            'image': car.image.url if car.image else None
        })

    return JsonResponse({'cars': data})