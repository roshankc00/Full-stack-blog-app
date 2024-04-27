
from rest_framework import serializers
from .models import Post, Categories,Tags
from users.serializers import UserSerializers



class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model=Categories
        fields='__all__'
        
class TagsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Tags
        fields='__all__'


class BlogSerializer(serializers.Serializer):
    category=CategoriesSerializer()
    tags = TagsSerializer(many=True)
    tags=TagsSerializer()
    user=UserSerializers()
    class Meta:
        model=Post
        field='__all__'
    
    