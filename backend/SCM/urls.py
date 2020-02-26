from SCM.views import   (
                            PollutionView,
                            DublinBikeView,
                            push_notify,
                            EventView,
                            DublinBikeChartView,
                            EventView,
                            DublinBusView
                        )
from django.urls import path

app_name = "SCM"
urlpatterns = [
    path('pollution/', PollutionView , name='PollutionView'),
    path('dublinbike/', DublinBikeView, name='DublinBikeView'),
    path('notification/', push_notify),
    path('biketrend/', DublinBikeChartView, name='DublinBikeChartView'),
    path('event/', EventView, name='EventView'),
    path('dublinbus/', DublinBusView)
]
