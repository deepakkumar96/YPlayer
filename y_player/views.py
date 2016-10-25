from django.shortcuts import render
from django.http import HttpResponse
# from django.views.decorators.clickjacking import xframe_options_exempt, xframe_options_deny


def home(request):
    return render(request, 'y_player/yplayer_home.html')

