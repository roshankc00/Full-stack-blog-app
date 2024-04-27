from rest_framework import serializers
from .models import Comment
from users.serializers import UserSerializers
from posts.serializers import GetPostSerializer

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id','content','post','user']
        
class GetCommentSerializer(serializers.ModelSerializer):
    user=UserSerializers()
    class Meta:
        model = Comment
        fields = ['id','content','post','user']