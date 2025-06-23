from rest_framework import serializers
from users.models import CustomUser  


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password']



class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'bio', 'avatar', 'favorite_games']
        read_only_fields = fields

class UserProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'bio', 'avatar', 'favorite_games']
        extra_kwargs = {
            'favorite_games': {'required': False},
            'avatar': {'required': False, 'allow_null': True},
        }