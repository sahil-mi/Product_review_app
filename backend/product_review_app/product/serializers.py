from rest_framework import serializers
from .models import Product, ProductImages, ProductDescription,ProductReview

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

    class Meta:
        model = Product
        fields = '__all__'


class ProductReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductReview
        fields = "__all__"
        
class ProductReviewCreateSerializer(serializers.Serializer):
    product = serializers.IntegerField()
    rating = serializers.IntegerField()
    review = serializers.CharField()

    def create(self, validated_data):
        # Retrieve product from validated data
        product = Product.objects.get(id=validated_data.get("product"))
        user = self.context['request'].user  # Get user from the request
        rating = validated_data.get("rating")
        review = validated_data.get("review")

        # Create and return the new ProductReview instance
        return ProductReview.objects.create(
            product=product,
            user=user,
            rating=rating,
            review=review,
        )

    def update(self, instance, validated_data):
        # Update fields in the ProductReview instance
        instance.rating = validated_data.get("rating", instance.rating)
        instance.review = validated_data.get("review", instance.review)
        instance.save()
        return instance
