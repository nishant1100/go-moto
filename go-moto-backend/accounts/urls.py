from django.urls import path
from . import views
from .views import register_user, api_login, get_user_profile

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', api_login, name='api_login'),
    path('verify',views.verify_id,name='verify'),
    path('toggle_favourite/', views.toggle_favourite, name='toggle_favourite'),
    path('favourite_cars/', views.favourite_cars, name='favourite_cars'),
    path('check_favourite/', views.check_favourite, name='check_favourite'),
    path('api/profile/', get_user_profile, name='get_user_profile'),
    path('api/profile/update/', views.update_user_profile, name='update_profile'),
]
