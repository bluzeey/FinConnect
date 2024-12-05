from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, UpdateAPIView, CreateAPIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model,authenticate
from django.contrib.auth import login as django_login, logout as django_logout

from allauth.account.views import ConfirmEmailView
from allauth.account.utils import complete_signup

from .serializers import (
    RegisterSerializer, LoginSerializer, ForgotPasswordSerializer, 
    ResetPasswordSerializer, UserSerializer
)

User = get_user_model()  # Retrieve the custom user model

# Authentication APIs

class SignupView(CreateAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Complete allauth's signup process
            complete_signup(
                request, user, 'None', # You can adjust the type to ('email' or 'none')
                success_url='/'
            )

            # Generate and return token
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'user_id': user.id,
                'access_token': token.key
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            # Retrieve user based on email to find the username
            try:
                user = User.objects.get(email=email)
                username = user.username
            except User.DoesNotExist:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

            # Authenticate using the username and password
            user = authenticate(username=username, password=password)
            if user is not None:
                if user.is_active:
                    django_login(request, user)
                    token, created = Token.objects.get_or_create(user=user)
                    return Response({
                        'access_token': token.key,
                        'user_details': {
                            'id': user.id,
                            'username': user.username,
                            'email': user.email,
                            'role': user.role,
                        }
                    }, status=status.HTTP_200_OK)

            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ForgotPasswordView(APIView):
    serializer_class = ForgotPasswordSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # Implement actual email send for password reset
            # Using allauth's password reset process
            return Response({'status': 'success'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResetPasswordView(APIView):
    serializer_class = ResetPasswordSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # Implement token verification and password reset logic
            return Response({'status': 'Password reset successful'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# User Management APIs

class UserProfileView(RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class UpdateProfileView(UpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class DeleteAccountView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        user = request.user
        user.delete()
        return Response({'status': 'Account deleted'}, status=status.HTTP_204_NO_CONTENT)