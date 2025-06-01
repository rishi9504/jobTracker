from rest_framework import serializers
from .models import JobApplication

class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = [
            'id', 
            'company', 
            'position', 
            'status', 
            'applied_date',
            'description',
            'salary',
            'location',
            'remote',
            'notes'
        ]
        read_only_fields = ['id', 'applied_date']

    def create(self, validated_data):
        # Associate the job with the current user
        user = self.context['request'].user
        return JobApplication.objects.create(user=user, **validated_data)
