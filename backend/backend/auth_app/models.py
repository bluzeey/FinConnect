from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    """Custom User model for authentication."""
    ROLE_CHOICES = [
        ('business', 'Business User'),
        ('expert', 'Financial Expert'),
    ]
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, null=True, blank=True)
    profile_picture = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.username} ({self.role or 'No role'})"


class BusinessProfile(models.Model):
    """Profile for business users."""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="business_profile")
    company_name = models.CharField(max_length=255, blank=True, null=True)
    industry = models.CharField(max_length=100, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.company_name or f"BusinessProfile({self.user.username})"


class FinancialExpertProfile(models.Model):
    """Profile for financial experts."""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="expert_profile")
    skills = models.JSONField(
        help_text="List of skills (e.g., ['Accounting', 'Tax Management'])", 
        blank=True, 
        null=True
    )
    certifications = models.JSONField(blank=True, null=True, help_text="List of certifications")
    experience_years = models.PositiveIntegerField(blank=True, null=True)
    rating = models.FloatField(default=0.0)
    availability = models.CharField(
        max_length=10,
        choices=[('available', 'Available'), ('busy', 'Busy')],
        default='available',
    )

    def __str__(self):
        return f"{self.user.username} (Rating: {self.rating})"
