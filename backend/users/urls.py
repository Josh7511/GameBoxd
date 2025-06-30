from django.urls import path, include
from users.views import user_profile, edit_user_profile, other_user_profile

urlpatterns = [
    path('profile/', user_profile, name='user-profile'),
    path('profile/edit/',   edit_user_profile,name='user-profile-edit'),
     path('profile/<str:username>/', other_user_profile, name='other_user_profile'),
]
