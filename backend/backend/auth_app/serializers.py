from rest_framework import serializers
from .models import User, BusinessProfile, FinancialExpertProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'is_active', 'is_staff', 'role', 'profile_picture']

class BusinessProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = BusinessProfile
        fields = ['user', 'company_name', 'industry', 'location']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create(**user_data)
        business_profile = BusinessProfile.objects.create(user=user, **validated_data)
        return business_profile

class FinancialExpertProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = FinancialExpertProfile
        fields = ['user', 'skills', 'certifications', 'experience_years', 'rating', 'availability']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create(**user_data)
        expert_profile = FinancialExpertProfile.objects.create(user=user, **validated_data)
        return expert_profile

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['username','email', 'password', 'role']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data.get('role', 'business')
        )
        user.set_password(validated_data['password'])  # Use this to hash the password
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)

class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

class ResetPasswordSerializer(serializers.Serializer):
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True, required=True)