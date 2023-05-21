from django.shortcuts import render, get_object_or_404, redirect
from .models import AdminInfo, Product, WebsiteImages
from .forms import (
    AdminInfoUpdateForm,
    ProductForm,
    WebsiteImageUpdateForm,
)


def home(request):
    infos = AdminInfo.objects.order_by("-id")[0]
    products = Product.objects.all()
    bg = WebsiteImages.objects.get(title="background")
    about = WebsiteImages.objects.get(title="about")
    header_img = WebsiteImages.objects.get(title="header")
    context = {
        "info": infos,
        "products": products,
        "bg": bg,
        "about": about,
        "header": header_img,
    }
    return render(request, "app/home.html", context)


def admin(request):
    products = Product.objects.all()
    infos = AdminInfo.objects.order_by("-id")[0]
    bg = WebsiteImages.objects.get(title="background")
    web_images = WebsiteImages.objects.all()
    context = {
        "products": products,
        "info": infos,
        "web_images": web_images,
        "admin_update_form": AdminInfoUpdateForm(instance=infos),
        "product_form": ProductForm(),
        "website_image_form": WebsiteImageUpdateForm(),
        "bg": bg,
    }

    return render(request, "app/admin.html", context)


def delete(request, id):
    product = get_object_or_404(Product, id=id)
    product.delete()
    return redirect("admin")


def adminupdate(request, id):
    info = get_object_or_404(AdminInfo, id=id)
    if request.method == "POST":
        form = AdminInfoUpdateForm(request.POST, instance=info)
        if form.is_valid():
            form.save()
    return redirect("admin")


def productAdd(request):
    if request.method == "POST":
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
    return redirect("admin")


def WebsiteImagesUpdate(request, id):
    websiteImage = get_object_or_404(WebsiteImages, id=id)
    if request.method == "POST":
        form = WebsiteImageUpdateForm(request.POST, instance=websiteImage)
        if form.is_valid():
            form.save()
    return redirect("admin")


def productUpdateView(request, id):
    product = get_object_or_404(Product, id=id)
    if request.method == "POST":
        form = ProductForm(request.POST, request.FILES, instance=product)
        if form.is_valid():
            form.save()
            return redirect("admin")
    else:
        form = ProductForm(instance=product)
    return render(
        request, "app/product_update.html", {"form": form, "product": product}
    )
