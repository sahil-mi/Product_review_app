from django.db import models
from django.contrib.auth.models import User
# Create your models here.


# ============================PRODUCT==================================

class Product(models.Model):
    title = models.CharField(max_length=150)
    price = models.DecimalField(default=0, max_digits=8, decimal_places=2)
    original_price = models.DecimalField(
        default=0, max_digits=8, decimal_places=2)

    def __str__(self):
        return str(self.title)


class ProductImages(models.Model):
    def product_image_path(instance, filename):
        return f"product_images/{instance.product.title}/{filename}"

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=product_image_path)

    def __str__(self):
        return f"{self.product.title}"


class ProductDescription(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    description = models.TextField()


# ========================REVIEW AND RATINGS=============================


class ProductReview(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField()
    review = models.TextField()

    def _str__(self):
        return f"{self.product.title} {self.user.username}"

    class Meta:
        unique_together = [["product", "user"]]
