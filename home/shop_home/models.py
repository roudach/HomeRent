from django.conf import settings
from django.db import models
from django.utils.text import slugify

# Create your models here.
class Product(models.Model):
    CATEGORY =(("s+1", "S+1"),
               ("s+2", "S+2"),
               ("s+3", "S+3"),
               ("s+4", "S+4"),
               ("s+5", "S+5"),
               )
    name = models.CharField(max_length=100)
    slug = models.SlugField(blank=True, null=True)
    image = models.ImageField(upload_to="img")
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=15, choices=CATEGORY, blank=True, null=True)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug= slugify(self.name)
            unique_slug = self.slug
            counter = 1
            if Product.objects.filter(slug = unique_slug).exists():
                unique_slug = f'{self.slug}-{counter}'
                counter += 1
            self.slug = unique_slug
        
        super().save(*args, **kwargs)

class List(models.Model): 
    list_code = models.CharField(max_length=11, unique=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
    paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    modified_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    def __str__(self):
        return self.list_code
    

class ListItem(models.Model):
    list = models.ForeignKey(List, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.product.name} in list {self.list.id}"
    










class Contact(models.Model):
    name= models.CharField(max_length=100)
    email= models.EmailField(max_length=100)
    message = models.TextField(max_length=500)

    def __str__(self):
        return self.name