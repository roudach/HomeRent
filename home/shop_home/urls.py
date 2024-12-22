from django.urls import path
from . import views

urlpatterns = [
    path("products", views.products, name="products"),
    path("product_detail/<slug:slug>", views.product_detail, name="product_detail"),
    path("add_item/", views.add_item, name="add_item"),
    path("product_in_list", views.product_in_list, name="product_in_list"),
    path("get_list_stat", views.get_list_stat, name="get_list_stat"),
    path("get_list", views.get_list, name="get_list"),
    path("delete_listitem", views.delete_listitem, name="delete_listitem"),
    path('chatbot/', views.chatbot_api, name='chatbot_api'),
    path("submit_form", views.submit_form, name='submit_form')
]

#fetching all_products: http://127.0.0.1:8001/products/ 