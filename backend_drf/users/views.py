from .serializers import UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from rest_framework.exceptions import AuthenticationFailed
import jwt,datetime
from givepaws.jwt import JWTAuthentication
from rest_framework.decorators import authentication_classes
from rest_framework.parsers import JSONParser 
from rest_framework import status

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)

@api_view(['POST','OPTIONS'])
def login(request):
    username = request.data['username']
    password = request.data['password']
    user = User.objects.filter(username=username).first()
    if user is None:
        raise AuthenticationFailed('User not Found!')
    if not user.check_password(password):
        raise AuthenticationFailed('Incorrect Password!')
    payload = {
        'id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=720),
        'iat': datetime.datetime.utcnow()
    }
    token = jwt.encode(payload, "secret", algorithm="HS256")
    
    response = Response()
    response.set_cookie(key='jwt', value=token, httponly=True,samesite='none',secure=True, max_age=43200)
    response.data = {
        'jwt': token
    }
    
    return response

@api_view(['PUT','PATCH'])
@authentication_classes([JWTAuthentication])
def userupdate(request,pk):
    try:
        user = User.objects.get(pk=pk)
    except:
        return Response({'message' : 'no content'}, status=status.HTTP_204_NO_CONTENT) 
    user_data = JSONParser().parse(request)
    if not user.check_password(user_data['password']):
        return Response({'error': 'Incorrect wrong password.'},status=status.HTTP_401_UNAUTHORIZED)
    if request.method == 'PUT':
        user_serializer = UserSerializer(user,data=user_data,partial=True)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_200_OK) 
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'PATCH':
        return Response({"message" : "Confirm"},status=status.HTTP_200_OK)
    

@api_view(['PUT'])
@authentication_classes([JWTAuthentication])
def update_passowrd(request,pk):
    try:
        user = User.objects.get(pk=pk)
    except:
        return Response({'message' : 'no content'}, status=status.HTTP_204_NO_CONTENT) 
    user_data = JSONParser().parse(request)
    if not user.check_password(user_data['old_password']):
        return Response({'error': 'Incorrect wrong password.'},status=status.HTTP_401_UNAUTHORIZED)
    user_serializer = UserSerializer(user,data=user_data,partial=True)
    if user_serializer.is_valid():
        user_serializer.save()
        return Response(user_serializer.data, status=status.HTTP_200_OK) 
    return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def user(request):
    token = request.COOKIES.get('jwt')
    if not token:
        raise AuthenticationFailed('Unauthenticaed!')
    try:
        payload = jwt.decode(token, "secret", algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Token is expire, Pleas login again')
    user = User.objects.filter(id=payload['id']).first()
    serializer = UserSerializer(user)

    return Response(serializer.data)

@api_view(['POST'])
def logout(request):
    response = Response()
    response.delete_cookie('jwt')
    response.data = {
        'message': 'logout success'
    }
    return response