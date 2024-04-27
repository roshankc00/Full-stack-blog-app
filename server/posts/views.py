from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import PostSerializer,CategoriesSerializer,TagsSerializer,GetPostSerializer
from .renderer import ResponseRenderer
from rest_framework import status
from rest_framework.response import Response
from .models import Tags,Post,Categories
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class CategoriesView(APIView):
    renderer_classes=[ResponseRenderer]
    def post(self,request,format=None):
        serializer=CategoriesSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'success':True,'message':'Categories created successfully'},status=status.HTTP_201_CREATED)           
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    def get(self,request,pk=None,format=None):
        if pk is not None:
            cat=Categories.objects.get(id=pk)
            serializer=CategoriesSerializer(cat)
            return Response(serializer.data)
        else:
            all_cat = Categories.objects.all()
            serializer = CategoriesSerializer(all_cat, many=True)
            return Response(serializer.data)
    def patch(self,request,pk=None,format=None):
        if pk is not None:
            cat=Categories.objects.get(pk=pk)
            serializer=CategoriesSerializer(cat,data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'message':"Category  updated successfully"}) 
        else:
            return Response({'success':True,'message':"Id field is required"},status=status.HTTP_400_BAD_REQUEST) 
    def delete(self, request,pk=None,format=None):
        if pk is not None:
          task=Categories.objects.get(pk=pk)
          task.delete()
          return Response({'success':True,'message':"Category Deleted successfully"})        
        else:
            return Response({'message':"Id field is required"},status=status.HTTP_400_BAD_REQUEST) 
  
        
class TagsView(APIView):
    renderer_classes=[ResponseRenderer]
    def post(self,request,format=None):
        serializer=TagsSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'success':True,'message':'Tags created successfully'},status=status.HTTP_201_CREATED)           
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    def get(self,request,pk=None,format=None):
        if pk is not None:
            cat=Tags.objects.get(id=pk)
            serializer=TagsSerializer(cat)
            return Response(serializer.data)
        else:
            all_cat = Tags.objects.all()
            serializer = TagsSerializer(all_cat, many=True)
            return Response(serializer.data)
    def patch(self,request,pk=None,format=None):
        if pk is not None:
            cat=Tags.objects.get(pk=pk)
            serializer=TagsSerializer(cat,data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'message':"tags Updated successfully"}) 
        else:
            return Response({'success':True,'message':"Id field is required"},status=status.HTTP_400_BAD_REQUEST) 
    def delete(self, request,pk=None,format=None):
        if pk is not None:
          task=Tags.objects.get(pk=pk)
          task.delete()
          return Response({'success':True,'message':"tags Deleted successfully"})        
        else:
            return Response({'message':"Id field is required"},status=status.HTTP_400_BAD_REQUEST) 
        
        
class PostView(APIView):
    renderer_classes=[ResponseRenderer]
    def post(self,request,format=None):
        serializer=PostSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'success':True,'message':'Post created successfully'},status=status.HTTP_201_CREATED)           
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    def get(self,request,pk=None,format=None):
        if pk is not None:
            cat=Post.objects.get(id=pk)
            serializer=GetPostSerializer(cat)
            return Response(serializer.data)
        else:
            all_cat = Post.objects.all()
            serializer = GetPostSerializer(all_cat, many=True)
            return Response(serializer.data)
    def patch(self,request,pk=None,format=None):
        if pk is not None:
            cat=Post.objects.get(pk=pk)
            serializer=PostSerializer(cat,data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'message':"Post Updated successfully"}) 
        else:
            return Response({'success':True,'message':"Id field is required"},status=status.HTTP_400_BAD_REQUEST) 
    def delete(self, request,pk=None,format=None):
        if pk is not None:
          task=Post.objects.get(pk=pk)
          task.delete()
          return Response({'success':True,'message':"Post Deleted successfully"})        
        else:
            return Response({'message':"Id field is required"},status=status.HTTP_400_BAD_REQUEST)         