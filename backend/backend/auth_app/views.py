from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model, authenticate
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import (
    MyTokenObtainPairSerializer, RegisterSerializer, LoginSerializer, 
    ForgotPasswordSerializer, ResetPasswordSerializer, UserSerializer
)

User = get_user_model()

# Utility function to generate JWT token
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

# Registration view
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class LoginView(APIView):
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny]
    
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            
            # Retrieve the user by email
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

            # Authenticate using the username or user object directly
            user = authenticate(request, username=user.username, password=password)

            if user is not None:
                if user.is_active:
                    token = get_tokens_for_user(user)
                    return Response({
                        **token,
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
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = User.objects.get(email=email)
                # Here you would typically create a password reset token and send the email
                token = RefreshToken.for_user(user)
                # Example URL for reset password
                reset_url = f"http://localhost:3000/reset-password/{str(token)}"  # Update with your frontend URL

                send_mail(
                    subject="Password Reset Requested",
                    message=f"Please use the following link to reset your password: {reset_url}",
                    from_email="noreply@yourdomain.com",
                    recipient_list=[user.email],
                )
                return Response({'status': 'Password reset email sent.'}, status=status.HTTP_200_OK)

            except User.DoesNotExist:
                return Response({'error': 'Email not found'}, status=status.HTTP_404_NOT_FOUND)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResetPasswordView(APIView):
    serializer_class = ResetPasswordSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            token = serializer.validated_data['token']
            new_password = serializer.validated_data['new_password']

            try:
                # Decode the token to get the user (you should implement your verification logic)
                user_id = jwt_decode(token)  # You need to implement the decode logic
        
                user = User.objects.get(id=user_id)
                user.set_password(new_password)
                user.save()
                return Response({'status': 'Password has been reset successfully.'}, status=status.HTTP_200_OK)

            except User.DoesNotExist:
                return Response({'error': 'Invalid token or user does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class UserProfileView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user  # Use the user directly from the request
        user_data = {
            'username': user.username,
            'email': user.email,
        }
        return Response(user_data)

class UpdateProfileView(generics.UpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):

        return self.request.user

class DeleteAccountView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        user = request.user
        user.delete()
        return Response({'status': 'Account deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)