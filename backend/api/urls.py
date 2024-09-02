from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, LoginView, ProjectViewSet, TaskViewSet,api_root


router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'tasks', TaskViewSet, basename='task')

urlpatterns = [
    path('', api_root, name='api-root'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('', include(router.urls)),
]