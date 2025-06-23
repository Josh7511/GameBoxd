from rest_framework import serializers
from .models import Game, GameLog
from users.serializers import UserProfileSerializer

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['id', 'igdb_id', 'title']


class GameLogSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    
    user_avatar = serializers.ImageField(
        source='user.avatar',
        read_only=True,
        use_url=True,
    )

    class Meta:
        model = GameLog
        fields = [
            'id',
            'user',        
            'user_avatar',  
            'game_id',
            'status',
            'rating',
            'date_played',
            'review',
        ]
        read_only_fields = ['user', 'date_played']