from django.db import models
from django.conf import settings

# Create your models here.

class Game(models.Model):
    igdb_id = models.IntegerField(unique=True)
    title = models.CharField(max_length=255)
    def __str__(self):
        return self.title

class GameLog(models.Model):
    STATUS_CHOICES = [
        ('playlist', 'Playlist'),
        ('completed', 'Completed'),
        ('inprogress', 'In Progress'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices = STATUS_CHOICES)  # playlist, completed, inprogress
    rating = models.IntegerField(null=True, blank=True)  # 1-5 rating
    date_played = models.DateTimeField(auto_now_add=True)
    review = models.TextField(blank=True, null=True)
