from django.db import models


class Pet(models.Model):
    pet_type = models.CharField(max_length=80, null=True)
    name = models.CharField(max_length=200)
    age = models.PositiveIntegerField()
    owner = models.ForeignKey(
        'owners.Owner',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    def __str__(self):
        return 'Pet: {}'.format(self.name)
