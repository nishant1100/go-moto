from rest_framework import serializers
from .models import Car, CarImage
from .models import Booking

class CarImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarImage
        fields = ['image']

class CarSerializer(serializers.ModelSerializer):
    images = CarImageSerializer(many=True, read_only=True)

    class Meta:
        model = Car
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    car = CarSerializer()

    class Meta:
        model = Booking
        fields = [
            'id',
            'car',
            'pick_up_date',
            'drop_off_date',
            'total_price',
            'status',
            'payment_method'
        ]
