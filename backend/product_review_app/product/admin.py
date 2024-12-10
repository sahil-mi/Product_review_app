from django.contrib import admin

# Register your models here.
from .models import *

# admin.site.register(Product)
# admin.site.register(ProductImages)
# admin.site.register(ProductDescription)
# admin.site.register(ProductReview)
# 

class ProductDescriptionSection(admin.TabularInline):
    model = ProductDescription
    extra = 1

class ProductImagesSection(admin.TabularInline):
    model = ProductImages
    extra = 1

class ProductAdmin(admin.ModelAdmin):
    list_display = ("title","price","original_price")
    inlines = [ProductImagesSection,ProductDescriptionSection]
    
admin.site.register(Product,ProductAdmin)
admin.site.register(ProductReview)