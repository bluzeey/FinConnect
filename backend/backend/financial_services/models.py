from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

from auth_app.models import BusinessProfile, FinancialExpertProfile, User

class QuoteRequest(models.Model):
    """Quote requests between businesses and experts."""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('declined', 'Declined'),
        ('completed', 'Completed'),
    ]

    business = models.ForeignKey(BusinessProfile, on_delete=models.CASCADE, related_name="quote_requests")
    expert = models.ForeignKey(FinancialExpertProfile, on_delete=models.SET_NULL, null=True, blank=True)
    service_description = models.TextField(blank=True, null=True)
    budget = models.FloatField(blank=True, null=True)
    deadline = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Quote {self.id} (Status: {self.status})"


class Review(models.Model):
    """Reviews left by users."""
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="given_reviews")
    reviewee = models.ForeignKey(User, on_delete=models.CASCADE, related_name="received_reviews")
    rating = models.FloatField()
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.reviewer.username} for {self.reviewee.username}"


class SearchFilter(models.Model):
    """Saved search filters for users."""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="saved_filters")
    filter_name = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True, null=True)
    expertise = models.JSONField(blank=True, null=True, help_text="List of expertise filters (e.g., ['Accounting', 'Tax Management'])")
    minimum_rating = models.FloatField(blank=True, null=True)

    def __str__(self):
        return f"Filter: {self.filter_name} (User: {self.user.username})"


class ChatMessage(models.Model):
    """Chat messages between users."""
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sent_messages")
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="received_messages")
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    attachments = models.JSONField(blank=True, null=True, help_text="List of file URLs")

    def __str__(self):
        return f"Message from {self.sender.username} to {self.receiver.username}"


# Optional Signals
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    """Automatically create a profile based on the user's role."""
    if created:
        if instance.role == 'business':
            BusinessProfile.objects.create(user=instance)
        elif instance.role == 'expert':
            FinancialExpertProfile.objects.create(user=instance)