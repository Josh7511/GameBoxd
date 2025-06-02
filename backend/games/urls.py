from django.urls import path
from .views import game_list, game_log, search_igdb

urlpatterns = [
    path('games/', game_list, name='game-list'),
    path('games-log/',game_log, name='game-log'),
    path('search-igdb/', search_igdb, name='search-igdb'),
]