from SCM.analytics import (
    get_bike_clusters,
    get_bike_predictions
)
from SCM.views import (
    push_notify,
    get_API_data,
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

get_API_data()  # Initial call to set cache


@jobs.job(interval=timedelta(minutes=5))
def call():
    get_API_data()


@jobs.job(interval=timedelta(days=1))
def analytics():
    get_bike_clusters()
    get_bike_predictions()


jobs.start(block=False)
