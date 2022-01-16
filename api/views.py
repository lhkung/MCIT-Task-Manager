from django.http import response
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.serializers import Serializer
from .models import Task
from .serializers import TaskSerializer
from api import serializers
from .utils import updateTask, getTaskDetail, deleteTask, getTasksList, createTask
from .utils import updateProject, getProjectDetail, deleteProject, getProjectsList, createProject
# Create your views here.


@api_view(['GET'])
def getRoutes(request):

    routes = [
        {
            'Endpoint': '/tasks/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of tasks'
        },
        {
            'Endpoint': '/tasks/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single task object'
        },
        {
            'Endpoint': '/tasks/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new task with data sent in post request'
        },
        {
            'Endpoint': '/tasks/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing task with data sent in post request'
        },
        {
            'Endpoint': '/tasks/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting task'
        },
        {
            'Endpoint': '/tasks/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of tasks'
        },

        {
            'Endpoint': '/projects/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single project object'
        },
        {
            'Endpoint': '/projects/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new project with data sent in post request'
        },
        {
            'Endpoint': '/projects/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing project with data sent in post request'
        },
        {
            'Endpoint': '/projects/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting project'
        },
    ]
    return Response(routes)


# /tasks GET
# /tasks POST
# /tasks/<id> GET
# /tasks/<id> PUT
# /tasks/<id> DELETE

@api_view(['GET', 'POST'])
def getTasks(request):

    if request.method == 'GET':
        return getTasksList(request)

    if request.method == 'POST':
        return createTask(request)


@api_view(['GET', 'PUT', 'DELETE'])
def getTask(request, pk):

    if request.method == 'GET':
        return getTaskDetail(request, pk)

    if request.method == 'PUT':
        return updateTask(request, pk)

    if request.method == 'DELETE':
        return deleteTask(request, pk)


############################################################

@api_view(['GET', 'POST'])
def getProjects(request):

    if request.method == 'GET':
        return getProjectsList(request)

    if request.method == 'POST':
        return createProject(request)


@api_view(['GET', 'PUT', 'DELETE'])
def getProject(request, pk):

    if request.method == 'GET':
        return getProjectDetail(request, pk)

    if request.method == 'PUT':
        return updateProject(request, pk)

    if request.method == 'DELETE':
        return deleteProject(request, pk)
