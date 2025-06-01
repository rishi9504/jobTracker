# apps/users/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model

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
