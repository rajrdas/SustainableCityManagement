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
    path('pollution/', PollutionView),
    path('dublinbike/', DublinBikeView),
    path('notification/', push_notify),
    path('biketrend/', DublinBikeChartView),
    path('event/', EventView),
    path('dublinbus/', DublinBusView)
]
