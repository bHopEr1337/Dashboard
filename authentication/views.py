from django.shortcuts import render
from django.views import View
from django.http import HttpResponse
from django.http import JsonResponse
import json
from django.contrib.auth.models import User
from validate_email import validate_email
# Create your views here.


class RegistrationView(View):
    def get(self, request):
        return render(request, 'authentication/register.html')


def register(request):
    return render(request, 'authentication/register.html')


class UsernameValidationView(View):
    def post(self, request):
        data = json.loads(request.body)
        username = data['username']
        if not str(username).isalnum():
            return JsonResponse({'username_error': 'username must be alphanumeric'}, status=400)

        if User.objects.filter(username=username).exists():
            return JsonResponse({'username_error': 'username in use, choose another one'}, status=409)
        return JsonResponse({'username_valid': True})

class EmailValidationView(View):
    def post(self, request):
        data = json.loads(request.body)
        email = data['email']
        if not validate_email(email):
            return JsonResponse({'email_error': 'Email is invalid'}, status=400)
        if User.objects.filter(email=email).exists():
            return JsonResponse({'email_error': 'Email already registered'}, status=409)
        return JsonResponse({'email_valid': True})

