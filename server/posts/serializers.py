
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


# class PostSerializer(serializers.Serializer):
#     category=CategoriesSerializer()
#     tags = TagsSerializer(many=True)
#     user=UserSerializers()
#     class Meta:
#         model=Post
#         fields=["title",'content','category','tags','user']
#         def create(self, validated_data):
#           category_id = validated_data.pop('category')
#           tags_ids = validated_data.pop('tags')
#           user_id = validated_data.pop('user')
#           post = Post.objects.create(category_id=category_id, user_id=user_id, **validated_data)
#           post.tags.add(*tags_ids)
#           return post

class PostSerializer(serializers.ModelSerializer):
    category_id = serializers.IntegerField()
    tags_ids = serializers.ListField(child=serializers.IntegerField())
    user_id = serializers.IntegerField()

    class Meta:
        model = Post
        fields = ['title', 'content', 'category_id', 'tags_ids', 'user_id']

    def create(self, validated_data):
        category_id = validated_data.pop('category_id')
        tags_ids = validated_data.pop('tags_ids')
        user_id = validated_data.pop('user_id')

        post = Post.objects.create(category_id=category_id, user_id=user_id, **validated_data)
        post.tags.add(*tags_ids)

        return post



class GetPostSerializer(serializers.ModelSerializer):
    category=CategoriesSerializer()
    tags = TagsSerializer(many=True)
    user=UserSerializers()

    class Meta:
        model = Post
        fields = ['id','title', 'content', 'category', 'tags','user']