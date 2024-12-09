from rest_framework import serializers
from .models import User, BusinessProfile, FinancialExpertProfile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password

# JWT Token Serializer
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['username'] = user.username
        return token 

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'is_active', 'is_staff', 'role', 'profile_picture']

# Business Profile Serializer
class BusinessProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = BusinessProfile
        fields = ['user', 'company_name', 'industry', 'location']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        business_profile = BusinessProfile.objects.create(user=user, **validated_data)
        return business_profile

# Financial Expert Profile Serializer
class FinancialExpertProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = FinancialExpertProfile
        fields = ['user', 'skills', 'certifications', 'experience_years', 'rating', 'availability']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        expert_profile = FinancialExpertProfile.objects.create(user=user, **validated_data)
        return expert_profile

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2', 'role']
        extra_kwargs = {
            'password': {'write_only': True},
            'role': {'default': 'business'}
        }
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already registered.")
        return value  # Return validated email

    def validate(self, attrs):
        if attrs['password'] != attrs.get('password2'):
            raise serializers.ValidationError({"password": "Password fields do not match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user

# Login Serializer
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)

# Forgot Password Serializer
class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

# Reset Password Serializer
class ResetPasswordSerializer(serializers.Serializer):
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
