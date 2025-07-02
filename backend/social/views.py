from django.shortcuts import render, get_object_or_404
from rest_framework import generics, permissions
from .models import Follow
from .serializers import FollowSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class FollowCreateView(generics.CreateAPIView):
    serializer_class = FollowSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(follower=self.request.user)

class UnfollowDeleteView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        followee_id = self.kwargs["followee_id"]
        return Follow.objects.get(
            follower=self.request.user,
            followee_id=followee_id
        )

class FollowersListView(generics.ListAPIView):
    serializer_class = FollowSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        username = self.kwargs["username"]
        user = get_object_or_404(User, username=username)
        return Follow.objects.filter(followee=user)

class FollowingListView(generics.ListAPIView):
    serializer_class = FollowSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        username = self.kwargs["username"]
        user = get_object_or_404(User, username=username)
        return Follow.objects.filter(followee=user)