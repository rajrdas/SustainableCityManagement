from SCM.views import   (
                            PollutionView,
                            DublinBikeView,
                            DublinBikeChartView,
                            EventView
                        )
from django.urls import path

app_name = "SCM"
urlpatterns = [
    path('pollution/', PollutionView),
    path('dublinbike/', DublinBikeView),
    path('biketrend/', DublinBikeChartView),
    path('event/', EventView),
]
