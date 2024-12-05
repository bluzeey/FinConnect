from django.urls import path
from .views import (
    SaveSearchView, SavedSearchesView, RequestQuoteView, BusinessQuoteRequestsView,
    ExpertQuoteRequestsView, RespondToQuoteView, UpdateAvailabilityView,
    SearchExpertsView, ExpertDetailView,
    CreateReviewView, RetrieveReviewsView,
    SendMessageView, ChatHistoryView,
    AIQuestionView
)

urlpatterns = [

    # Business-Specific APIs
    path('business/save-search/', SaveSearchView.as_view(), name='save-search'),
    path('business/saved-searches/', SavedSearchesView.as_view(), name='saved-searches'),
    path('business/request-quote/', RequestQuoteView.as_view(), name='request-quote'),
    path('business/quote-requests/', BusinessQuoteRequestsView.as_view(), name='business-quote-requests'),

    # Financial Expert-Specific APIs
    path('expert/quote-requests/', ExpertQuoteRequestsView.as_view(), name='expert-quote-requests'),
    path('expert/respond-to-quote/<int:quote_id>/', RespondToQuoteView.as_view(), name='respond-to-quote'),
    path('expert/update-availability/', UpdateAvailabilityView.as_view(), name='update-availability'),

    # Search & Results APIs
    path('search/experts/', SearchExpertsView.as_view(), name='search-experts'),
    path('expert/<int:expert_id>/', ExpertDetailView.as_view(), name='expert-detail'),

    # Review APIs
    path('review/create/', CreateReviewView.as_view(), name='create-review'),
    path('review/<int:user_id>/', RetrieveReviewsView.as_view(), name='retrieve-reviews'),

    # Chat APIs
    path('chat/send/', SendMessageView.as_view(), name='send-message'),
    path('chat/history/', ChatHistoryView.as_view(), name='chat-history'),

    # AI Assistance APIs
    path('ai-assist/question/', AIQuestionView.as_view(), name='ai-question'),
]