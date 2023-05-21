from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


# Create your models here.


class AdminInfo(models.Model):
    logo = models.ImageField(upload_to="logo", blank=True)
    address = models.CharField(max_length=300)
    phonenumber = models.CharField(max_length=10)
    email = models.EmailField()
    about = models.TextField()
    header = models.CharField(max_length=300)
    secondary_header = models.TextField()
    Linkedin = models.CharField(max_length=300, blank=True, null=True)
    Facebook = models.CharField(max_length=300, blank=True, null=True)
    Instagram = models.CharField(max_length=300, blank=True, null=True)


class Product(models.Model):
    image = models.ImageField(upload_to="card-images")
    title = models.CharField(max_length=200)
    info = models.CharField(max_length=300)

    def __str__(self):
        return self.title


class WebsiteImages(models.Model):
    title = models.CharField(max_length=200)
    image = models.FileField(upload_to="website-images")

    def __str__(self):
        return self.title
