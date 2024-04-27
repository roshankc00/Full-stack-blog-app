from django.shortcuts import render
from .serializers import CommentSerializer,GetCommentSerializer
from .renderer import ResponseRenderer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Comment
# Create your views here.
class CommentView(APIView):
    renderer_classes=[ResponseRenderer]
    def post(self,request,format=None):
        serializer=CommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'success':True,'message':'Comment created successfully'},status=status.HTTP_201_CREATED)           
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    def get(self,request,pk=None,format=None):
        if pk is not None:
            cat=Comment.objects.get(id=pk)
            serializer=GetCommentSerializer(cat)
            return Response(serializer.data)
        else:
            all_cat = Comment.objects.all()
            serializer = GetCommentSerializer(all_cat, many=True)
            return Response(serializer.data)
    def patch(self,request,pk=None,format=None):
        if pk is not None:
            cat=Comment.objects.get(pk=pk)
            serializer=CommentSerializer(cat,data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'message':"Comment Updated successfully"}) 
        else:
            return Response({'success':True,'message':"Id field is required"},status=status.HTTP_400_BAD_REQUEST) 
    def delete(self, request,pk=None,format=None):
        if pk is not None:
          task=Comment.objects.get(pk=pk)
          task.delete()
          return Response({'success':True,'message':"Comment Deleted successfully"})        
        else:
            return Response({'message':"Id field is required"},status=status.HTTP_400_BAD_REQUEST) 