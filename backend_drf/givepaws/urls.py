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
    path("user/authen/<int:pk>",views.check_authen_detail,name="check_authen_detail"),
    path("authen/check/",views.authen_check_list,name="authen_check_list"),
    path("authen/check/<int:pk>",views.authen_check_detail,name="authen_check_detail"),
    path("user/authen/check/<int:pk>",views.user_check_authen,name="user_check_authen"),
    path("payments/",views.payment_list,name="payment_list"),
    path("payments/<int:pk>",views.payments_detail,name="payments_detail"),
    path("payments/user/<int:pk>",views.get_user_payments,name="get_user_payments"),
]