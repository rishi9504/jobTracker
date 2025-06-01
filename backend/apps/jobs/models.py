from django.db import models
from django.conf import settings

class JobApplication(models.Model):
    STATUS_CHOICES = [
        ('APPLIED', 'Applied'),
        ('INTERVIEWING', 'Interviewing'),
        ('OFFERED', 'Offered'),
        ('REJECTED', 'Rejected'),
        ('ACCEPTED', 'Accepted'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    company = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='APPLIED')
    applied_date = models.DateField(auto_now_add=True)
    description = models.TextField(blank=True, null=True)
    salary = models.CharField(max_length=100, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    remote = models.BooleanField(default=False)
    notes = models.TextField(blank=True, null=True)
    
    class Meta:
        ordering = ['-applied_date']

    def __str__(self):
        return f"{self.position} at {self.company}"
