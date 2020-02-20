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

    # def test_DublinBike_ResponseCheck(self):

    #     response = self.client.get(self.dublinbike_url)
    #     self.assertGreater(len(response),0)

    def test_Pollution_StatusCode(self):

        response = self.client.get(self.pollution_url)
        self.assertEquals(response.status_code, 200)

    def test_Event_StatusCode(self):

        response = self.client.get(self.event_url)
        self.assertEquals(response.status_code, 200)

    def test_DublinBikeChart_StatusCode(self):

        response = self.client.get(self.dublinbikechart_url)
        self.assertEquals(response.status_code, 200)
