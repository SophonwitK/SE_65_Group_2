from rest_framework import serializers
from .models import User,HospitalCoordinator,Authen

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'name',
            'email',
            'password',
        ]
        extra_kwargs ={
            'password' : {'write_only': True}
        }

        