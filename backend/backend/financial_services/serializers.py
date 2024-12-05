from rest_framework import serializers
from .models import User, BusinessProfile, FinancialExpertProfile, Review, QuoteRequest, SearchFilter, ChatMessage

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
        fields = ['email', 'password', 'role']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data.get('role', 'business')
        )
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)

class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

class ResetPasswordSerializer(serializers.Serializer):
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True, required=True)

class QuoteRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuoteRequest
        fields = ['id', 'business', 'expert', 'service_description', 'budget', 'deadline', 'status', 'created_at', 'updated_at']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'reviewer', 'reviewee', 'rating', 'comment', 'created_at']

class SearchFilterSerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchFilter
        fields = ['id', 'user', 'filter_name', 'location', 'expertise', 'minimum_rating']

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['id', 'sender', 'receiver', 'message', 'timestamp', 'attachments']