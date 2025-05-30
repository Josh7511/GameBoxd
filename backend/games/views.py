from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Game
from games.serializers import GameSerializer, GameLogSerializer

@api_view(['GET', 'POST'])

def game_list(request):
    #pulling from my local game table
    if request.method == "GET":
        games = Game.objects.all()
        serializer = GameSerializer(games, many=True)
        return Response(serializer.data)
        
