from django.conf import settings
from django.db import models

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
