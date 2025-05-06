from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from rest_framework.exceptions import AuthenticationFailed
from .base import IAuthAdapter

User = get_user_model()

class JWTAuthAdapter(IAuthAdapter):
    def authenticate(self, email: str, password: str) -> dict:
        """
        This function is the entry-point for the authentication process.
        It takes an email and a password as arguments and returns a dictionary
        with an access token and a refresh token. If the credentials are invalid
        it raises an AuthenticationFailed exception.
        """

        # First we call the authenticate function to get the user object
        user = authenticate(email=email, password=password)

        # If the user is not found, raise an AuthenticationFailed exception
        if not user:
            raise AuthenticationFailed("Invalid credentials")

        # If the user is found, create a RefreshToken object for the user
        # This object contains a pair of access/refresh tokens
        refresh = RefreshToken.for_user(user)

        # Return a dictionary with the access token, the refresh token and
        # the user data (id and email)
        return {
            # The access token is the one that is used to authenticate the user
            # in the API
            "access": str(refresh.access_token),

            # The refresh token is the one that is used to obtain a new access
            # token when the previous one expires
            "refresh": str(refresh),

            # The user data is a dictionary with the user's id and email
            "user": {"id": user.id, "email": user.email}
        }

    def register(self, user_data: dict) -> User:
        return User.objects.create_user(**user_data)