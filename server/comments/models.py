from django.utils import timezone
from django.db import models
from users.models import User
from posts.models import Post
# Create your models here.

   
class Comment(models.Model):
    content=models.CharField(max_length=200)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user= models.ForeignKey(User, on_delete=models.CASCADE) 
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = models.DateTimeField(default=timezone.now) 

