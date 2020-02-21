from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
import requests
import json


@api_view()
def PollutionView(request):
    response = requests.get('http://erc.epa.ie/real-time-air/www/aqindex/aqih_json.php')
    return HttpResponse(json.dumps(response.json()),content_type="application/json")

def DublinBikeView(request):
    response = requests.get('https://api.jcdecaux.com/vls/v1/stations?contract=dublin&apiKey=77cf7ab00377c7f4cc621765273db0e7daf18f82')
    return HttpResponse(json.dumps(response.json()), content_type="application/json")

    try:
     response = requests.get(' https://api.jcdecaux.com/vls/v1/stations?contract=dublin&apiKey=77cf7ab00377c7f4cc621765273db0e7daf18f82')
    except:
        raise Exception("An exception occurred")
    
    return HttpResponse(json.dumps(response.json()),content_type="application/json")
@api_view()
def EventView(request):
    response = requests.get('https://app.ticketmaster.com/discovery/v2/events.json?city=Dublin&apikey=u2MCIW0dPwxqAZMCssL2PrGWWfdkGedj')
    return HttpResponse(json.dumps(response.json()), content_type="application/json")

@api_view()
def DublinBikeChartView(request):
    response = requests.get('https://api.jcdecaux.com/vls/v1/stations?contract=dublin&apiKey=77cf7ab00377c7f4cc621765273db0e7daf18f82')
    response = response.json()
    data = []
    for x in range(len(response)):
        Data = {}
        Data['label'] = response[x]['name']
        Data['value'] = str(response[x]['available_bikes'])
        data.append(Data)
    return HttpResponse(json.dumps(data), content_type="application/json")
  
def push_notify(request):
  from pusher_push_notifications import PushNotifications
  print("Push notify called!")
  beams_client = PushNotifications(
      instance_id='422713b7-8870-499a-8534-5553787dc86c',
       secret_key='6DACD3113B8FF98826AB73E91EB1BF4EADC216BBB8567B562A065F4BD1E71C60',
  )
  print([request.POST.get("interest", "null")])
  response = beams_client.publish_to_interests(
  interests=list([request.POST.get("interest", "null")]),
  # interests=['hello'],
  publish_body={
      'apns': {
          'aps': {
              'alert': 'Notification form Dashboard!'
          }
      },
      'fcm': {
          'notification': {
              'title': str(request.POST.get("username","not found")),
              'body': str("Alert: " + request.POST.get("age", "null") + " years old.")
          }
      }
  }
  )
  return HttpResponse("Pass!")

