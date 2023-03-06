from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from givepaws.models import Hospital
from rest_framework.parsers import JSONParser 
from givepaws.serializers import HospitalSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny,IsAdminUser,IsAuthenticatedOrReadOnly
from django.views.decorators.csrf import csrf_exempt
from givepaws.jwt import JWTAuthentication


@api_view(['GET', 'POST'])
@authentication_classes([JWTAuthentication]) #check jwt token are correct or not?
@permission_classes([IsAdminUser]) #check user permission isAdmin = is_staff = true in user_users in database
def hospital_list(request):
    if request.method == 'GET':
        hospitals = Hospital.objects.all()
        hospitals_serializer = HospitalSerializer( hospitals, many=True)
        return Response( hospitals_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
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
    if request.method == 'GET':
        hospital_serializer = HospitalSerializer(hospital)
        if hospital:
            return Response(hospital_serializer.data, status=status.HTTP_200_OK) 
    elif request.method == 'PUT':
        hospital_data = JSONParser().parse(request) 
        hospital_serializer = HospitalSerializer( hospital, data=hospital_data) 
        if  hospital_serializer.is_valid(): 
            hospital_serializer.save() 
            return Response(hospital_serializer.data) 
        return Response(hospital_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    elif request.method == 'DELETE': 
        hospital.delete() 
        return Response({'message': 'Hospital was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
