from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from users.serializers import UserCreateSerializer
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny


# Create your views here.
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    # This is handling user registration
    if request.method == 'POST':
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            username=request.data['username']
            email=request.data['email']
            user.set_password(request.data['password'])
            user.save()
            return Response({"message": "User created successfully", "user_id": user.id}, status=201)
        return Response(serializer.errors, status=400)
        
