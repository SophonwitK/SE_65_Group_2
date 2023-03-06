from . import views
from django.urls import path

urlpatterns = [
    path("hospitals/",views.hospital_list,name="hospital_list"),
    path("hospitals/<int:pk>",views.hospital_detail,name="hospital_detail"),
    path("users/",views.user_list,name="hospital_list"),
    path("users/<int:pk>",views.user_detail,name="hospital_detail"),
    path("authens/",views.authen_list,name="authen_list"),
    path("authens/<int:pk>",views.authen_detail,name="authen_detail"),
    path("authenimgs/",views.authenimg_list,name="authenimg_list"),
    path("authenimgs/<int:pk>",views.authenimg_detail,name="authenimg_detail"),
]