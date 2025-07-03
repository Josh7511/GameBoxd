from django.shortcuts import render
from rest_framework import generics, permissions
from .models import Follow
from .serializers import FollowSerializer

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
        user_id = self.kwargs["user_id"]
        return Follow.objects.filter(followee_id=user_id)

class FollowingListView(generics.ListAPIView):
    serializer_class = FollowSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        user_id = self.kwargs["user_id"]
        return Follow.objects.filter(follower_id=user_id)