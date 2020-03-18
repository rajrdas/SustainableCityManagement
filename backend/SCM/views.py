import json

import requests
from django.http import HttpResponse
from rest_framework.decorators import api_view
from background_task import background
from timeloop import Timeloop
from datetime import timedelta
import random
from django.core.cache import cache

exp = ''

@api_view()
def PollutionView(request):
    try:
        response = requests.get('http://erc.epa.ie/real-time-air/www/aqindex/aqih_json.php')
    except:
        raise Exception("An exception occurred")
    return HttpResponse(json.dumps(response.json()), content_type="application/json")


@api_view()
def DublinBikeView(request):
    try:
        response = requests.get('https://api.jcdecaux.com/vls/v1/stations?contract=dublin&apiKey'
                                '=77cf7ab00377c7f4cc621765273db0e7daf18f82')
    except:
        raise Exception("An exception occurred")

    return HttpResponse(json.dumps(response.json()), content_type="application/json")


@api_view()
def EventView(request):
    try:
        response = requests.get(
            'https://app.ticketmaster.com/discovery/v2/events.json?city=Dublin&apikey=u2MCIW0dPwxqAZMCssL2PrGWWfdkGedj')
    except:
        raise Exception("An exception occurred")

    return HttpResponse(json.dumps(response.json()), content_type="application/json")


@api_view()
def DublinBikeChartView(request):
    try:
        response = requests.get(
            'https://api.jcdecaux.com/vls/v1/stations?contract=dublin&apiKey=77cf7ab00377c7f4cc621765273db0e7daf18f82')
        response = response.json()
        data = []
        for x in range(len(response)):
            Data = {}
            Data['label'] = response[x]['name']
            Data['value'] = str(response[x]['available_bikes'])
            data.append(Data)
    except:
        raise Exception("An exception occurred")
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
        # interests=['route_one'],
        publish_body={
            'apns': {
                'aps': {
                    'alert': 'Notification form Dashboard!'
                }
            },
            'fcm': {
                'notification': {
                    'title': str(request.POST.get("subject", "not found")),
                    'body': str("Message: " + request.POST.get("message", "null")),
                }
            }
        }
    )
    return HttpResponse("Pass!")


@api_view()
def DublinBusView(request):
    response = requests.get(
        'https://data.smartdublin.ie/cgi-bin/rtpi/busstopinformation')
    return HttpResponse(json.dumps(response.json()), content_type="application/json")

#################################################################
# Code for Scheduler, under development --- PLEASE DO NOT CHANGE
#################################################################
def back(request):
    response = cache.get("exp")
    c2 = cache.get("exp2")
    print (c2)
    return HttpResponse(json.dumps(response))

def hello():
    #global exp
    exp = {'name':'Raj','num':random.randint(0,10)}
    exp2 = {'desc' : 'experiment'}
    #print (exp)
    #print("Hello!")
    cache.set("exp",exp)
    cache.set("exp2",exp2)

var = {'generatedAt': '2020-03-10 01:15', 'generatedBy': 'Environmental Protection Agency',
       'licenseInformation': 'This data is OPEN DATA and is licensed under a Creative Commons Attribution 4.0 ',
       'aqihsummary': [{'aqih-region': 'Raj1', 'aqih': 'Das1'},
                       {'aqih-region': 'Raj2', 'aqih': 'Das2'},
                       {'aqih-region': 'Raj3', 'aqih': 'Das3'},
                       {'aqih-region': 'Raj4', 'aqih': 'Das4'},
                       {'aqih-region': 'Raj5', 'aqih': 'Das5'},
                       {'aqih-region': 'Raj6', 'aqih': 'Das6'}]}

#######################################################################################