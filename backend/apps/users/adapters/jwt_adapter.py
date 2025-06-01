from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from rest_framework.exceptions import AuthenticationFailed
from .base import IAuthAdapter

User = get_user_model()

class JWTAuthAdapter(IAuthAdapter):
    def authenticate(self, identifier: str, password: str) -> dict:
        """
        Authenticate a user with either username or email.
        Returns a dictionary containing access token, refresh token and user data.
        """
        # Try to find the user by username or email
        try:
            user = User.objects.get(username=identifier)
        except User.DoesNotExist:
            try:
                user = User.objects.get(email=identifier)
            except User.DoesNotExist:
                raise AuthenticationFailed("Invalid credentials")

        # Verify the password
        if not user.check_password(password):
            raise AuthenticationFailed("Invalid credentials")

        # Create tokens
        refresh = RefreshToken.for_user(user)

        return {
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "username": user.username,
            "email": user.email
        }

    def register(self, user_data: dict) -> User:
        return User.objects.create_user(**user_data)