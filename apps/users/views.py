# apps/users/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, LoginSerializer
from .services import AuthService

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            service = AuthService()
            user = service.register(serializer.validated_data)
            return Response({"message": "User registered successfully"}, status=201)
        return Response(serializer.errors, status=400)

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            service = AuthService()
            token_data = service.login(**serializer.validated_data)
            return Response(token_data, status=200)
        return Response(serializer.errors, status=400)

class LogoutView(APIView):
    def post(self, request):
        return Response({"message": "User logged out successfully"}, status=200)