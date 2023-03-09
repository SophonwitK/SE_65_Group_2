import jwt
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings 
from users.models import User

class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        try:
            token = request.COOKIES.get('jwt')
            if not token:
                return None  
            try:
                payload = jwt.decode(token, "secret", algorithms=["HS256"])
            except jwt.ExpiredSignatureError:
                return None

        
            user = User.objects.filter(id=payload['id']).first()
            return (user, None)
            
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token expired. Please log in again.')
            
        except jwt.DecodeError:
            raise AuthenticationFailed('Invalid token. Please log in again.')
            
        except User.DoesNotExist:
            raise AuthenticationFailed('No user matching this token was found.')