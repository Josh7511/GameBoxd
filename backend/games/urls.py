from django.urls import path
from .views import game_list, game_log, search_igdb, search_igdb_by_id, game_log_by_id, popular_games

urlpatterns = [
    path('games/', game_list, name='game-list'),
    path('games-log/',game_log, name='game-log'),
    path('search-igdb/', search_igdb, name='search-igdb'),
    path('search-by-id/', search_igdb_by_id, name='search_igdb_by_id'),
    path('game-log-by-id/', game_log_by_id, name='game_log_by_id'),
    path('popular-games/', popular_games, name='popular_games'),
]