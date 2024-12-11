from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from.serializers import *
from .models import *
from rest_framework.permissions import AllowAny,IsAuthenticated,IsAdminUser
from rest_framework.pagination import PageNumberPagination
from django.views.decorators.csrf import csrf_exempt





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

    #http://localhost:8000/api/rating-and-review/?product_id=2/
    def list(self, request):
        product_id = request.query_params.get('product_id')

        # product_reviews =  self.queryset.filter(product__id=product_id) 
        # Filter reviews by the user first
        user_reviews = list(self.queryset.filter(product__id=product_id, user=request.user))

        # Fetch all other reviews for the product
        other_reviews = list(self.queryset.filter(product__id=product_id).exclude(user=request.user))

        # Combine the lists with user reviews at the beginning
        product_reviews = user_reviews + other_reviews

        paginator = self.pagination_class()
        paginated_queryset = paginator.paginate_queryset(product_reviews, request)
        serializer = self.serializer_class(paginated_queryset, many=True,context={'request': request})
        
        
        is_reviewed  = False
        if user_reviews:
            is_reviewed = True
            
        paginated_response = paginator.get_paginated_response(serializer.data)
        paginated_response.data["is_reviewed"] = is_reviewed

        return paginated_response


    #http://localhost:8000/api/rating-and-review/2/
    def retrieve(self, request, pk=None):
        # Retrieve a single review by its primary key
        review = get_object_or_404(self.queryset, pk=pk)
        serializer = self.serializer_class(review)
        return Response(serializer.data)
    
    # @csrf_exempt
    def create(self, request):
        print("helloo")
        # Initialize serializer with request data
        serializer = ProductReviewCreateSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            review, average_rating = serializer.save()
            return Response({"message": "Review created successfully!","data": ProductReviewSerializer(review,context={'request': request}).data,"rating":average_rating}, status=201)
        return Response(serializer.errors, status=400)

    def update(self, request, pk=None):
        # Retrieve the review to be updated
        review = get_object_or_404(self.queryset, pk=pk)
        serializer = ProductReviewCreateSerializer(review, data=request.data, context={'request': request}, partial=True)
        if serializer.is_valid():
            updated_review,average_rating = serializer.save()
            return Response({"message": "Review updated successfully!", "data": ProductReviewSerializer(updated_review,context={'request': request}).data,"rating":average_rating}, status=200)
        return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        review = get_object_or_404(self.queryset, pk=pk)
        review.delete()
        average_rating =  get_avg_rating(review.product)
        return Response({"message": "Review deleted successfully!","rating":average_rating}, status=200)
        
        





# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import AllowAny
# from rest_framework.decorators import api_view, action
# from rest_framework import status
# from django.shortcuts import get_object_or_404
# from .models import ProductReview
# from .serializers import ProductReviewSerializer, ProductReviewCreateSerializer
# # from .pagination import ProductReviewPagination
# class ProductReviewAPIView(APIView):
    permission_classes = [AllowAny]
    pagination_class = ProductReviewPagination
    serializer_class = ProductReviewSerializer

    def get(self, request, product_id=None):
        if product_id:
            # Fetch reviews for a specific product
            product_reviews = ProductReview.objects.filter(product__id=product_id)
            paginator = self.pagination_class()
            paginated_queryset = paginator.paginate_queryset(product_reviews, request)
            serializer = self.serializer_class(paginated_queryset, many=True)
            
            # Return paginated response
            return paginator.get_paginated_response(serializer.data)
        else:
            # Fetch all reviews
            product_reviews = ProductReview.objects.all()
            paginator = self.pagination_class()
            paginated_queryset = paginator.paginate_queryset(product_reviews, request)
            serializer = self.serializer_class(paginated_queryset, many=True)
            
            # Return paginated response
            return paginator.get_paginated_response(serializer.data)

    def get_object(self, pk):
        return get_object_or_404(ProductReview, pk=pk)

    def retrieve(self, request, pk):
        # Retrieve a single review by its primary key
        review = self.get_object(pk)
        serializer = self.serializer_class(review)
        return Response(serializer.data)

    def post(self, request):
        # Create a new review
        user = request.user
        serializer = ProductReviewCreateSerializer(data=request.data, context={'request': request,"user":user})
        if serializer.is_valid():
            review = serializer.save()
            return Response({"message": "Review created successfully!", "data": ProductReviewSerializer(review).data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        # Update an existing review
        review = self.get_object(pk)
        serializer = ProductReviewCreateSerializer(review, data=request.data, context={'request': request}, partial=True)
        if serializer.is_valid():
            updated_review = serializer.save()
            return Response({"message": "Review updated successfully!", "data": ProductReviewSerializer(updated_review).data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)