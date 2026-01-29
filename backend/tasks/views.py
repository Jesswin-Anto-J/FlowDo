from rest_framework import generics, permissions
from .models import Task
from .serializers import TaskSerializer


class TaskListCreateAPI(generics.ListCreateAPIView):
    """
    GET  -> List all tasks of logged-in user
    POST -> Create a new task
    """
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TaskUpdateAPI(generics.RetrieveUpdateAPIView):
    """
    GET    -> Get single task
    PUT    -> Update full task
    PATCH  -> Update partial task (mark complete)
    """
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)


class TaskDeleteAPI(generics.DestroyAPIView):

    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)



