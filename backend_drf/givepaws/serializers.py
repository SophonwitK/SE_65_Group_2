from rest_framework import serializers 
from givepaws.models import Hospital,UsersUser,Authen,Authenimage,AuthenCheck
import os

class RelatedFieldAlternative(serializers.PrimaryKeyRelatedField):
    def __init__(self, **kwargs):
        self.serializer = kwargs.pop('serializer', None)
        if self.serializer is not None and not issubclass(self.serializer, serializers.Serializer):
            raise TypeError('"serializer" is not a valid serializer class')

        super().__init__(**kwargs)

    def use_pk_only_optimization(self):
        return False if self.serializer else True

    def to_representation(self, instance):
        if self.serializer:
            return self.serializer(instance, context=self.context).data
        return super().to_representation(instance)

class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = ['hospitalid',
                  'name',
                  'email',
                  'address',
                  'tel',
                  'isaccept']

class UsersUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsersUser
        fields = [
                  'id',
                  'date_joined',
                  'name',
                  'email',
                  'username',
                  'is_staff',
                  'is_employee',
                  'is_hospitalcoordinator',
                  'is_authen']

class AuthenimageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Authenimage
        fields = ['id','authen','image']

class AuthenSerializer(serializers.ModelSerializer):
    user = RelatedFieldAlternative(queryset=UsersUser.objects.all(), serializer=UsersUserSerializer)
    images = AuthenimageSerializer(many=True,read_only=True)
    uploaded_images = serializers.ListField(
        child = serializers.ImageField(max_length = 1000000, allow_empty_file = False, use_url = False),
        write_only=True)

    class Meta:
        model = Authen
        fields = ['authid',
                  'firstname',
                  'surname',
                  'dob',
                  'address',
                  'tel',
                  'dateauthen',
                  'idcard',
                  'images',
                  'uploaded_images',
                  'user',
                  ]
        
    def create(self, validated_data):
        uploaded_imgs = validated_data.pop("uploaded_images")
        authen = Authen.objects.create(**validated_data)
        for image in uploaded_imgs:
            newAuthenImg = Authenimage.objects.create(authen=authen,image=image)

        return authen

class AuthenCheckSerializer(serializers.ModelSerializer):
    authen = RelatedFieldAlternative(read_only=True)

    class Meta:
        model = AuthenCheck
        fields = ['id',
                  'comment',
                  'isapprove',
                  'authen']