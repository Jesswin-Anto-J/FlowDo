from django.urls import path
from .views import TaskListCreateAPI, TaskUpdateAPI, TaskDeleteAPI

urlpatterns = [
    path('', TaskListCreateAPI.as_view(), name='task-list-create'),
    path('<int:pk>/', TaskUpdateAPI.as_view(), name='task-update'),
    path('<int:pk>/delete/', TaskDeleteAPI.as_view(), name='task-delete'),
]
