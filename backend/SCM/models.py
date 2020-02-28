from django.db import models

class BikeTrend(models.Model):
    total_bikes = models.IntegerField()
    available_bikes = models.IntegerField()
    timestamp = models.DateTimeField()


class PollutionTrend(models.Model):
    pollution_level = models.IntegerField()
    timestamp = models.DateTimeField()

