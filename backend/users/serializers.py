from rest_framework import serializers
from users.models import CustomUser  
from django.contrib.auth import get_user_model


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password']



class UserProfileSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(read_only=True, use_url=True)

    class Meta:
        model = CustomUser
        fields = ['id','username','email','bio','avatar','favorite_games', 'review_count']
        read_only_fields = fields

class UserProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'bio', 'avatar', 'favorite_games']
        extra_kwargs = {
            'favorite_games': {'required': False},
            'avatar': {'required': False, 'allow_null': True},
        }

User = get_user_model()

class UserSearchSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'avatar_url', 'bio']

    def get_avatar_url(self, obj):
        request = self.context.get('request')
        if obj.avatar:
            return request.build_absolute_uri(obj.avatar.url)
        return None
