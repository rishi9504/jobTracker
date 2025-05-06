from abc import ABC, abstractmethod
from django.contrib.auth.models import AbstractBaseUser

class IAuthAdapter(ABC):
    @abstractmethod
    def authenticate(self, email: str, password: str) -> dict:
        pass

    @abstractmethod
    def register(self, user_data: dict) -> AbstractBaseUser:
        pass