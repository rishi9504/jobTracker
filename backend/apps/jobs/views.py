from rest_framework import generics, permissions
from .models import JobApplication
from .serializers import JobApplicationSerializer
from .services import JobService

class JobListCreateView(generics.ListCreateAPIView):
    serializer_class = JobApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return JobService.list_jobs(self.request.user)

    def perform_create(self, serializer):
        JobService.create_job(self.request.user, serializer.validated_data)

class JobDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = JobApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return JobApplication.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        JobService.update_job(self.get_object(), serializer.validated_data)

    def perform_destroy(self, instance):
        JobService.delete_job(instance)
