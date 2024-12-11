"""
URL configuration for product_review_app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt import views as jwt_views
from django.conf import settings
from django.conf.urls.static import static
from.views import CustomTokenObtainPairView, Signup

from rest_framework.routers import DefaultRouter
from product.views import *

router = DefaultRouter()
router.register(r'product',ProductViewSet,basename="product")
# router.register(r'rating-and-review',ProductReviewSet,basename="review")


urlpatterns = [
    path('admin/', admin.site.urls),
    
    
    # path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    
    path('signup/', Signup, name='Signup'),
    path('api/', include(router.urls)), 
    # path('api/rating-and-review/create/', ProductReviewAPIView.as_view(), name='review_create'),

    path('api/rating-and-review/create/', ProductReviewSet.as_view({'post': 'create'}), name='review_create'),
    path('api/rating-and-review/update/<int:pk>/', ProductReviewSet.as_view({'put': 'update'}), name='review_update'),
    path('api/rating-and-review/delete/<int:pk>/', ProductReviewSet.as_view({'delete': 'destroy'}), name='review_delete'),
    path('api/rating-and-review/', ProductReviewSet.as_view({'get': 'list'}), name='review_list'),
    
    
    ]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



