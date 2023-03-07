from rest_framework import serializers
from .models import User
import re
from django.core.validators import EmailValidator
from django.db import IntegrityError
from django.core.validators import RegexValidator

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[EmailValidator])
    username = serializers.CharField(
        validators=[
            RegexValidator(
                regex=r'^[A-Za-z0-9@#$%^&+-=]+$',
                message='Username can only contain English letters (both uppercase and lowercase), numbers, or special characters',
                code='invalid_username'
            )
        ]
    )

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'name',
            'email',
            'password',
        ]
        extra_kwargs ={
            'password' : {'write_only': True}
        }
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        pattern = r'^[A-Za-z0-9@#$%^&+-=]+$'
        if not re.match(pattern, password):
            raise serializers.ValidationError("Password must contain only English letters (both uppercase and lowercase) or numbers or special characters.")
        
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance