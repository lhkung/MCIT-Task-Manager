from django.http import response
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.serializers import Serializer
from .models import Task
from .serializers import TaskSerializer
from api import serializers
from .utils import updateTask, getTaskDetail, deleteTask, getTasksList, createTask
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


# @api_view(['POST'])
# def createTask(request):
#     data = request.data
#     task = Task.objects.create(
#         body=data['body']
#     )
#     serializer = TaskSerializer(task, many=False)
#     return Response(serializer.data)


# @api_view(['PUT'])
# def updateTask(request, pk):
#     data = request.data
#     task = Task.objects.get(id=pk)
#     serializer = TaskSerializer(instance=task, data=data)

#     if serializer.is_valid():
#         serializer.save()

#     return Response(serializer.data)


# @api_view(['DELETE'])
# def deleteTask(request, pk):
#     task = Task.objects.get(id=pk)
#     task.delete()
#     return Response('Task was deleted!')
