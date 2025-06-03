# apps/users/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Resume

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class LoginSerializer(serializers.Serializer):
    identifier = serializers.CharField(help_text='Username or Email')
    password = serializers.CharField(write_only=True)

    def validate_identifier(self, value):
        # Check if user exists with either username or email
        try:
            User.objects.get(username=value)
        except User.DoesNotExist:
            try:
                User.objects.get(email=value)
            except User.DoesNotExist:
                raise serializers.ValidationError('No user found with this username or email')
        return value

class ResumeSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()
    file = serializers.FileField(write_only=True)

    class Meta:
        model = Resume
        fields = [
            'id', 'title', 'resume_type', 'file', 'file_url', 'description',
            'version', 'is_active', 'created_at', 'updated_at',
            'target_job_titles', 'keywords'
        ]
        read_only_fields = ['created_at', 'updated_at']

    def get_file_url(self, obj):
        if obj.file:
            return self.context['request'].build_absolute_uri(obj.file.url)
        return None

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
