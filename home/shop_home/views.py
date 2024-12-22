from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Product, List, ListItem
from .serializers import DetailedProductSerializer, ListItemSerializer, ListSerializer, ProductSerializer, SimpleListSerializer
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
import requests
from django.http import JsonResponse
from .models import Contact
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.

@api_view(["GET"])
def products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many = True)
    return Response(serializer.data)

@api_view(["GET"])
def product_detail(request, slug):
    product = Product.objects.get(slug=slug)
    serializer = DetailedProductSerializer(product)
    return Response(serializer.data)

@api_view(["POST"])
def add_item(request):
    try:
        list_code = request.data.get("list_code")
        product_id = request.data.get("product_id")

        list, created = List.objects.get_or_create(list_code = list_code)
        product = Product.objects.get(id = product_id)

        listitem, created = ListItem.objects.get_or_create(list=list, product=product)
        listitem.quantity = 1
        listitem.save()

        serializer = ListItemSerializer(listitem)
        return Response({"data": serializer.data, "message": "Listitem created successfully"}, status=201)
    except Exception as e:
        return Response({"error": str(e)}, status=400)
    

@api_view(['GET'])
def product_in_list(request):
    list_code = request.query_params.get("list_code")
    product_id = request.query_params.get("product_id")

    list = List.objects.get(list_code=list_code)
    product = Product.objects.get(id=product_id)

    product_exists_in_list = ListItem.objects.filter(list=list, product=product).exists()

    return Response({'product_in_list': product_exists_in_list})

@api_view(['GET'])
def get_list_stat(request):
    list_code = request.query_params.get("list_code")
    list = List.objects.get(list_code = list_code, paid=False)
    serializer = SimpleListSerializer(list)
    return Response(serializer.data)

@api_view(['GET'])
def get_list(request):
    list_code = request.query_params.get("list_code")
    list = List.objects.get(list_code=list_code, paid = False)
    serializer = ListSerializer(list)
    return Response(serializer.data)

@api_view(['POST'])
def delete_listitem(request):
    listitem_id = request.data.get("item_id")
    listitem = ListItem.objects.get(id=listitem_id)
    listitem.delete()
    return Response({"message": "Home deleted successfully"},status=status.HTTP_204_NO_CONTENT)




def chatbot_api(request):
    if request.method == "POST":
        user_message = request.POST.get("message")
        
        # Exemple : Envoyer une requête à Dialogflow
        dialogflow_url = "https://dialogflow.googleapis.com/v2/projects/your_project_id/agent/sessions/session_id:detectIntent"
        headers = {
            "Authorization": "Bearer your_access_token",
            "Content-Type": "application/json",
        }
        payload = {
            "queryInput": {
                "text": {
                    "text": user_message,
                    "languageCode": "fr",
                }
            }
        }
        response = requests.post(dialogflow_url, json=payload, headers=headers)
        return JsonResponse(response.json())
    return JsonResponse({"error": "Invalid request"}, status=400)



@csrf_exempt
def submit_form(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        contact = Contact.objects.create(
            name=data['name'],
            email=data['email'],
            message=data['message']
        )
        return JsonResponse({'message': 'Form submitted !'})
    return JsonResponse({'status': "fail", 'message': "Invalid request method!"})