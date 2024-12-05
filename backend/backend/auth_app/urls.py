from django.urls import path
from .views import (
    DeleteAccountView, SignupView, LoginView, ForgotPasswordView, ResetPasswordView, UpdateProfileView, UserProfileView,
)

urlpatterns = [
    # Authentication APIs
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset-password'),

    path('user/profile/', UserProfileView.as_view(), name='user-profile'),
    path('user/update-profile/', UpdateProfileView.as_view(), name='update-profile'),
    path('user/delete-account/', DeleteAccountView.as_view(), name='delete-account'),

]