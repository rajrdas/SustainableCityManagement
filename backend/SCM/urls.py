from SCM.views import (
    PollutionView,
    DublinBikeView,
    push_notify,
    EventView,
    DublinBikeChartView,
    DublinBusView,
    getAPIdata
)
from django.urls import path
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
]

getAPIdata()  # Initial call to set cache


@jobs.job(interval=timedelta(minutes=2))
def call():
    getAPIdata()


jobs.start(block=False)
