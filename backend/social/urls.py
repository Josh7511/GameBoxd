from django.urls import path
from . import views

urlpatterns = [
    path("follow/", views.FollowCreateView.as_view(), name="follow"),
    path("unfollow/<int:followee_id>/", views.UnfollowDeleteView.as_view(), name="unfollow"),
    path("profile/<str:username>/followers/", views.FollowersListView.as_view(), name="followers"),
    path("profile/<str:username>/following/", views.FollowingListView.as_view(), name="following"),
]