from django.urls import path
from .views import game_list, game_log

urlpatterns = [
    path('games/', game_list, name='game-list'),
    path('game-log/',game_log, name='game-log'),
]