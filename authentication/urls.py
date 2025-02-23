from django.urls import path
from . import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('register/', views.register, name='register'),
    path('validate-username/', csrf_exempt(views.UsernameValidationView.as_view()),
         name='validate-username'),
    path('validate-email/', csrf_exempt(views.EmailValidationView.as_view()),
         name='validate-email'),
]