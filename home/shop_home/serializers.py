from rest_framework import serializers
from .models import Product, List, ListItem

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "name", "slug", "image", "description", "category", "price"]
        

class DetailedProductSerializer(serializers.ModelSerializer):
    similar_products = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ["id", "name", "price", "slug", "image", "description", "similar_products"]

    def get_similar_products(self, product):
        products = Product.objects.filter(category=product.category).exclude(id=product.id)
        serializer = ProductSerializer(products, many=True)
        return serializer.data

class ListItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only = True)
    class Meta:
        model = ListItem
        fields = ["id", "quantity", "product"] 

class ListSerializer(serializers.ModelSerializer):
    items = ListItemSerializer(read_only=True, many=True)
    sum_total = serializers.SerializerMethodField()
    num_of_items = serializers.SerializerMethodField()
    class Meta:
        model = List 
        fields = ["id", "list_code", "items", "sum_total", "num_of_items", "created_at", "modified_at"]
    
    def get_sum_total(self, list):
        items = list.items.all()
        total = sum([item.product.price * item.quantity for item in items ])
        return total

    def get_num_of_items(self, list):
        items = list.items.all()
        total = sum([item.quantity for item in items])
        return total

class SimpleListSerializer(serializers.ModelSerializer):
    num_of_items = serializers.SerializerMethodField()
    class Meta:
        model = List
        fields = ["id", "list_code", "num_of_items"]

    def get_num_of_items(self, list):
        num_of_items = sum([item.quantity for item in list.items.all()])
        return num_of_items



        