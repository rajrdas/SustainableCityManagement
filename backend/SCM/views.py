import json

import requests
from django.http import HttpResponse
from rest_framework.decorators import api_view
from django.core.cache import cache
from datetime import datetime


@api_view()
def PollutionView(request):
    try:
        response = cache.get("pol")
    except Exception as e:
        raise Exception("An exception occurred")
    return HttpResponse(json.dumps(response.json()), content_type="application/json")


@api_view()
def DublinBikeView(request):
    try:
        response = cache.get("bike")
    except:
        raise Exception("An exception occurred")

    return HttpResponse(json.dumps(response.json()), content_type="application/json")


@api_view()
def EventView(request):
    try:
        response = cache.get("event")
    except:
        raise Exception("An exception occurred")

    return HttpResponse(json.dumps(response.json()), content_type="application/json")


@api_view()
def DublinBikeChartView(request):
    try:
        response = cache.get("bike")
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
    response = cache.get("bus")
    return HttpResponse(json.dumps(response.json()), content_type="application/json")


#################################################################
# Code for Scheduler, under development --- PLEASE DO NOT CHANGE
#################################################################
def getAPIdata():
    print("[%s] Getting API data" %datetime.now())
    try:  # Get pollution
        pol = requests.get('http://erc.epa.ie/real-time-air/www/aqindex/aqih_json.php')
        cache.set("pol", pol)
    except Exception as e:
        pass

    try:  # Get bike
        bike = requests.get('https://api.jcdecaux.com/vls/v1/stations?contract=dublin&apiKey'
                            '=77cf7ab00377c7f4cc621765273db0e7daf18f82')
        cache.set("bike", bike)
    except Exception as e:
        pass

    try:  # Get events
        event = requests.get(
            'https://app.ticketmaster.com/discovery/v2/events.json?city=Dublin&apikey=u2MCIW0dPwxqAZMCssL2PrGWWfdkGedj')
        cache.set("event", event)
    except Exception as e:
        pass

    try:  # Get bus
        bus = requests.get('https://data.smartdublin.ie/cgi-bin/rtpi/busstopinformation')
        cache.set("bus", bus)
    except Exception as e:
        pass

