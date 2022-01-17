from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('tasks/', views.getTasks, name="tasks"),
    path('projects/', views.getProjects, name="projects"),
    path('tasks/<str:pk>/', views.getTask, name="task"),
    path('projects/<str:pk>/', views.getProject, name="projects"),
]
