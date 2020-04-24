from SCM.views import DublinBikeViewClass, PollutionViewClass, EventViewClass, DublinBikeChartViewClass
from django.test import TestCase, Client
from django.urls import reverse


class TestViews(TestCase):

    def setUp(self):
        self.client = Client()
        self.dublinbike_url = reverse('SCM:DublinBikeViewClass')
        self.pollution_url = reverse('SCM:PollutionViewClass')
        self.event_url = reverse('SCM:EventViewClass')
        self.dublinbikechart_url = reverse('SCM:DublinBikeChartViewClass')

    def test_DublinBike_StatusCode(self):

        response = self.client.get(self.dublinbike_url)
        self.assertEquals(response.status_code, 200)

    def test_DublinBike_ResponseCheck(self):

        response = self.client.get(self.dublinbike_url)
        self.assertGreater(len(response.content), 0)

    def test_DublinBikeResponse_IsJson(self):

        response = self.client.get(self.dublinbike_url)
        if (response._headers['content-type'][1] == "application/json"):
            self.assertTrue(1)
        else:
            self.assertTrue(0)

    def test_DublinBike_Exception(self):
        with self.assertRaises(Exception): DublinBikeViewClass(self.dublinbike_url)

    def test_Pollution_StatusCode(self):

        response = self.client.get(self.pollution_url)
        self.assertEquals(response.status_code, 200)

    def test_pollution_ResponseCheck(self):

        response = self.client.get(self.pollution_url)
        self.assertGreater(len(response.content), 0)

    def test_PollutionResponse_IsJson(self):

        response = self.client.get(self.pollution_url)
        if (response._headers['content-type'][1] == "application/json"):
            self.assertTrue(1)
        else:
            self.assertTrue(0)

    def test_Pollution_Exception(self):
        with self.assertRaises(Exception): PollutionViewClass(self.pollution_url)

    def test_Event_StatusCode(self):

        response = self.client.get(self.event_url)
        self.assertEquals(response.status_code, 200)

    def test_Event_ResponseCheck(self):

        response = self.client.get(self.event_url)
        self.assertGreater(len(response.content), 0)

    def test_EventResponse_IsJson(self):

        response = self.client.get(self.event_url)
        if (response._headers['content-type'][1] == "application/json"):
            self.assertTrue(1)
        else:
            self.assertTrue(0)

    def test_Event_Exception(self):
        with self.assertRaises(Exception): EventViewClass(self.event_url)

    def test_DublinBikeChart_StatusCode(self):

        response = self.client.get(self.dublinbikechart_url)
        self.assertEquals(response.status_code, 200)

    def test_DublinBikeChart_ResponseCheck(self):

        response = self.client.get(self.dublinbikechart_url)
        self.assertGreater(len(response.content), 0)

    def test_DublinBikeChartResponse_IsJson(self):

        response = self.client.get(self.dublinbikechart_url)
        if (response._headers['content-type'][1] == "application/json"):
            self.assertTrue(1)
        else:
            self.assertTrue(0)

    def test_DublinBikeChart_Exception(self):
        with self.assertRaises(Exception): DublinBikeChartViewClass(self.dublinbikechart_url)
