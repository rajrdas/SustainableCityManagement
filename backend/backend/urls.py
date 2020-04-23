from django.urls import include, path

urlpatterns = [
    path('SCM/', include('SCM.urls')),
    path('api/auth/', include('accounts.api.urls')),
]
