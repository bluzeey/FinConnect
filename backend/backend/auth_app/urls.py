from django.urls import path
from .views import (
    DeleteAccountView, LoginView, ForgotPasswordView, 
    ResetPasswordView, UpdateProfileView, UserProfileView
)
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LogoutView, UserDetailsView
from rest_framework_simplejwt.views import TokenVerifyView
from dj_rest_auth.jwt_auth import get_refresh_view

urlpatterns = [
    # Authentication APIs
    path('login/', LoginView.as_view(), name='login'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset-password'),

    path('user/profile/', UserProfileView.as_view(), name='user-profile'),
    path('user/update-profile/', UpdateProfileView.as_view(), name='update-profile'),
    path('user/delete-account/', DeleteAccountView.as_view(), name='delete-account'),

    # dj-rest-auth JWT and Registration APIs
    path('register/', RegisterView.as_view(), name='rest_register'),
    path('logout/', LogoutView.as_view(), name='rest_logout'),
    path('user/', UserDetailsView.as_view(), name='rest_user_details'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('token/refresh/', get_refresh_view().as_view(), name='token_refresh'),
]