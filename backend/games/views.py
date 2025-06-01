from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Game
from games.serializers import GameSerializer, GameLogSerializer
from .models import GameLog

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def game_list(request):
    #pulling from my local game table
    if request.method == "GET":
        games = Game.objects.all()
        serializer = GameSerializer(games, many=True)
        return Response(serializer.data)
        
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def game_log(request):
     if request.method == "POST":
        serializer = GameLogSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
     
     elif request.method == "GET":
        logs = GameLog.objects.filter(user=request.user)
        serializer = GameLogSerializer(logs, many=True)
        return Response(serializer.data)
    
