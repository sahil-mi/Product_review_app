from .functions import get_avg_rating
from rest_framework import serializers
from .models import Product, ProductImages, ProductDescription,ProductReview
from django.db.models import Sum
from django.contrib.auth.models import User

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = ['id', 'image']  # Include fields relevant to ProductImages

class ProductDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDescription
        fields = ['id', 'description']  # Include fields relevant to ProductDescription

class ProductSerializer(serializers.ModelSerializer):
    product_images = ProductImageSerializer(many=True, source='productimages_set')  # Use related_name or reverse lookup
    descriptions = ProductDescriptionSerializer(many=True, source='productdescription_set')  # Use related_name or reverse lookup
    discount = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'
    
    def get_discount(self,instance):
        discount = (instance.original_price - instance.price) * 100 // instance.original_price
        return discount
    def get_rating(self,instance):

        return get_avg_rating(instance)

class ProductReviewSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    is_editable = serializers.SerializerMethodField()
    class Meta:
        model = ProductReview
        fields = "__all__"
    def get_username(self,instance):
        user = instance.user
        return user.username
    
    def get_is_editable(self,instance):
        return instance.user.id == self.context['request'].user.id 
        
class ProductReviewCreateSerializer(serializers.Serializer):
    product = serializers.IntegerField()
    rating = serializers.IntegerField()
    review = serializers.CharField(allow_null=True,allow_blank=True)

    def create(self, validated_data):
        # Retrieve product from validated data
        product = Product.objects.get(id=validated_data.get("product"))
        user = self.context['request'].user  # Get user from the request
        rating = validated_data.get("rating")
        review = validated_data.get("review")

        # Create and return the new ProductReview instance
        obj = ProductReview.objects.create(
            product=product,
            user=user,
            rating=rating,
            review=review,
        )
        
        average_rating =  get_avg_rating(product)
        
        return obj,average_rating

    def update(self, instance, validated_data):
        print("here=============?")
        # Update fields in the ProductReview instance
        instance.rating = validated_data.get("rating", instance.rating)
        instance.review = validated_data.get("review", instance.review)
        instance.save()
        
        average_rating =  get_avg_rating(instance.product)
        return instance,average_rating
