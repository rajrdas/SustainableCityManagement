from django.test import TestCase, Client
from django.urls import reverse
from SCM.views import  PollutionView,DublinBikeView,DublinBikeChartView,EventView
import json

class TestViews(TestCase):

    def setUp(self):
        self.client = Client()
        self.dublinbike_url= reverse('SCM:DublinBikeView')
        self.pollution_url= reverse('SCM:PollutionView')
        self.event_url= reverse('SCM:EventView')
        self.dublinbikechart_url=reverse('SCM:DublinBikeChartView')

    def test_DublinBike_StatusCode(self):

        response = self.client.get( self.dublinbike_url)
        self.assertEquals(response.status_code, 200)

    def test_DublinBike_ResponseCheck(self):

        response = self.client.get(self.dublinbike_url)
        self.assertGreater(len(response.content),0)

    def test_DublinBikeResponse_IsJson(self):

        response = self.client.get( self.dublinbike_url)
        if(response._headers['content-type'][1] == "application/json") :
            self.assertTrue(1)
        else :
            self.assertTrue(0)


    def test_Pollution_StatusCode(self):

        response = self.client.get(self.pollution_url)
        self.assertEquals(response.status_code, 200)

    def test_pollution_ResponseCheck(self):

        response = self.client.get(self.pollution_url)
        self.assertGreater(len(response.content),0)

    def test_PollutionResponse_IsJson(self):

        response = self.client.get( self.pollution_url)
        if(response._headers['content-type'][1] == "application/json") :
            self.assertTrue(1)
        else :
            self.assertTrue(0)

    def test_Event_StatusCode(self):

        response = self.client.get(self.event_url)
        self.assertEquals(response.status_code, 200)

    def test_Event_ResponseCheck(self):

        response = self.client.get(self.event_url)
        self.assertGreater(len(response.content),0)

    def test_EventResponse_IsJson(self):

        response = self.client.get( self.event_url)
        if(response._headers['content-type'][1] == "application/json") :
            self.assertTrue(1)
        else :
            self.assertTrue(0)

    def test_DublinBikeChart_StatusCode(self):

        response = self.client.get(self.dublinbikechart_url)
        self.assertEquals(response.status_code, 200)

    def test_DublinBikeChart_ResponseCheck(self):

        response = self.client.get(self.dublinbikechart_url)
        self.assertGreater(len(response.content),0)

    def test_DublinBikeChartResponse_IsJson(self):

        response = self.client.get( self.dublinbikechart_url)
        if(response._headers['content-type'][1] == "application/json") :
            self.assertTrue(1)
        else :
            self.assertTrue(0)
