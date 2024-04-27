
from django.urls import path,include
from .views import CommentView

urlpatterns = [
    path('comments/',CommentView.as_view(),name="get All categories"),
    path('comments/<int:pk>/',CommentView.as_view(),name="getSingleCategory"),
]
