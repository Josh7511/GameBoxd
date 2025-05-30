from rest_framework import serializers
from .models import Game, GameLog

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['id', 'igdb_id', 'title']

class GameLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameLog
        fields = ['id', 'user', 'game', 'status', 'rating', 'date_played', 'review']
        read_only_fields = ['user', 'date_played']  # user and date_played are set automatically