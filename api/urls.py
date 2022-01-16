from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('tasks/', views.getTasks, name="tasks"),
    path('projects/', views.getProjects, name="projects"),
    # path('tasks/create/', views.createTask, name="create-task"),
    #path('tasks/<str:pk>/update/', views.updateTask, name="update-task"),
    #path('tasks/<str:pk>/delete/', views.deleteTask, name="delete-task"),

    path('tasks/<str:pk>/', views.getTask, name="task"),
    path('projects/<str:pk>/', views.getProject, name="projects"),
]
