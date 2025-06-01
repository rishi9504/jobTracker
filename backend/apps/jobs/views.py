from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import JobApplication
from .serializers import JobApplicationSerializer
from .services import JobService

class JobListCreateView(generics.ListCreateAPIView):
    serializer_class = JobApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Return jobs for the current user"""
        return JobService.list_jobs(self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            job = JobService.create_job(self.request.user, serializer.validated_data)
            return Response(self.get_serializer(job).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class JobDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = JobApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Return jobs for the current user"""
        return JobService.list_jobs(self.request.user)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            job = JobService.update_job(instance, serializer.validated_data)
            return Response(self.get_serializer(job).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        JobService.delete_job(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
