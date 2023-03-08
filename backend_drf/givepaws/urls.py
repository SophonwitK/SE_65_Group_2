from . import views
from django.urls import path

urlpatterns = [
    path("hospitals/",views.hospital_list,name="hospital_list"),
    path("hospitals/<int:pk>",views.hospital_detail,name="hospital_detail"),
    path("users/",views.user_list,name="hospital_list"),
    path("users/<int:pk>",views.user_detail,name="hospital_detail"),
    path("authens/",views.authen_list,name="authen_list"),
    path("authens/<int:pk>",views.authen_detail,name="authen_detail"),
    path("authenimages/",views.authenimages_list,name="authenimages_list"),
    path("authenimages/<int:pk>",views.authenimages_detail,name="authenimages_detail"),
]