# apps/users/services.py
from apps.users.adapters.jwt_adapter import JWTAuthAdapter
import os
from django.core.exceptions import ValidationError

class AuthService:
    def __init__(self, adapter=None):
        self.adapter = adapter or JWTAuthAdapter()

    def login(self, identifier, password):
        return self.adapter.authenticate(identifier=identifier, password=password)

    def register(self, user_data):
        return self.adapter.register(user_data)

    def handle_resume_upload(self, file, user):
        """
        Handle resume file upload, validate file type and size
        """
        # List of allowed file types
        ALLOWED_EXTENSIONS = {'.pdf', '.doc', '.docx'}
        # Maximum file size (5MB)
        MAX_FILE_SIZE = 5 * 1024 * 1024  

        # Get file extension
        file_ext = os.path.splitext(file.name)[1].lower()
        
        # Validate file type
        if file_ext not in ALLOWED_EXTENSIONS:
            raise ValidationError(f"Invalid file type. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}")
        
        # Validate file size
        if file.size > MAX_FILE_SIZE:
            raise ValidationError("File size too large. Maximum size is 5MB.")
        
        return True
