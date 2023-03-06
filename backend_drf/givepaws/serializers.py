from rest_framework import serializers 
from givepaws.models import Hospital,UsersUser,Authen,Authenimg

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
                  'isaccept',]

class UsersUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsersUser
        fields = [
                  'id',
                  'is_staff',
                  'date_joined',
                  'name',
                  'email',
                  'username',
                  'is_employee',
                  'is_hospitalcoordinator',
                  'is_authen',]


class AuthenimgSerializer(serializers.ModelSerializer):
    class Meta:
        model = Authenimg
        fields = ['authenimgid',
                  'authid',
                  'emimgpath',]



class AuthenSerializer(serializers.ModelSerializer):
    user = RelatedFieldAlternative(queryset=UsersUser.objects.all(), serializer=UsersUserSerializer)
    authenimg = AuthenimgSerializer(many=True, read_only=True,source='authen')
    class Meta:
        model = Authen
        fields = ['authid',
                  'firstname',
                  'surename',
                  'dob',
                  'address',
                  'tel',
                  'dateauthen',
                  'idcard',
                  'user',
                  'authenimg',
                  ]


