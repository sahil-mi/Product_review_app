from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from.serializers import *
from .models import *
from rest_framework.permissions import AllowAny,IsAuthenticated,IsAdminUser
from rest_framework.pagination import PageNumberPagination

#==========================PRODUCT=============================
class ProductPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10000


class ProductViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]
    pagination_class = ProductPagination
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    # http://localhost:8000/api/product/?page=2/
    def list(self,request):
        paginator = self.pagination_class()
        paginated_queryset = paginator.paginate_queryset(self.queryset, request)
        serializer =  self.serializer_class(paginated_queryset,many=True)
        return Response(serializer.data)
    
    #http://localhost:8000/api/product/2/
    def retrieve(self, request, pk=None):
        product = get_object_or_404(self.queryset,pk=pk)
        serializer = self.serializer_class(product)
        return Response(serializer.data)
        
        
        
        
#======================REVIEW AND RATINGS=======================
class ProductReviewPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10000
        


class ProductReviewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]
    pagination_class = ProductReviewPagination
    queryset = ProductReview.objects.all()
    serializer_class = ProductReviewSerializer

    def list(self, request, product_id=None):
        # Fetch reviews for a specific product
        product_reviews = self.queryset.filter(product__id=product_id)
        paginator = self.pagination_class()
        paginated_queryset = paginator.paginate_queryset(product_reviews, request)
        serializer = self.serializer_class(paginated_queryset, many=True)
        
        # Return paginated response
        return paginator.get_paginated_response(serializer.data)

    def retrieve(self, request, pk=None):
        # Retrieve a single review by its primary key
        review = get_object_or_404(self.queryset, pk=pk)
        serializer = self.serializer_class(review)
        return Response(serializer.data)
    
    def create(self, request):
        # Initialize serializer with request data
        serializer = ProductReviewCreateSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            review = serializer.save()
            return Response({"message": "Review created successfully!", "data": ProductReviewSerializer(review).data}, status=201)
        return Response(serializer.errors, status=400)

    def update(self, request, pk=None):
        # Retrieve the review to be updated
        review = get_object_or_404(self.queryset, pk=pk)
        serializer = ProductReviewCreateSerializer(review, data=request.data, context={'request': request}, partial=True)
        if serializer.is_valid():
            updated_review = serializer.save()
            return Response({"message": "Review updated successfully!", "data": ProductReviewSerializer(updated_review).data}, status=200)
        return Response(serializer.errors, status=400)
