from django.contrib import admin
from .models import AdminInfo, Product, WebsiteImages

admin.site.register(AdminInfo)
admin.site.register(Product)
admin.site.register(WebsiteImages)
