from django.db import models
from django.utils import timezone
from users.models import User



class Categories(models.Model):
    name=models.CharField(max_length=200)
    description=models.CharField(max_length=400)
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = models.DateTimeField(default=timezone.now)
    
    
         
class Tags(models.Model):
    name=models.CharField(max_length=200)
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = models.DateTimeField(default=timezone.now)

class Post(models.Model):
    title=models.CharField(max_length=200)
    content=models.CharField(max_length=400)
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = models.DateTimeField(default=timezone.now)
    category = models.ForeignKey(Categories, on_delete=models.CASCADE, related_name='posts')
    tags = models.ManyToManyField(Tags)
    user= models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')  
  
    
