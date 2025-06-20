from django.urls import path, include
from users.views import user_profile

urlpatterns = [
    path('profile/', user_profile, name='user-profile'),
]
