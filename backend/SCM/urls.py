from SCM.views import   (
                            PollutionView,
                            DublinBikeView,
                            DublinBikeChartView,
                            EventView
                        )
from django.urls import path

app_name = "SCM"
urlpatterns = [
    path('pollution/', PollutionView , name='PollutionView'),
    path('dublinbike/', DublinBikeView, name='DublinBikeView'),
    path('biketrend/', DublinBikeChartView, name='DublinBikeChartView'),
    path('event/', EventView, name='EventView'),
]
