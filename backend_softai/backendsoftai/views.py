from django.shortcuts import render
from .models import Employe,Client
from .serializers import EmployeSerializer,ClientSerializer
from rest_framework import viewsets

# La vue des employee 
class EmployeViewSet(viewsets.ModelViewSet):
    serializer_class = EmployeSerializer
    queryset = Employe.objects.all()

# La vue des employee
class ClientViewSet(viewsets.ModelViewSet):
    serializer_class = ClientSerializer
    queryset = Client.objects.all()
