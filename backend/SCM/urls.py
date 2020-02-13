from SCM.views import   (
                            PollutionView,
                            DublinBikeView,
                            EventView
                        )
from django.urls import path

app_name = "SCM"
urlpatterns = [
    path('pollution/', PollutionView),
    path('dublinbike/', DublinBikeView),
    path('event/', EventView),
]