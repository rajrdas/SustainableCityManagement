from SCM.views import (
    push_notify,
    getAPIdata,
    PollutionViewClass,
    DublinBikeViewClass,
    EventViewClass,
    DublinBikeChartViewClass,
    DublinBusViewClass
)
from datetime import timedelta
from django.urls import path
from timeloop import Timeloop

jobs = Timeloop()

app_name = "SCM"
urlpatterns = [
    path('pollution/', PollutionViewClass.as_view()),
    path('dublinbike/', DublinBikeViewClass.as_view()),
    path('notification/', push_notify),
    path('biketrend/', DublinBikeChartViewClass.as_view()),
    path('event/', EventViewClass.as_view()),
    path('dublinbus/', DublinBusViewClass.as_view()),
]

getAPIdata()  # Initial call to set cache


@jobs.job(interval=timedelta(minutes=5))
def call():
    getAPIdata()


jobs.start(block=False)
