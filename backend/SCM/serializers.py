# todo/serializers.py

from rest_framework import serializers
from .models import BikeTrend


class BikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BikeTrend
        fields = ('id', 'total_bikes', 'available_bikes', 'timestamp')
