from django.conf.urls import include, url
from y_player import views

urlpatterns = [
    url(r'$', views.home, name='home'),
]