from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Game
from games.serializers import GameSerializer, GameLogSerializer
from .models import GameLog
from django.conf import settings
import requests

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
     
def get_igdb_token():
    response = requests.post('https://id.twitch.tv/oauth2/token', params={
        'client_id': settings.IGDB_CLIENT_ID,
        'client_secret': settings.IGDB_CLIENT_SECRET,
        'grant_type': 'client_credentials'
    })
    response.raise_for_status()
    return response.json()['access_token']
    

@api_view(['GET'])
@permission_classes([AllowAny])    
def search_igdb(request):
    query = request.GET.get('query', '')
    if not query:
        return Response({'error': 'No query provided'}, status=400)

    token = get_igdb_token()
    headers = {
        'Client-ID': settings.IGDB_CLIENT_ID,
        'Authorization': f'Bearer {token}',
    }

    body = f'search "{query}"; fields id,name,cover.url; limit 10;'

    response = requests.post('https://api.igdb.com/v4/games', data=body, headers=headers)

    if response.status_code != 200:
        return Response({'error': 'Failed to fetch from IGDB'}, status=response.status_code)

    return Response(response.json())