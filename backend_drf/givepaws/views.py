from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from givepaws.models import Hospital,UsersUser,Authen,Authenimg
from rest_framework.parsers import JSONParser 
from givepaws.serializers import HospitalSerializer,UsersUserSerializer,AuthenSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny,IsAdminUser,IsAuthenticatedOrReadOnly
from django.views.decorators.csrf import csrf_exempt
from givepaws.jwt import JWTAuthentication
from givepaws.permissions import IsEmployee
import jwt
from users.models import User


@api_view(['GET', 'POST'])
@authentication_classes([JWTAuthentication]) #check jwt token are correct or not?
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
        authen_data = JSONParser().parse(request)
        authen_serializer =AuthenSerializer(data=authen_data)
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
        authen.delete() 
        return Response({'message': 'authen was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)







