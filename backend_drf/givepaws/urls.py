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
    path("authen/check/",views.authen_check_list,name="authen_check_list"), #get authen comment
    path("authen/check/<int:pk>",views.authen_check_detail,name="authen_check_detail"),
    path("user/authen/check/<int:pk>",views.user_check_authen,name="user_check_authen"),
    path("payments/",views.payment_list,name="payment_list"), #post payment and get all payment
    path("payments/<int:pk>",views.payments_detail,name="payments_detail"),
    path("payments/user/<int:pk>",views.get_user_payments,name="get_user_payments"), #get all payment by userid
    path("cards/users/<int:pk>",views.get_user_card,name="get_user_card"), #get all card by userid
    path("cards/",views.card_list,name="card_list"), #post card and get all card
    path("cards/approve/",views.approve_card_list,name="approve_card_list"), #get all approve card 
    path("cards/complete/",views.complete_card_list,name="approve_card_list"), #get all complete card 
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
    path("card/<int:pk>/close",views.close_card_by_id,name="close_card_by_id"), #close card by id
    path("card/<int:pk>/topics/close",views.close_topics_by_card_id,name="close_topics_by_card_id"), #close all donate topic by card id
    path("authen/requests",views.authen_request_list,name="authen_request_list"), #show auth in admin page
    path("topic/<int:pk>/update/slip",views.update_slipimg_donateTopic,name="update_slipimg_donateTopic"), #close all donate topic by card id
    path("users/list",views.user_list_member,name="user_list_member"), #post get user



    #Little
    path("cards/waiting/",views.waiting_card_list,name="waiting_card_list"), #get all waiting card 
    path("cards/reject/",views.reject_card_list,name="reject_card_list"), #get all waiting card 

    path("payments_waiting/",views.payments_waiting,name="payments_waiting"),  ## get all payments with waiting status  + order form oldest
    path("card/emergency/",views.emergency_card_list,name="card_emergency"),  ## 4 Card that's still open order from oldest
    path("payments/<int:pk>/approve/",views.approve_payment,name="approve_payment"),  ##  set status of payment to "approve_payment" by paymentcardID
    path("payments/<int:pk>/reject/",views.reject_payment,name="reject_payment"),  ##  set status of payment to "reject" by paymentcardID
    path("card/refresh/status/",views.card_refresh_status,name="card_refresh_status"),  ##  set status of card that is out dated to "complete" (Also DonateTopic)  #
    path("donate/topic/complete/list/",views.complete_donatetopic_list,name="complete_donatetopic_list"),  ##  complete_donatetopic_list

    path("card/quotation/complete/treatment_cost/no_slip/",views.card_quotation_complete_treatment_cost,name="card_quotation_complete_treatment_cost"),  ### แสดง ListCard ที่เป็นใบเสนอราคา  ยอดรักษาครบ  แต่ยังไม่โอนเงิน(ลงสลีป)
    path("card/report/order_count/list/",views.get_cards_by_report_count,name="get_cards_by_report_count"),  ## แสดง Cards ที่มี Report โดยเรียงตามจำนวน Report (แนบจำนวน Reports ของแต่ละ Card ไปไว้ด้วย)
    path("card/<int:pk>/report/count/",views.get_card_byID_with_report_count,name="get_card_byID_with_report_count"),  ## get Card report count
    # path("card/<int:pk>/hospital/donatetopic/",views.get_card_hospital_donatetopic_by_id,name="get_card_hospital_donatetopic_by_id"),  ## 
    # path("card/<int:pk>/donatetopic/",views.get_card_donatetopic_by_id,name="get_card_donatetopic_by_id"),  ## 
    path("card/<int:pk>/",views.get_card_by_cardid,name="get_card_by_cardid"),  ## 



]