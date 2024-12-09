from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from .views import (
    MyTokenObtainPairView, RegisterView, LoginView, 
    ForgotPasswordView, ResetPasswordView, UserProfileView, 
    UpdateProfileView, DeleteAccountView
)

urlpatterns = [
    # JWT Authentication APIs
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    # User Registration and Management APIs
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot_password'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset_password'),

    # User Profile APIs
    path('user/profile/', UserProfileView.as_view(), name='user_profile'),
    path('user/update-profile/', UpdateProfileView.as_view(), name='update_profile'),
    path('user/delete-account/', DeleteAccountView.as_view(), name='delete_account'),
]