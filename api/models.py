from django.db import models

# Create your models here.


class Project(models.Model):
    project = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    # changed to return a list of title and body
    def __str__(self):
        return self.description[0:50]


class Task(models.Model):
    # added new field for title
    body = models.TextField(null=True, blank=True)
    title = models.TextField(null=True, blank=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    category = models.TextField(null=True, blank=True)
    priority = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    # changed to return a list of title and body
    def __str__(self):
        return self.body[0:50]
