from . import views
from django.urls import path

urlpatterns = [
    path("hospitals/",views.hospital_list,name="hospital_list"),
    path("hospitals/<int:pk>",views.hospital_detail,name="hospital_detail"),
    path("users/",views.user_list,name="user_list"),
    path("users/<int:pk>",views.user_detail,name="user_detail"),
    path("authens/",views.authen_list,name="authen_list"),
    path("authens/<int:pk>",views.authen_detail,name="authen_detail"),
    path("authenimages/",views.authenimages_list,name="authenimages_list"),
    path("authenimages/<int:pk>",views.authenimages_detail,name="authenimages_detail"),
    path("user/authen/<int:pk>",views.check_authen_detail,name="check_authen_detail"),
    path("authen/check/",views.authen_check_list,name="authen_check_list"),
    path("authen/check/<int:pk>",views.authen_check_detail,name="authen_check_detail"),
    path("user/authen/check/<int:pk>",views.user_check_authen,name="user_check_authen"),
    path("payments/",views.payment_list,name="payment_list"), #post payment and get all payment
    path("payments/<int:pk>",views.payments_detail,name="payments_detail"),
    path("payments/user/<int:pk>",views.get_user_payments,name="get_user_payments"), #get all payment by userid
    path("cards/users/<int:pk>",views.get_user_card,name="get_user_card"), #get all card by userid
    path("cards/",views.card_list,name="card_list"), #post card and get all card
    path("cards/approve/",views.approve_card_list,name="approve_card_list"), #get all card approve
    path("cards/<int:pk>",views.card_detail,name="card_detail"), #delete card
    path("cards/id/<int:pk>",views.get_card_by_id,name="get_card_by_id"), #get card by id for all user
    path("donate/topic/",views.donate_topic_list,name="donate_topic_list"), #post topic and get all topic
    path("donate/accept/",views.donate_accept_list,name="donate_accept_list"), #post donate accept and get all donate accept
    path("card/<int:pk>/donate/accept/",views.get_donate_accept_by_card_id,name="get_donate_accept_by_card_id"), #get donate accept by card id for all user
    path("donar/",views.donar_list,name="donar_list"), #get all donar and post
    path("donar/<int:pk>",views.donar_detail,name="donar_list"), #delete donar 
    path("card/<int:pk>/donar/",views.get_all_donar_by_card_id,name="get_all_donar_by_card_id"), #get all donar by card id for all
    path("reports/",views.report_list,name="report_list"), #get all and post report
    path("card/<int:pk>/reports/",views.get_all_report_by_card_id,name="get_all_report_by_card_id"), #get all report by card id
    path("donate/topic/<int:pk>/payments/",views.get_approve_total_donate_by_topic_id,name="get_approve_total_donate_by_topic_id"), #get TotalDonate by topic id


    #Little
    path("payments_waiting/",views.payment_waiting_list,name="payments_waiting"),  ## get all payments with waiting status  + order form oldest
    # path("card/emergency/",views.emergency_card_list,name="card_emergency"),  ## get oldest 4 card + order form oldest

    path("payments/<int:pk>/approve/",views.approve_payment,name="approve_payment"),  ##  set status of payment to "approve_payment" by paymentcardID
    path("payments/<int:pk>/reject/",views.reject_payment,name="reject_payment"),  ##  set status of payment to "reject" by paymentcardID


]