from .base import IAuthAdapter
from django.contrib.auth import get_user_model

User = get_user_model()

class GoogleOAuthAdapter(IAuthAdapter):
    def authenticate(self, token: str, password: str = None) -> dict:
        # Verify token with Google and extract user info
        # Check if user exists in DB, else create
        raise NotImplementedError("Google OAuth login not implemented yet")

    def register(self, user_data: dict) -> User:
        raise NotImplementedError("Registration via Google is handled in authenticate")