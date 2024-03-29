from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes,authentication_classes,parser_classes
from givepaws.models import (Hospital,UsersUser,Authen,Authenimage,AuthenCheck,Paymentcard,Card,
                             Donatetopic,CardImg,Hospitalcoordinator,Donateaccept,Donar,Report)
from rest_framework.parsers import JSONParser 
from givepaws.serializers import (HospitalSerializer,UsersUserSerializer,AuthenSerializer,AuthenimageSerializer,
                                  AuthenCheckSerializer,PaymentCardSerializer,CardSerializer,DonateTopicSerializer,
                                  HospitalcoordinatorSerializer,DonateacceptSerializer,DonarSerializer,ReportSerializer)
from users.serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny,IsAdminUser,IsAuthenticatedOrReadOnly
from givepaws.jwt import JWTAuthentication
import jwt,os
from users.models import User

from datetime import datetime, timedelta
from django.db.models import Q
from django.db.models import Count
from django.db.models import Sum
\
@api_view(['GET', 'POST'])
@authentication_classes([JWTAuthentication]) #check jwt token are correct or not?
@permission_classes([IsAuthenticated]) #check user permission isAdmin = is_staff = true in user_users in database
def hc_list(request):
    if request.method == 'GET': #return all object
        hc = Hospitalcoordinator.objects.all()
        hc_serializer = HospitalcoordinatorSerializer( hc , many=True)
        return Response(  hc_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST': #create object
        authen_check_serializer = HospitalcoordinatorSerializer(data=request.data)
        if authen_check_serializer.is_valid():
            authen_check_serializer.save()
            return Response(authen_check_serializer.data, status=status.HTTP_201_CREATED) 
        return Response(authen_check_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  

@api_view(['GET','PUT', 'DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def hc_detail(request, pk):

    try:
        hc = Hospitalcoordinator.objects.get(pk=pk)
    except:
        return Response(status=status.HTTP_204_NO_CONTENT) 
    if request.method == 'GET': #return sigle object
        hc2 = Hospitalcoordinator.objects.get(user=pk)
        hc_serializer = HospitalcoordinatorSerializer(hc2)
        if hc_serializer:
            return Response(hc_serializer.data, status=status.HTTP_200_OK) 
    elif request.method == 'PUT': #update object
        hc_serializer = HospitalcoordinatorSerializer( hc, data=request.data) 
        if  hc_serializer.is_valid(): 
            hc_serializer.save() 
            return Response(hc_serializer.data) 
        return Response(hc_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    elif request.method == 'DELETE': #delete object
        hc.delete() 
        return Response({'message': 'authen check was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def get_card_by_id(request, pk):  ### pk mean PimaryKey
    try:
      card = Card.objects.get(pk=pk)
    except:
        return Response({'message' : 'no content'}, status=status.HTTP_204_NO_CONTENT) 
    card_serializer = CardSerializer(card)
    if card:
        return Response(card_serializer.data, status=status.HTTP_200_OK) 
    else:
        return Response({'message' : 'no content'}, status=status.HTTP_204_NO_CONTENT) 
    
@api_view(['PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def close_card_by_id(request, pk):  ### pk mean PimaryKey
    try:
      card = Card.objects.get(pk=pk)
    except:
        return Response({'message' : 'no content'}, status=status.HTTP_204_NO_CONTENT) 
    card_serializer = CardSerializer(card,data=request.data,partial=True)
    if  card_serializer.is_valid():
        card_serializer.save()
        return Response( card_serializer.data, status=status.HTTP_201_CREATED) 
    return Response(card_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

@api_view(['PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def close_topics_by_card_id(request, pk):  ### pk mean PimaryKey
    try:
      donate_topic_list = Donatetopic.objects.all().filter(cardid=pk)
    except:
        return Response({'message' : 'no content'}, status=status.HTTP_204_NO_CONTENT) 
    for topic in donate_topic_list:
        donate_topic_serializer = DonateTopicSerializer(topic,data=request.data,partial=True)
        if  donate_topic_serializer.is_valid():
            donate_topic_serializer.save()
    return Response( donate_topic_serializer.data, status=status.HTTP_201_CREATED) 

    
@api_view(['GET'])
def get_donate_accept_by_card_id(request, pk):
    try:
        donate_accept = Donateaccept.objects.get(cardid=pk)
    except:
        return Response({'message' : 'no content'}, status=status.HTTP_204_NO_CONTENT) 
    donate_accept_serializer = DonateacceptSerializer( donate_accept)
    if  donate_accept:
        return Response(  donate_accept_serializer.data, status=status.HTTP_200_OK) 
    else:
        return Response({'message' : 'no content'}, status=status.HTTP_204_NO_CONTENT) 

@api_view(['GET'])
@authentication_classes([JWTAuthentication]) 
@permission_classes([IsAdminUser]) 
def authen_request_list(request):
    authen = Authen.objects.filter(status=None)
    authen_serializer = AuthenSerializer( authen, many=True)
    return Response( authen_serializer.data, status=status.HTTP_200_OK)



@api_view(['GET', 'POST'])
@authentication_classes([JWTAuthentication]) #check jwt token are correct or not?
@permission_classes([IsAuthenticated]) #check user permission isAdmin = is_staff = true in user_users in database
def authen_check_list(request):
    if request.method == 'GET': #return all object
        authen_checks = AuthenCheck.objects.all()
        authen_checks_serializer = AuthenCheckSerializer( authen_checks, many=True)
        return Response( authen_checks_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST': #create object
        authen_check_serializer = AuthenCheckSerializer(data=request.data)
        if authen_check_serializer.is_valid():
            authen_check_serializer.save()
            return Response(authen_check_serializer.data, status=status.HTTP_201_CREATED) 
        return Response(authen_check_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  

@api_view(['GET','PUT', 'DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated]) #check user permission isAdmin = is_staff = true in user_users in database
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
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated]) 
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
@permission_classes([IsAuthenticated]) 
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
        user_serializer = UsersUserSerializer( user, data=request.data,partial=True) 
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
        authen_serializer = AuthenSerializer(authen, data=request.data) 
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
        donate_serializer = DonateTopicSerializer(data=request.data,many=True)
        if donate_serializer.is_valid():
            donateTopics = donate_serializer.save()
            return Response(DonateTopicSerializer(donateTopics,many=True).data, status=status.HTTP_201_CREATED) 
        return Response(donate_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
@authentication_classes([JWTAuthentication]) 
@permission_classes([IsAuthenticated]) 
def donate_accept_list(request):
    if request.method == 'GET': 
        donate_accept = Donateaccept.objects.all()
        donate_accept_serializer = DonateacceptSerializer( donate_accept, many=True)
        return Response( donate_accept_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        donate_accept_serializer = DonateacceptSerializer(data=request.data)
        if donate_accept_serializer.is_valid():
            donate_accept_serializer.save()
            return Response(donate_accept_serializer.data, status=status.HTTP_201_CREATED) 
        return Response(donate_accept_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET','POST', 'DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated]) 
def donate_accept_detail(request, pk):
    try:
        donate_accept = Donateaccept.objects.get(cardid=pk)
    except:
        return Response({'message' : 'no content'}, status=status.HTTP_204_NO_CONTENT) 
    if request.method == 'GET':
        donate_accept_serializer = DonateacceptSerializer( donate_accept)
        if  donate_accept:
            return Response(  donate_accept_serializer.data, status=status.HTTP_200_OK) 
        else:
            return Response({'message' : 'no content'}, status=status.HTTP_204_NO_CONTENT) 


@api_view(['GET'])
def approve_card_list(request):
    try:
        card = Card.objects.all().filter(cardstatus="approve")
    except:
        return Response({'message' : 'no content'}, status=status.HTTP_204_NO_CONTENT) 
    card_serializer =CardSerializer(card, many=True)
    if card_serializer:
        return Response(card_serializer.data, status=status.HTTP_200_OK) 
    return Response({'message' : 'no content'}, status=status.HTTP_204_NO_CONTENT) 

@api_view(['GET'])
def complete_card_list(request):
    try:
        card = Card.objects.all().filter(cardstatus="complete")
    except:
        return Response({'message' : 'no content'}, status=status.HTTP_204_NO_CONTENT) 
    card_serializer =CardSerializer(card, many=True)
    if card_serializer:
        return Response(card_serializer.data, status=status.HTTP_200_OK) 
    return Response({'message' : 'no content'}, status=status.HTTP_204_NO_CONTENT) 
    



@api_view(['GET'])
def get_all_donar_by_card_id(request, pk):
    try:
        donar = Donar.objects.all().filter(cardid=pk)
    except:
        return Response({'message' : 'no content'}, status=status.HTTP_204_NO_CONTENT) 
    donar_serializer =  DonarSerializer( donar, many=True)
    if  donar:
        return Response(  donar_serializer.data, status=status.HTTP_200_OK) 
    else:
        return Response({'message' : 'no content'}, status=status.HTTP_204_NO_CONTENT) 


@api_view(['GET', 'POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated]) 
def donar_list(request):
    if request.method == 'GET': 
        donar = Donar.objects.all()
        donar_serializer = DonarSerializer( donar, many=True)
        return Response( donar_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        donar_serializer = DonarSerializer(data=request.data)
        if donar_serializer.is_valid():
            donar_serializer.save()
            return Response(donar_serializer.data, status=status.HTTP_201_CREATED) 
        return Response(donar_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','POST', 'DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated]) 
def donar_detail(request, pk):
    try:
      donar = Donar.objects.get(pk=pk)
    except:
        return Response({'message' : 'no content'}, status=status.HTTP_204_NO_CONTENT) 
    if request.method == 'GET':
        donar_serializer = DonarSerializer( donar)
        if  donar:
            return Response(donar_serializer.data, status=status.HTTP_200_OK) 
    elif request.method == 'DELETE':
        os.remove(donar.img.path) 
        donar.delete() 
        return Response({'message': 'Card was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated]) 
def report_list(request):
    if request.method == 'GET': 
        report = Report.objects.all()
        report_serializer = ReportSerializer( report, many=True)
        return Response( report_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        report_serializer = ReportSerializer(data=request.data)
        if report_serializer.is_valid():
            report_serializer.save()
            return Response(report_serializer.data, status=status.HTTP_201_CREATED) 
        return Response(report_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated]) 
def get_all_report_by_card_id(request,pk):
    try:
        report = Report.objects.all().filter(cardid__cardid=pk)
    except:
        return Response({'message' : 'no content'}, status=status.HTTP_204_NO_CONTENT) 
    report_serializer = ReportSerializer( report, many=True)
    if(report_serializer):
        return Response( report_serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({'message' : 'no content'}, status=status.HTTP_204_NO_CONTENT) 

@api_view(['GET'])
def get_approve_total_donate_by_topic_id(request,pk):
    totalDonate = 0
    try:
        payment = Paymentcard.objects.all().filter(donatetopicid=pk,status="approve")
    except:
        return Response({'message' : 'no content'}, status=status.HTTP_204_NO_CONTENT) 
    payment_serializer = PaymentCardSerializer( payment, many=True)

    donate_topic = Donatetopic.objects.get(pk=pk)
    donate_topic_serializer = DonateTopicSerializer(donate_topic)

    for value in payment_serializer.data:
        totalDonate+=value['contribution']
    total = {'topic_id': pk, 'total_donate': totalDonate,'status': donate_topic_serializer.data['status']}
    if(payment_serializer):
        return Response(  total, status=status.HTTP_200_OK)
    else:
        return Response(  total, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
@authentication_classes([JWTAuthentication]) 
@permission_classes([IsAuthenticated]) 
def user_list_member(request):
    if request.method == 'GET': 
        token = request.COOKIES.get('jwt')
        payload = jwt.decode(token, "secret", algorithms=["HS256"])
        user = User.objects.filter(id=payload['id']).first()
        users = UsersUser.objects.all().exclude(pk=user.id)
        users_serializer = UsersUserSerializer( users, many=True)
        return Response( users_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        user_data = JSONParser().parse(request)
        user_serializer = UserSerializer(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_201_CREATED) 
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([JWTAuthentication]) 
@permission_classes([IsAuthenticated]) 
def user_hc_list(request):
    users = UsersUser.objects.all().filter(is_hospitalcoordinator=1,hc=None)
    users_serializer = UsersUserSerializer( users, many=True)
    return Response( users_serializer.data, status=status.HTTP_200_OK)


    




    



@api_view(['GET', 'POST'])
# @authentication_classes([JWTAuthentication]) 
# @permission_classes([IsAuthenticated]) 
def payments_waiting(request):  #### payment waiting list Little
    if request.method == 'GET':
        payments = Paymentcard.objects.filter(status='waiting').order_by('date')
        payment_serializer = PaymentCardSerializer(payments, many=True)
        return Response(payment_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        payment_serializer = PaymentCardSerializer(data=request.data)
        if payment_serializer.is_valid():
            payment_serializer.save()
            return Response(payment_serializer.data, status=status.HTTP_201_CREATED)
        return Response(payment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# #### 4 Card that's still open order from oldest Little
@api_view(['GET', 'POST'])
def emergency_card_list(request):
    if request.method == 'GET':
        thirty_days_ago = datetime.now() - timedelta(days=30)
        cards = Card.objects.filter(cardstatus='approve', date__gte=thirty_days_ago).order_by('date')[:4]
        card_serializer = CardSerializer(cards, many=True)
        return Response(card_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        card_serializer = CardSerializer(data=request.data)
        if card_serializer.is_valid():
            card_serializer.save()
            return Response(card_serializer.data, status=status.HTTP_201_CREATED) 
        return Response(card_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#### set status of payment to "reject" by paymentcardID
@api_view(['PUT'])
def reject_payment(request, pk):
    try:
        payment = Paymentcard.objects.get(paymentcardid=pk)
    except Paymentcard.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    payment.status = 'reject'
    payment.save()
    payment_serializer = PaymentCardSerializer(payment,data=request.data,partial=True)
    if  payment_serializer.is_valid():
        payment_serializer.save()
        return Response( payment_serializer.data, status=status.HTTP_201_CREATED)
    return Response({'message': 'Payment rejected successfully'}, status=status.HTTP_200_OK)


### set status of payment to "approve" by paymentcardID
@api_view(['PUT'])
def approve_payment(request, pk):
    try:
        payment = Paymentcard.objects.get(paymentcardid=pk)
    except Paymentcard.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    payment.status = 'approve'
    payment.save()
    payment_serializer = PaymentCardSerializer(payment,data=request.data,partial=True)
    if  payment_serializer.is_valid():
        payment_serializer.save()
        return Response( payment_serializer.data, status=status.HTTP_201_CREATED)
    return Response({'message': 'Payment approve successfully'}, status=status.HTTP_200_OK)



# ### set status of payment to "approve" by paymentcardID
# @api_view(['PUT'])
# def approve_payment(request, pk):
#     try:
#         payment = Paymentcard.objects.get(paymentcardid=pk)
#     except Paymentcard.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#     payment.status = 'approve'

#     # Check if the total donation is more than the donatetopic amount
#     total_donation = Paymentcard.objects.filter(donatetopicid=payment.donatetopicid, status='approve').aggregate(total=Sum('contribution'))['total']
#     donatetopic = Donatetopic.objects.get(pk=payment.donatetopicid.pk)
#     if total_donation >= donatetopic.amount:
#         donatetopic.status = 'complete'
#         donatetopic.save()
#         payment.status = 'approve'
#         payment.save()
#         payment_serializer = PaymentCardSerializer(payment, data=request.data, partial=True)
#         if payment_serializer.is_valid():
#             payment_serializer.save()
#             return Response(payment_serializer.data, status=status.HTTP_201_CREATED)
#         return Response({'message': 'Payment approve successfully'}, status=status.HTTP_200_OK)
#     else:
#         donatetopic.status = 'waiting'
#         donatetopic.save()
#         payment.status = 'approve'
#         payment.save()
#         payment_serializer = PaymentCardSerializer(payment,data=request.data,partial=True)
#         if  payment_serializer.is_valid():
#             payment_serializer.save()
#             return Response( payment_serializer.data, status=status.HTTP_201_CREATED)
#         return Response({'message': 'Payment approve successfully but the Total donation is not enough'}, status=status.HTTP_200_OK)

### set status of payment to "approve" by paymentcardID
@api_view(['PUT'])
def topic_payment_check(request, pk):
    try:
        payment = Paymentcard.objects.get(paymentcardid=pk)
    except Paymentcard.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # Check if the total donation is more than the donatetopic amount
    total_donation = Paymentcard.objects.filter(donatetopicid=payment.donatetopicid, status='approve').aggregate(total=Sum('contribution'))['total']
    donatetopic = Donatetopic.objects.get(pk=payment.donatetopicid.pk)
    if total_donation >= donatetopic.amount:
        donatetopic.status = 'complete'
    else:
        donatetopic.status = 'waiting'

    donatetopic.save()

    return Response({'message': 'Payment approve successfully'}, status=status.HTTP_200_OK)



    

@api_view(['POST'])
def card_refresh_status(request):
    thirty_days_ago = datetime.now() - timedelta(days=30)
    expired_cards = Card.objects.filter(date__lte=thirty_days_ago, cardstatus='approve')
    for card in expired_cards:
        card.cardstatus = 'complete'
        card.save()
        Donatetopic.objects.filter(cardid=card.pk).update(status='complete')
    return Response({'message': f"{len(expired_cards)} card(s) and related DonateTopic(s) updated"}, status=status.HTTP_200_OK)



@api_view(['GET'])
def complete_donatetopic_list(request):
    donatetopics = Donatetopic.objects.filter(Q(status='complete'), (Q(slipimgcomplete='') | Q(slipimgcomplete__isnull=True)))
    serializer = DonateTopicSerializer(donatetopics, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def waiting_card_list(request):
    try:
        card = Card.objects.all().filter(cardstatus="waiting")
    except:
        return Response({'message' : 'no content'}, status=status.HTTP_204_NO_CONTENT) 
    card_serializer =CardSerializer(card, many=True)
    if card_serializer:
        return Response(card_serializer.data, status=status.HTTP_200_OK) 
    return Response({'message' : 'no content'}, status=status.HTTP_204_NO_CONTENT) 

@api_view(['GET'])
def reject_card_list(request):
    try:
        card = Card.objects.all().filter(cardstatus="reject")
    except:
        return Response({'message' : 'no content'}, status=status.HTTP_204_NO_CONTENT) 
    card_serializer =CardSerializer(card, many=True)
    if card_serializer:
        return Response(card_serializer.data, status=status.HTTP_200_OK) 
    return Response({'message' : 'no content'}, status=status.HTTP_204_NO_CONTENT) 


@api_view(['GET'])   
def card_quotation_complete_treatment_cost(request):
    cards = Card.objects.filter(Q(cardstatus='approve'), Q(receipttype='ใบเสนอราคา'),
                                Q(donate_topic__topic='ค่ารักษา'), 
                                Q(donate_topic__status='complete'),
                                (Q(donate_topic__slipimgcomplete__exact='') | Q(donate_topic__slipimgcomplete__isnull=True)))
    card_serializer = CardSerializer(cards, many=True)
    return Response(card_serializer.data, status=status.HTTP_200_OK)



@api_view(['GET'])
def get_cards_by_report_count(request):
    cards = Card.objects.annotate(report_count=Count('report')).filter(report_count__gt=0).order_by('-report_count')
    card_serializer = CardSerializer(cards, many=True)
    data = {
        'cards': card_serializer.data,
        'totalCard': len(cards),
        'report_count_for_each_card': [card.report_count for card in cards],
    }
    return Response(data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_card_byID_with_report_count(request, pk):
    try:
        card = Card.objects.get(pk=pk)
    except Card.DoesNotExist:
        return Response({'message': 'Card not found'}, status=status.HTTP_404_NOT_FOUND)

    report_count = Report.objects.filter(cardid=pk).count()
    card_data = CardSerializer(card).data
    card_data['report_count'] = report_count

    return Response(card_data, status=status.HTTP_200_OK)





@api_view(['GET'])
def get_card_hospital_donatetopic_by_id(request, pk):
    for field in Card._meta.get_fields():
        print(field.name)
    try:
        card = Card.objects.get(pk=pk)
    except Card.DoesNotExist:
        return Response({'message': 'Card does not exist'}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        hospital = Hospital.objects.get(pk=card.hospitalid.hospitalid)
    except Hospital.DoesNotExist:
        return Response({'message': 'Hospital does not exist'}, status=status.HTTP_404_NOT_FOUND)
    
    donatetopic = Donatetopic.objects.filter(cardid=pk).first()
    
    data = {
        'card': CardSerializer(card).data,
        'hospital': HospitalSerializer(hospital).data,
        'donatetopic': DonateTopicSerializer(donatetopic).data if donatetopic else {}
    }
    
    return Response(data, status=status.HTTP_200_OK)

# @api_view(['GET'])
# def get_card_donatetopic_by_id(request, pk):
#     try:
#         card = Card.objects.get(pk=pk)
#     except Card.DoesNotExist:
#         return Response({'message': 'Card does not exist'}, status=status.HTTP_404_NOT_FOUND)
    
#     donatetopic = Donatetopic.objects.filter(cardid=pk).first()
    
#     data = {
#         'card': CardSerializer(card).data,
#         'donatetopic': DonateTopicSerializer(donatetopic).data if donatetopic else {}
#     }
    
#     return Response(data, status=status.HTTP_200_OK)


# @api_view(['GET'])
# def get_card_donatetopic_by_id(request, pk):
#     try:
#         card = Card.objects.get(pk=pk)
#     except Card.DoesNotExist:
#         return Response({'message': 'Card does not exist'}, status=status.HTTP_404_NOT_FOUND)
    
#     donatetopic = Donatetopic.objects.filter(cardid=pk).first()
    
#     data = {
#         'card': CardSerializer(card).data,
#         'donatetopic': DonateTopicSerializer(donatetopic).data if donatetopic else {}
#     }
    
#     return Response(data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_card_by_cardid(request, pk):
    try:
        card = Card.objects.get(pk=pk)
    except Card.DoesNotExist:
        return Response({'message': 'Card does not exist'}, status=status.HTTP_404_NOT_FOUND)

    serializer = CardSerializer(card)

    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def update_slipimg_donateTopic(request, pk):  ### pk mean PimaryKey
    try:
      donate_topic = Donatetopic.objects.get(pk=pk)
    except:
        return Response({'message' : 'no content'}, status=status.HTTP_204_NO_CONTENT) 
    donate_topic_serializer = DonateTopicSerializer(donate_topic,data=request.data,partial=True)
    if  donate_topic_serializer.is_valid():
        donate_topic_serializer.save()
        return Response( donate_topic_serializer.data, status=status.HTTP_201_CREATED)
    




@api_view(['GET'])
def waiting_card_list_hospital(request, pk):
    try:
        card = Card.objects.filter(cardstatus="waiting", hospitalid=pk)
    except:
        return Response({'message': 'no content'}, status=status.HTTP_204_NO_CONTENT) 
    card_serializer = CardSerializer(card, many=True)
    if card_serializer.data:
        return Response(card_serializer.data, status=status.HTTP_200_OK) 
    return Response({'message': 'no content'}, status=status.HTTP_204_NO_CONTENT)



@api_view(['GET'])
def hospital_coordinator_by_user_id(request, pk):
    try:
        hospital_coordinator = Hospitalcoordinator.objects.get(user=pk)
    except Hospitalcoordinator.DoesNotExist:
        return Response({"error": "Hospital coordinator not found."}, status=status.HTTP_404_NOT_FOUND)
    
    hospital_coordinator_serializer = HospitalcoordinatorSerializer(hospital_coordinator)
    return Response(hospital_coordinator_serializer.data)
