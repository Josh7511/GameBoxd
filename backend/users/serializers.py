from rest_framework import serializers
from users.models import CustomUser  




class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password']



