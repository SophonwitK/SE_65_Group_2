from django.urls import path
from . import views

urlpatterns = [
     path("register",views.register,name="register"),
     path("login",views.login,name="login"),
     path("user",views.user,name="user"),
     path("user/<int:pk>",views.userupdate,name="userupdate"),
     path("logout",views.logout,name="logout"),
     path("password/<int:pk>",views.update_passowrd,name="update_passowrd"),
]