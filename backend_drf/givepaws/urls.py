from . import views
from django.urls import path

urlpatterns = [
    path("hospitals/",views.hospital_list,name="hospital_list"),
    path("hospitals/<int:pk>",views.hospital_detail,name="hospital_detail"),
]