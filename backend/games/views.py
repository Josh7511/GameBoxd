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
        
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def game_log(request):
    if request.method == "POST":
        serializer = GameLogSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    

@api_view(['GET'])
@permission_classes([AllowAny])
def game_log_by_id(request):
    game_id = request.GET.get('query', '')
    if not game_id:
        return Response({'error': 'Game ID is required'}, status=400)
    
    logs = GameLog.objects.filter(game_id=game_id)
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

    body = f'search "{query}"; fields id, summary, name,cover.url; where version_parent=null; limit 10;'

    response = requests.post('https://api.igdb.com/v4/games', data=body, headers=headers)

    if response.status_code != 200:
        return Response({'error': 'Failed to fetch from IGDB'}, status=response.status_code)

    return Response(response.json())




@api_view(['GET'])
@permission_classes([AllowAny])
def search_igdb_by_id(request):
    game_id = request.GET.get('id')
    if not game_id:
        return Response({'error': 'No game ID provided'}, status=400)

    token = get_igdb_token()
    headers = {
        'Client-ID': settings.IGDB_CLIENT_ID,
        'Authorization': f'Bearer {token}',
    }

    body = f'fields name, summary, cover.url; where id = {game_id};'

    response = requests.post('https://api.igdb.com/v4/games', headers=headers, data=body)

    if response.status_code != 200:
        return Response({'error': 'Failed to fetch game info'}, status=response.status_code)

    return Response(response.json())


@api_view(['GET'])
@permission_classes([AllowAny])
def popular_games(request):
    token = get_igdb_token()
    headers = {
        'Client-ID': settings.IGDB_CLIENT_ID,
        'Authorization': f'Bearer {token}',
    }

    pop_body = '''
        fields game_id, value, popularity_type;
        sort value desc;
        where popularity_type = 1;
        limit 6;
    '''
    pop_response = requests.post('https://api.igdb.com/v4/popularity_primitives', data=pop_body, headers=headers)

    if pop_response.status_code != 200:
        return Response({'error': 'Failed to fetch popularity data'}, status=pop_response.status_code)

    pop_data = pop_response.json()
    game_ids = [str(entry['game_id']) for entry in pop_data if 'game_id' in entry]

    if not game_ids:
        return Response([])

    games_body = f'''
        fields id, name, cover.url;
        where id = ({','.join(game_ids)});
    '''
    games_response = requests.post('https://api.igdb.com/v4/games', data=games_body, headers=headers)

    if games_response.status_code != 200:
        return Response({'error': 'Failed to fetch game details'}, status=games_response.status_code)

    return Response(games_response.json())
