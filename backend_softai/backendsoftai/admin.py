from django.contrib import admin
from .models import Employe,Client
# Register your models here.

class EmployeeAdmin(admin.ModelAdmin):
    list = ('matricule','nom', 'prenom', 'departement','dob')

    admin.site.register(Employe)
    
class ClientAdmin(admin.ModelAdmin):
    list = ('nom', 'prenom', 'telephone','adresse','quartier')

    admin.site.register(Client)