from rest_framework.response import Response
from .models import Task
from .models import Project
from .serializers import TaskSerializer
from .serializers import ProjectSerializer


def getTasksList(request):
    order_by_list = ['priority', 'created', 'title']
    tasks = Task.objects.filter(session_key=request.session.session_key).order_by(*order_by_list)
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


def getTaskDetail(request, pk):
    tasks = Task.objects.get(id=pk)
    serializer = TaskSerializer(tasks, many=False)
    return Response(serializer.data)


def createTask(request):
    if not request.session.session_key:
        request.session.save()
    data = request.data
    task = Task.objects.create(
        body=data['body'],
        title=data['title'],
        project_id=data['project_id'],
        category=data['category'],
        priority=data['priority'],
        session_key = request.session.session_key
    )
    serializer = TaskSerializer(task, many=False)
    return Response(serializer.data)


def updateTask(request, pk):
    data = request.data
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(instance=task, data=data)

    if serializer.is_valid():
        serializer.save()

    return serializer.data


def deleteTask(request, pk):
    task = Task.objects.get(id=pk)
    task.delete()
    return Response('Task was deleted!')


def getTasksList(request):
    order_by_list = ['priority', 'created', 'title']
    tasks = Task.objects.all().order_by(*order_by_list)
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


def getTaskDetail(request, pk):
    tasks = Task.objects.get(id=pk)
    serializer = TaskSerializer(tasks, many=False)
    return Response(serializer.data)

##########################################################################################


def getProjectsList(request):
    order_by_list = ['created', 'project']
    projects = Project.objects.filter(session_key=request.session.session_key).order_by(*order_by_list)
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)


def getProjectDetail(request, pk):
    projects = Project.objects.get(id=pk)
    serializer = ProjectSerializer(projects, many=False)
    return Response(serializer.data)


def createProject(request):
    if not request.session.session_key:
        request.session.save()
    data = request.data
    project = Project.objects.create(
        project=data['project'],
        description=data['description'],
        session_key = request.session.session_key
    )
    serializer = ProjectSerializer(project, many=False)
    return Response(serializer.data)


def updateProject(request, pk):
    data = request.data
    project = Project.objects.get(id=pk)
    serializer = ProjectSerializer(instance=project, data=data)

    if serializer.is_valid():
        serializer.save()

    return serializer.data


def deleteProject(request, pk):
    project = Project.objects.get(id=pk)
    project.delete()
    return Response('Project was deleted!')
