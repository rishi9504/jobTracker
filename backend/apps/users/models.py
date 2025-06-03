from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass

class Resume(models.Model):
    RESUME_TYPES = [
        ('GENERAL', 'General Purpose'),
        ('PYTHON', 'Python Developer'),
        ('REACT', 'React Developer'),
        ('FULLSTACK', 'Full Stack Developer'),
        ('DATA', 'Data Analyst'),
        ('OTHER', 'Other')
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='resumes')
    title = models.CharField(max_length=100)
    resume_type = models.CharField(max_length=20, choices=RESUME_TYPES, default='GENERAL')
    file = models.FileField(upload_to='resumes/')
    description = models.TextField(blank=True)
    version = models.CharField(max_length=50, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    target_job_titles = models.CharField(max_length=200, blank=True)
    keywords = models.CharField(max_length=200, blank=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return f"{self.title} - {self.resume_type} ({self.version})"