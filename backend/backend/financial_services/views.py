from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, UpdateAPIView, ListAPIView, CreateAPIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import ( 
    FinancialExpertProfileSerializer, QuoteRequestSerializer, ReviewSerializer,
    SearchFilterSerializer, ChatMessageSerializer
)
from  auth_app.serializers import UserSerializer;
from .models import FinancialExpertProfile, QuoteRequest, Review, SearchFilter, ChatMessage



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
        return Response({'status': 'account deleted'}, status=status.HTTP_204_NO_CONTENT)


# Business-Specific APIs

class SaveSearchView(CreateAPIView):
    serializer_class = SearchFilterSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class SavedSearchesView(ListAPIView):
    serializer_class = SearchFilterSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SearchFilter.objects.filter(user=self.request.user)

class RequestQuoteView(CreateAPIView):
    serializer_class = QuoteRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # You might want to verify the requesting business user
        serializer.save(business=self.request.user.business_profile)

class BusinessQuoteRequestsView(ListAPIView):
    serializer_class = QuoteRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Assuming you have a business profile association
        return QuoteRequest.objects.filter(business=self.request.user.business_profile)


# Financial Expert-Specific APIs

class ExpertQuoteRequestsView(ListAPIView):
    serializer_class = QuoteRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Assuming expert profile association
        return QuoteRequest.objects.filter(expert=self.request.user.expert_profile, status='pending')

class RespondToQuoteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, quote_id, *args, **kwargs):
        # Implement quote response logic
        return Response({'status': 'response submitted'}, status=status.HTTP_200_OK)

class UpdateAvailabilityView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        availability_status = request.data.get('availability_status')
        # Update user availability - ensure user has expert profile
        if hasattr(request.user, 'expert_profile'):
            expert_profile = request.user.expert_profile
            expert_profile.availability = availability_status
            expert_profile.save()
            return Response({'status': 'Availability updated'}, status=status.HTTP_200_OK)
        return Response({'error': 'User has no expert profile'}, status=status.HTTP_400_BAD_REQUEST)


# Search & Results APIs

class SearchExpertsView(APIView):
    def post(self, request, *args, **kwargs):
        filters = request.data
        # Implement search logic based on filters
        return Response({'experts': []})

class ExpertDetailView(RetrieveAPIView):
    serializer_class = FinancialExpertProfileSerializer
    queryset = FinancialExpertProfile.objects.all()
    lookup_field = "pk"
    lookup_url_kwarg = "expert_id"


# Review APIs

class CreateReviewView(CreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

class RetrieveReviewsView(ListAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        reviewee_id = self.kwargs.get('user_id')
        return Review.objects.filter(reviewee_id=reviewee_id)


# Chat APIs

class SendMessageView(CreateAPIView):
    serializer_class = ChatMessageSerializer
    permission_classes = [permissions.IsAuthenticated]


class ChatHistoryView(ListAPIView):
    serializer_class = ChatMessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id_1 = self.request.query_params.get('user_id_1')
        user_id_2 = self.request.query_params.get('user_id_2')
        return ChatMessage.objects.filter(sender_id__in=[user_id_1, user_id_2], receiver_id__in=[user_id_1, user_id_2])


# AI Assistance APIs

class AIQuestionView(APIView):
    def post(self, request, *args, **kwargs):
        question_text = request.data.get('question_text')
        # Implement AI question handling logic
        return Response({'response_text': 'AI response'})