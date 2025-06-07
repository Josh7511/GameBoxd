from rest_framework import serializers
from .models import Game, GameLog

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['id', 'igdb_id', 'title']

class GameLogSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = GameLog
        fields = ['user', 'game_id', 'status', 'rating', 'date_played', 'review']
        read_only_fields = ['user', 'date_played']  # user and date_played are set automatically