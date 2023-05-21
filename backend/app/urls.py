from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("custom/admin/", views.admin, name="admin"),
    path("product/delete/<int:id>/", views.delete, name="delete"),
    # Forms urls
    path(
        "custom/admin/info/update/<int:id>/",
        views.adminupdate,
        name="admin-info-update",
    ),
    path("custom/admin/product/add/", views.productAdd, name="product-add"),
    path(
        "custom/admin/image/add/<int:id>/",
        views.WebsiteImagesUpdate,
        name="website-image-add",
    ),
    path("product/update/<int:id>/", views.productUpdateView, name="product-update"),
]
