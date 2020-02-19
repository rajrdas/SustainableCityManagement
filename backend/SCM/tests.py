from django.test import TestCase
from SCM.views import DublinBikeView
import requests

# Create your tests here.
import unittest

#class   SCMAPITestCase(APITestCase):

class TestDublinBikeMethods(unittest.TestCase):
    def TestDublinBikeApiCodeCheck(self):
        response = DublinBikeView()
        assert response.status_code == 200

    def DublinBikeResponseCheck(self):
        response = DublinBikeView()
        self.assertGreater(len(response), 0)

    def test(self):
        with self.assertRaises(Exception) as context:
            DublinBikeView()
        self.assertTrue("An exception occurred" in context.exception)

    # if it is json
    # exception check
    # response body element
    # multiple check / long lat


if __name__ == '__main__':
    unittest.main()

#from django.test import TestCase
#from SCM.views import DublinBikeView


#class DublinBikeTestCase(TestCase):
#  def TestDublinBikeApiCodeCheck(self):
#        response = DublinBikeView()
#        assert response.status_code == 200

