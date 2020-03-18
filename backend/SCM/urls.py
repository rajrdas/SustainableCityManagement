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

getAPIdata()


@jobs.job(interval=timedelta(seconds=5))
def call():
    getAPIdata()


jobs.start(block=False)

