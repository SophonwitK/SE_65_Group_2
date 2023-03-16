from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes,authentication_classes,parser_classes
from givepaws.models import Hospital,UsersUser,Authen,Authenimage,AuthenCheck,Paymentcard,Card,Donatetopic,CardImg
from rest_framework.parsers import JSONParser 
from givepaws.serializers import (HospitalSerializer,UsersUserSerializer,AuthenSerializer,AuthenimageSerializer,
                                  AuthenCheckSerializer,PaymentCardSerializer,CardSerializer,DonateTopicSerializer)
from rest_framework.permissions import IsAuthenticated,AllowAny,IsAdminUser,IsAuthenticatedOrReadOnly
from django.views.decorators.csrf import csrf_exempt
from givepaws.jwt import JWTAuthentication
import jwt,os
from users.models import User



@api_view(['GET', 'POST'])
@authentication_classes([JWTAuthentication]) #check jwt token are correct or not?
@permission_classes([IsAdminUser]) #check user permission isAdmin = is_staff = true in user_users in database
def authen_check_list(request):
    if request.method == 'GET': #return all object
        authen_checks = AuthenCheck.objects.all()
        authen_checks_serializer = AuthenCheckSerializer( authen_checks, many=True)
        return Response( authen_checks_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST': #create object
        authen_check_data = JSONParser().parse(request)
        authen_check_serializer = AuthenCheckSerializer(data=authen_check_data)
        if authen_check_serializer.is_valid():
            authen_check_serializer.save()
            return Response(authen_check_serializer.data, status=status.HTTP_201_CREATED) 
        return Response(authen_check_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT', 'DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAdminUser])
def authen_check_detail(request, pk):
    try:
        authen_check = AuthenCheck.objects.get(pk=pk)
    except:
        return Response(status=status.HTTP_204_NO_CONTENT) 
    if request.method == 'GET': #return sigle object
        authen_check_serializer = AuthenCheckSerializer(authen_check)
        if authen_check:
            return Response(authen_check_serializer.data, status=status.HTTP_200_OK) 
    elif request.method == 'PUT': #update object
        authen_check_data = JSONParser().parse(request) 
        authen_check_serializer = AuthenCheckSerializer( authen_check, data=authen_check_data) 
        if  authen_check_serializer.is_valid(): 
            authen_check_serializer.save() 
            return Response(authen_check_serializer.data) 
        return Response(authen_check_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    elif request.method == 'DELETE': #delete object
        authen_check.delete() 
        return Response({'message': 'authen check was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def user_check_authen(request, pk):
    try:
        authen_check = AuthenCheck.objects.get(authen__user=pk)
    except:
        return Response(status=status.HTTP_204_NO_CONTENT) 
    authen_check_serializer = AuthenCheckSerializer(authen_check)
    if authen_check:
        return Response(authen_check_serializer.data, status=status.HTTP_200_OK) 



@api_view(['GET', 'POST'])
@authentication_classes([JWTAuthentication]) #check jwt are correct or not?
@permission_classes([IsAdminUser]) #check user permission isAdmin = is_staff = true in user_users in database
def hospital_list(request):
    if request.method == 'GET': #return all object
        hospitals = Hospital.objects.all()
        hospitals_serializer = HospitalSerializer( hospitals, many=True)
        return Response( hospitals_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST': #create object
        hospital_data = JSONParser().parse(request)
        hospital_serializer = HospitalSerializer(data=hospital_data)
        if hospital_serializer.is_valid():
            hospital_serializer.save()
            return Response(hospital_serializer.data, status=status.HTTP_201_CREATED) 
        return Response(hospital_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT', 'POST', 'DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAdminUser])
def hospital_detail(request, pk):
    try:
        hospital = Hospital.objects.get(pk=pk)
    except:
        return Response(status=status.HTTP_204_NO_CONTENT) 
    if request.method == 'GET': #return sigle object
        hospital_serializer = HospitalSerializer(hospital)
        if hospital:
            return Response(hospital_serializer.data, status=status.HTTP_200_OK) 
    elif request.method == 'PUT': #update object
        hospital_data = JSONParser().parse(request) 
        hospital_serializer = HospitalSerializer( hospital, data=hospital_data) 
        if  hospital_serializer.is_valid(): 
            hospital_serializer.save() 
            return Response(hospital_serializer.data) 
        return Response(hospital_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    elif request.method == 'DELETE': #delete object
        hospital.delete() 
        return Response({'message': 'Hospital was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
@authentication_classes([JWTAuthentication]) 
@permission_classes([IsAdminUser]) 
def user_list(request):
    if request.method == 'GET': 
        token = request.COOKIES.get('jwt')
        payload = jwt.decode(token, "secret", algorithms=["HS256"])
        user = User.objects.filter(id=payload['id']).first()
        users = UsersUser.objects.all().exclude(id=user.id)
        users_serializer = UsersUserSerializer( users, many=True)
        return Response( users_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        user_data = JSONParser().parse(request)
        user_serializer = UsersUserSerializer(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_201_CREATED) 
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT', 'POST', 'DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAdminUser]) 
def user_detail(request, pk):
    try:
       user = UsersUser.objects.get(pk=pk)
    except:
        return Response(status=status.HTTP_204_NO_CONTENT) 
    if request.method == 'GET':
        user_serializer = UsersUserSerializer(user)
        if user:
            return Response(user_serializer.data, status=status.HTTP_200_OK) 
    elif request.method == 'PUT': 
        user_data = JSONParser().parse(request) 
        user_serializer = UsersUserSerializer( user, data=user_data) 
        if  user_serializer.is_valid(): 
            user_serializer.save() 
            return Response(user_serializer.data) 
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    elif request.method == 'DELETE': 
        user.delete() 
        return Response({'message': 'User was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    

@api_view(['GET', 'POST'])
@authentication_classes([JWTAuthentication]) 
@permission_classes([IsAuthenticated]) 
def authen_list(request):
    if request.method == 'GET': 
        authens = Authen.objects.all()
        authens_serializer = AuthenSerializer( authens, many=True)
        return Response( authens_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        authen_serializer =AuthenSerializer(data=request.data)
        if authen_serializer.is_valid():
            authen_serializer.save()
            return Response(authen_serializer.data, status=status.HTTP_201_CREATED) 
        return Response(authen_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT', 'POST', 'DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated]) 
def authen_detail(request, pk):
    try:
       authen = Authen.objects.get(pk=pk)
    except:
        return Response(status=status.HTTP_204_NO_CONTENT) 
    if request.method == 'GET':
        authen_serializer = AuthenSerializer(authen)
        if authen:
            return Response(authen_serializer.data, status=status.HTTP_200_OK) 
    elif request.method == 'PUT': 
        authen_data = JSONParser().parse(request) 
        authen_serializer = AuthenSerializer(authen, data=authen_data) 
        if  authen_serializer.is_valid(): 
            authen_serializer.save() 
            return Response(authen_serializer.data) 
        return Response(authen_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    elif request.method == 'DELETE':
        images = Authenimage.objects.all().filter(authen=pk)
        for image in images:
             os.remove(image.image.path)
        authen.delete() 
        return Response({'message': 'authen was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    

@api_view(['GET', 'POST'])
@authentication_classes([JWTAuthentication]) 
@permission_classes([IsAuthenticated]) 
def authenimages_list(request):
    if request.method == 'GET': 
        authenimages = Authenimage.objects.all()
        authenimages_serializer = AuthenimageSerializer( authenimages, many=True)
        return Response( authenimages_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        authenimage_serializer = AuthenimageSerializer(data=request.data)
        if authenimage_serializer.is_valid():
            authenimage_serializer.save()
            return Response(authenimage_serializer.data, status=status.HTTP_201_CREATED) 
        return Response(authenimage_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT', 'POST', 'DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated]) 
def authenimages_detail(request, pk):
    try:
       authenimage = Authenimage.objects.get(pk=pk)
    except:
        return Response({'message' : 'no content'}, status=status.HTTP_204_NO_CONTENT) 
    if request.method == 'GET':
        authenimage_serializer = AuthenimageSerializer(authenimage)
        if authenimage:
            return Response(authenimage_serializer.data, status=status.HTTP_200_OK) 
    elif request.method == 'PUT': 
        authenimage_serializer = AuthenimageSerializer(authenimage, data=request.data) 
        if  authenimage_serializer.is_valid(): 
            authenimage_serializer.save() 
            return Response(authenimage_serializer.data) 
        return Response(authenimage_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    elif request.method == 'DELETE': 
        authenimage.delete() 
        return Response({'message': 'authen was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated]) 
def check_authen_detail(request, pk):
    try:
        authen = Authen.objects.get(user=pk)
    except:
        return Response(status=status.HTTP_204_NO_CONTENT) 
    authen_serializer = AuthenSerializer(authen)
    if authen:
        return Response(authen_serializer.data, status=status.HTTP_200_OK) 

@api_view(['GET','PUT', 'POST', 'DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated]) 
def authenimages_detail(request, pk):
    try:
       authenimage = Authenimage.objects.get(pk=pk)
    except:
        return Response({'message' : 'no content'}, status=status.HTTP_204_NO_CONTENT) 
    if request.method == 'GET':
        authenimage_serializer = AuthenimageSerializer(authenimage)
        if authenimage:
            return Response(authenimage_serializer.data, status=status.HTTP_200_OK) 
    elif request.method == 'PUT': 
        authenimage_serializer = AuthenimageSerializer(authenimage, data=request.data) 
        if  authenimage_serializer.is_valid(): 
            authenimage_serializer.save() 
            return Response(authenimage_serializer.data) 
        return Response(authenimage_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    elif request.method == 'DELETE': 
        authenimage.delete() 
        return Response({'message': 'authen was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    
@api_view(['GET', 'POST'])
@authentication_classes([JWTAuthentication]) 
@permission_classes([IsAuthenticated]) 
def payment_list(request):
    if request.method == 'GET': 
        payments = Paymentcard.objects.all()
        payment_serializer = PaymentCardSerializer( payments, many=True)
        return Response( payment_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        payment_serializer = PaymentCardSerializer(data=request.data)
        if payment_serializer.is_valid():
            payment_serializer.save()
            return Response(payment_serializer.data, status=status.HTTP_201_CREATED) 
        return Response(payment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET','PUT', 'POST', 'DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated]) 
def payments_detail(request, pk):
    try:
      payment = Paymentcard.objects.get(pk=pk)
    except:
        return Response({'message' : 'no content'}, status=status.HTTP_204_NO_CONTENT) 
    if request.method == 'GET':
        payment_serializer =PaymentCardSerializer(payment)
        if payment:
            return Response(payment_serializer.data, status=status.HTTP_200_OK) 
    elif request.method == 'PUT': 
        payment_serializer = PaymentCardSerializer(payment, data=request.data,partial=True) 
        if  payment_serializer.is_valid(): 
            os.remove(payment.paymentcardimg.path) 
            payment_serializer.save() 
            return Response(payment_serializer.data) 
        return Response(payment_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    elif request.method == 'DELETE':
        os.remove(payment.paymentcardimg.path) 
        payment.delete() 
        return Response({'message': 'authen was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated]) 
def get_user_payments(request, pk):
    try:
        payment = Paymentcard.objects.all().filter(user=pk)
    except:
        return Response({'message' : 'no content'}, status=status.HTTP_204_NO_CONTENT) 
    if request.method == 'GET':
        payment_serializer =PaymentCardSerializer(payment, many=True)
        if payment:
            return Response(payment_serializer.data, status=status.HTTP_200_OK) 

@api_view(['GET', 'POST'])
@authentication_classes([JWTAuthentication]) 
@permission_classes([IsAuthenticated]) 
def card_list(request):
    if request.method == 'GET': 
        cards = Card.objects.all()
        card_serializer = CardSerializer( cards, many=True)
        return Response( card_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        card_serializer = CardSerializer(data=request.data)
        if card_serializer.is_valid():
            card_serializer.save()
            return Response(card_serializer.data, status=status.HTTP_201_CREATED) 
        return Response(card_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([JWTAuthentication]) 
@permission_classes([IsAuthenticated]) 
def get_user_card(request,pk):
    try:
        card = Card.objects.all().filter(user=pk)
    except:
        return Response({'message' : 'no content'}, status=status.HTTP_204_NO_CONTENT) 
    if request.method == 'GET':
        card_serializer =CardSerializer(card, many=True)
        if card:
            return Response(card_serializer.data, status=status.HTTP_200_OK) 
    
@api_view(['GET','POST', 'DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated]) 
def card_detail(request, pk):
    try:
      payment = Card.objects.get(pk=pk)
    except:
        return Response({'message' : 'no content'}, status=status.HTTP_204_NO_CONTENT) 
    if request.method == 'GET':
        payment_serializer = CardSerializer(payment)
        if payment:
            return Response(payment_serializer.data, status=status.HTTP_200_OK) 
    elif request.method == 'DELETE':
        images = CardImg.objects.all().filter(card=pk)
        for image in images:
             os.remove(image.image.path)
        image = Card.objects.get(pk=pk)
        os.remove(image.receiptimgpath.path) 
        payment.delete() 
        return Response({'message': 'Card was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
@authentication_classes([JWTAuthentication]) 
@permission_classes([IsAuthenticated]) 
def donate_topic_list(request):
    if request.method == 'GET': 
        donate = Donatetopic.objects.all()
        donate_serializer = DonateTopicSerializer( donate, many=True)
        return Response( donate_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        donate_serializer = DonateTopicSerializer(data=request.data)
        if donate_serializer.is_valid():
            donate_serializer.save()
            return Response(donate_serializer.data, status=status.HTTP_201_CREATED) 
        return Response(donate_serializer.errors, status=status.HTTP_400_BAD_REQUEST)





