
from rest_framework import serializers
from .models import Post, Categories,Tags
from users.serializers import UserSerializers
from comments.models import Comment


class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model=Categories
        fields='__all__'
        
class TagsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Tags
        fields='__all__'
        
class GetCommentSerializer(serializers.ModelSerializer):
    user=UserSerializers()
    class Meta:
        model = Comment
        fields = ['id','content','post','user']


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id','title', 'content', 'category', 'tags','user']
class GetPostSerializer(serializers.ModelSerializer):
    category=CategoriesSerializer()
    tags = TagsSerializer(many=True)
    user=UserSerializers()
    comments = serializers.SerializerMethodField()  

    class Meta:
        model = Post
        fields = ['id','title', 'content', 'category', 'tags','user','comments']
    def get_comments(self, obj):
        comments = Comment.objects.filter(post=obj)
        serializer = GetCommentSerializer(comments, many=True)
        return serializer.data