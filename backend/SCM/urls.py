from SCM.views import   (
                            PollutionView,
                            DublinBikeView,
                            push_notify,
<<<<<<< HEAD
=======
                            EventView,
                            DublinBikeChartView,
                            EventView,
                            DublinBusView
>>>>>>> 696f87234febfc45fc5e74f594c5f9b6a2f6e571
                        )
from django.urls import path

app_name = "SCM"
urlpatterns = [
<<<<<<< HEAD
    path('pollution/', PollutionView),
    path('dublinbike/', DublinBikeView),
    path('notification/', push_notify),

]
=======
    path('pollution/', PollutionView , name='PollutionView'),
    path('dublinbike/', DublinBikeView, name='DublinBikeView'),
    path('notification/', push_notify),
    path('biketrend/', DublinBikeChartView, name='DublinBikeChartView'),
    path('event/', EventView, name='EventView'),
    path('dublinbus/', DublinBusView)
]
>>>>>>> 696f87234febfc45fc5e74f594c5f9b6a2f6e571
