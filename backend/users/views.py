from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from users.serializers import UserCreateSerializer, UserProfileSerializer, UserProfileUpdateSerializer, UserSearchSerializer
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.decorators import parser_classes
from users.models import CustomUser
from django.contrib.auth import get_user_model

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, JSONParser])
def edit_user_profile(request):
    serializer = UserProfileUpdateSerializer(
        instance=request.user,
        data=request.data,
        partial=True
    )
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


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
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    serializer = UserProfileSerializer(
        request.user,
        context={'request': request}
    )
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def other_user_profile(request, username):
    user = get_object_or_404(CustomUser, username=username)
    serializer = UserProfileSerializer(user)
    return Response(serializer.data)

User = get_user_model()

@api_view(['GET'])
@permission_classes([AllowAny])
def search_users(request):
    q = request.GET.get('query', '').strip()
    if not q:
        return Response({'error': 'No query provided'}, status=400)

    qs = User.objects.filter(username__icontains=q)[:20]
    serializer = UserSearchSerializer(qs, many=True, context={'request': request})
    return Response(serializer.data)