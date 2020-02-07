from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
import requests
import json



@api_view()
def PollutionView(request):
    response = requests.get('http://erc.epa.ie/real-time-air/www/aqindex/aqih_json.php')
    return HttpResponse(json.dumps(response.json()), content_type="application/json")

def DublinBikeView(request):
    response = requests.get('https://api.jcdecaux.com/vls/v1/stations?contract=dublin&apiKey=77cf7ab00377c7f4cc621765273db0e7daf18f82')
    return HttpResponse(json.dumps(response.json()), content_type="application/json")

