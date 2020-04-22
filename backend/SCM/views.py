import json
import logging
import requests
from datetime import datetime
from django.core.cache import cache
from django.http import HttpResponse
from rest_framework.decorators import api_view
from django.core.cache import cache
from datetime import datetime
from django.views import View

# import the logging library
import logging

# Get an instance of a logger
logger = logging.getLogger(__name__)

class PollutionViewClass(View):

    def __init__(self):
        self.__pollutionData = {}
    def get_pollutionData(self):
        return self.__pollutionData
    def set_pollutionData(self, x):
        self.__pollutionData = x

    def get(self,request):
        try:
            self.set_pollutionData(cache.get("pol"))
            return HttpResponse(json.dumps(self.get_pollutionData().json()), content_type="application/json")
        except Exception as e:
            raise Exception("An exception occurred")

class DublinBikeViewClass(View):

    def __init__(self):
        self.__dublinBikeData = {}
    def get_dublinBikeData(self):
        return self.__dublinBikeData
    def set_dublinBikeData(self, x):
        self.__dublinBikeData = x

    def get(self,request):
        try:
            self.set_dublinBikeData(cache.get("bike"))
            return HttpResponse(json.dumps(self.get_dublinBikeData().json()), content_type="application/json")
        except Exception as e:
            raise Exception("An exception occurred")

class EventViewClass(View):

    def __init__(self):
        self.__eventData = {}
    def get_eventData(self):
        return self.__eventData
    def set_eventData(self, x):
        self.__eventData = x
    def get(self,request):
        try:
            self.set_eventData(cache.get("event"))
            return HttpResponse(json.dumps(self.get_eventData().json()), content_type="application/json")
        except Exception as e:
            raise Exception("An exception occurred")

class DublinBikeChartViewClass(View):

    def __init__(self):
        self.__dublinBikeChartData = {}
    def get_dublinBikeChartData(self):
        return self.__dublinBikeChartData
    def set_dublinBikeChartData(self, x):
        self.__dublinBikeChartData = x

    def get(self,request):
        try:
            self.set_dublinBikeChartData(cache.get("bike"))
            response = self.get_dublinBikeChartData().json()
            data = []
            for x in range(len(response)):
                Data = {}
                Data['label'] = response[x]['name']
                Data['value'] = str(response[x]['available_bikes'])
                data.append(Data)
            return HttpResponse(json.dumps(data), content_type="application/json")
        except Exception as e:
            raise Exception("An exception occurred")


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

class DublinBusViewClass(View):

    def __init__(self):
        self.__dublinBusData = {}
    def get_dublinBusData(self):
        return self.__dublinBusData
    def set_dublinBusData(self, x):
        self.__dublinBusData = x   

    def get(self,request):
        try:
            self.set_dublinBusData(cache.get("bus"))
            return HttpResponse(json.dumps(self.get_dublinBusData().json()), content_type="application/json")
        except Exception as e:
            raise Exception("An exception occurred")



#################################################################
# Code for Scheduler --- PLEASE DO NOT CHANGE
#################################################################
def getAPIdata():
    print("[%s] Getting API data" %datetime.now())
    logger.error("Getting API data")

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

def getBikeInfo():
    pass