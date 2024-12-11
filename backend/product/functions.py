from.models import ProductReview
from django.db.models import Sum
def get_avg_rating(instance):
    product_review_ins = ProductReview.objects.filter(product = instance)
    total_reviews = product_review_ins.count()
    sum_rating = product_review_ins.aggregate(sum_rating=Sum("rating",default=0))["sum_rating"]

    average_rating = 0
    if sum_rating > 0:
        average_rating = sum_rating / total_reviews
    return average_rating