from SCM.views import (
    PollutionView,
    DublinBikeView,
    push_notify,
    EventView,
    DublinBikeChartView,
    DublinBusView,
    hello,
    back
)
from django.urls import path

import random
from timeloop import Timeloop
from datetime import timedelta


jobs = Timeloop()

app_name = "SCM"
urlpatterns = [
    path('pollution/', PollutionView, name='PollutionView'),
    path('dublinbike/', DublinBikeView, name='DublinBikeView'),
    path('notification/', push_notify),
    path('biketrend/', DublinBikeChartView, name='DublinBikeChartView'),
    path('event/', EventView, name='EventView'),
    path('dublinbus/', DublinBusView),
    path('back/',back)
]

#################################################################
# Code for Scheduler, under development --- PLEASE DO NOT CHANGE
#################################################################

@jobs.job(interval=timedelta(seconds=5))
def call():
    hello()


jobs.start(block=False)

