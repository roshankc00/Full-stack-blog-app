
from django.urls import path,include
from .views import CategoriesView,TagsView

# register StudentViewset with Router 


urlpatterns = [
    path('categories/',CategoriesView.as_view(),name="get All categories"),
    path('categories/<int:pk>/',CategoriesView.as_view(),name="getSingleCategory"),
    path('tags/',TagsView.as_view(),name="get All categories"),
    path('tags/<int:pk>/',TagsView.as_view(),name="getSingleCategory"),
]