from SCM.views import PollutionViewClass, DublinBikeViewClass, DublinBikeChartViewClass, EventViewClass
from django.test import SimpleTestCase
from django.urls import resolve, reverse


class TestUrls(SimpleTestCase):

    def test_pollution_url_is_resolved(self):
        url = reverse('SCM:PollutionViewClass')
        # print(resolve(url))
        self.assertEquals(resolve(url).func, PollutionViewClass)

    def test_dublinike_url_is_resolved(self):
        url = reverse('SCM:DublinBikeViewClass')
        self.assertEquals(resolve(url).func, DublinBikeViewClass)

    def test_biketrend_url_is_resolved(self):
        url = reverse('SCM:DublinBikeChartViewClass')
        self.assertEquals(resolve(url).func, DublinBikeChartViewClass)

    def test_event_url_is_resolved(self):
        url = reverse('SCM:EventViewClass')
        self.assertEquals(resolve(url).func, EventViewClass)
