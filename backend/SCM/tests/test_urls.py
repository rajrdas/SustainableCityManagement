from django.test import SimpleTestCase
from django.urls import resolve,reverse
from SCM.views import  PollutionView,DublinBikeView,DublinBikeChartView,EventView
import requests

class TestUrls(SimpleTestCase):

    def test_pollution_url_is_resolved(self):
      url= reverse('SCM:PollutionView')
     # print(resolve(url))
      self.assertEquals(resolve(url).func,PollutionView)
      

    def test_dublinike_url_is_resolved(self):
      url= reverse('SCM:DublinBikeView')
      self.assertEquals(resolve(url).func,DublinBikeView)

    def test_biketrend_url_is_resolved(self):
      url= reverse('SCM:DublinBikeChartView')
      self.assertEquals(resolve(url).func,DublinBikeChartView)

    def test_event_url_is_resolved(self):
      url= reverse('SCM:EventView')
      self.assertEquals(resolve(url).func,EventView)

