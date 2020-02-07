from SCM.views import   (
                            PollutionView,
                            DublinBikeView
                        )
from django.urls import path

app_name = "SCM"
urlpatterns = [
    path('pollution/', PollutionView),
    path('dublinbike/', DublinBikeView),
]