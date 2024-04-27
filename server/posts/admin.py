from django.contrib import admin
from .models import Tags,Categories,Post

# Register your models here.
@admin.register(Categories)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')


@admin.register(Tags)
class TagsAdmin(admin.ModelAdmin):
    list_display = ('name',)
    
    
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'content', 'category', 'users')
    