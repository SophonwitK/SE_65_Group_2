from rest_framework import serializers 
from givepaws.models import Hospital,UsersUser,Authen,Authenimage,AuthenCheck,Paymentcard,Donatetopic,Card,CardImg
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
                  'tel']

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
        
class CardImgSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardImg
        fields =  ['id','card','image'] 

class DonateTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donatetopic
        fields = ['donatetopicid',
                  'topic',
                  'amount',
                  'cardid']

class CardSerializer(serializers.ModelSerializer):
    user = RelatedFieldAlternative(queryset=UsersUser.objects.all(), serializer=UsersUserSerializer)
    hospitalid = RelatedFieldAlternative(queryset=Hospital.objects.all(), serializer=HospitalSerializer)
    images = CardImgSerializer(many=True,read_only=True)
    donate_topic = DonateTopicSerializer(many=True,read_only=True)
    uploaded_images = serializers.ListField(
        child = serializers.ImageField(max_length = 1000000, allow_empty_file = False, use_url = False),
        write_only=True)
    class Meta:
        model = Card
        fields = ['cardid',
                  'topic',
                  'description',
                  'date',
                  'cardstatus',
                  'receipttype',
                  'receiptnumber',
                  'receiptimgpath',
                  'price',
                  'hospitalid',
                  'images',
                  'uploaded_images',
                  'donate_topic',
                  'user']
        
    def create(self, validated_data):
        uploaded_imgs = validated_data.pop("uploaded_images")
        card = Card.objects.create(**validated_data)
        for image in uploaded_imgs:
            newAuthenImg = CardImg.objects.create(card=card,image=image)

        return card


class PaymentCardSerializer(serializers.ModelSerializer):
    user = RelatedFieldAlternative(queryset=UsersUser.objects.all(), serializer=UsersUserSerializer)
    donatetopicid = RelatedFieldAlternative(queryset=Donatetopic.objects.all(), serializer=DonateTopicSerializer)

    class Meta:
        model = Paymentcard
        fields = ['paymentcardid',
                  'user',
                  'contribution',
                  'date',
                  'paymentcardimg',
                  'status',
                  'donatetopicid',
                  'comment']
        
    