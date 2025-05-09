# apps/users/services.py
from apps.users.adapters.jwt_adapter import JWTAuthAdapter

class AuthService:
    def __init__(self, adapter=None):
        self.adapter = adapter or JWTAuthAdapter()

    def login(self, email, password):
        return self.adapter.authenticate(email, password)

    def register(self, user_data):
        return self.adapter.register(user_data)
