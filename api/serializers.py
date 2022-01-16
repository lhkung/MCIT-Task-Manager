from rest_framework.serializers import ModelSerializer
from .models import Task
from .models import Project


class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'


class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
