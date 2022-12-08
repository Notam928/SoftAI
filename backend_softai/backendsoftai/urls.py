from backendsoftai.views import EmployeViewSet,ClientViewSet
from rest_framework.routers import DefaultRouter
from backendsoftai import views

router = DefaultRouter()
router.register(r'clients', views.ClientViewSet, basename='client')
router.register(r'employes', views.EmployeViewSet, basename='employe')
urlpatterns = router.urls