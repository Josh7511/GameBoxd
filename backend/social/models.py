from django.conf import settings
from django.db import models
from django.contrib.auth import get_user_model

class Follow(models.Model):
    follower = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="following",
        on_delete=models.CASCADE
    )
    followee = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="followers",
        on_delete=models.CASCADE
    )
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("follower", "followee")
        ordering = ["-created"]

    def __str__(self):
        return f"{self.follower} → {self.followee}"


User = get_user_model()

def follow(self, other_user):
    if self == other_user:
        return
    Follow.objects.get_or_create(follower=self, followee=other_user)

def unfollow(self, other_user):
    Follow.objects.filter(follower=self, followee=other_user).delete()

def is_following(self, other_user):
    return Follow.objects.filter(follower=self, followee=other_user).exists()

User.add_to_class("follow", follow)
User.add_to_class("unfollow", unfollow)
User.add_to_class("is_following", is_following)