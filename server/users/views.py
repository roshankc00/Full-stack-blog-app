# https://django-rest-framework-simplejwt.readthedocs.io/en/latest/creating_tokens_manually.html
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import UserSerializers,UserLoginSerializer,UserProfileSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import AccessToken
from .renderer import UserRenderer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from datetime import timedelta
from .models import User


def get_access_token(user):
    access_token = AccessToken.for_user(user)
    # access_token.set_exp(access_token.current_time + timedelta(days=7))
    return {
        'access':str(access_token)
    }


class UserRegistrationView(APIView):
    renderer_classes=[UserRenderer]
    def post(self,request,format=None):
        serializer=UserSerializers(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'success':True,'message':'User registered successfully'},status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
            
            
class UserLoginView(APIView):
    renderer_classes=[UserRenderer]
    def post(self,request,format=None):
        serializer=UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email=serializer.data.get('email')
            password=serializer.data.get('password')     
            user= authenticate(email=email,password=password)
            if user is not None:
                token =get_access_token(user)
                print(token,"token")
                return Response({'success':False,'token':token, 'msg':'Login Success'}, status=status.HTTP_200_OK)
            else:
                return Response({'success':False, 'message':"User not found"},status=status.HTTP_404_NOT_FOUND)     
        else:
          return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

                    
class UserProfileView(APIView):
  renderer_classes = [UserRenderer]
  authentication_classes=[JWTAuthentication]
  permission_classes = [IsAuthenticated]
  def get(self, request, format=None):
    print(request.user)
    serializer = UserProfileSerializer(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)


            