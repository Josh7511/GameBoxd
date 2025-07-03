from django.urls import path
from . import views

urlpatterns = [
    path("follow/", views.FollowCreateView.as_view(), name="follow"),
    path("unfollow/<int:followee_id>/", views.UnfollowDeleteView.as_view(), name="unfollow"),
    path("profile/<int:user_id>/followers/", views.FollowersListView.as_view(), name="followers"),
    path("profile/<int:user_id>/following/", views.FollowingListView.as_view(), name="following"),
]