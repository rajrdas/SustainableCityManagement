from SCM.views import   (
                            PollutionView,
                            DublinBikeView,
                            dubbike
                        )
from django.urls import path

app_name = "SCM"
urlpatterns = [
    path('pollution/', PollutionView),
    path('dublinbike/', DublinBikeView),
    path('dubbike/', dubbike),
]