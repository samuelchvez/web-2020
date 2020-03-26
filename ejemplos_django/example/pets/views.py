import math

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from pets.models import Pet
from pets.serializers import PetSerializer


DAYS_IN_YEAR = 365

class PetViewSet(viewsets.ModelViewSet):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer

    @action(detail=True, methods=['post'])
    def notify(self, request, pk=None):
        pet = self.get_object()

        # TODO: conectarme a FCM y mandar la push
        print(pet.owner.name)

        return Response({
            'status': 'ok'
        })

    @action(detail=True, url_path='happy-bday', methods=['post'])
    def happy_birthday(self, request, pk=None):
        pet = self.get_object()
        self.increment_age(pet)
        return Response(PetSerializer(pet).data)

    @action(detail=True, url_path='update-age', methods=['patch'])
    def update_age(self, request, pk=None):
        pet = self.get_object()

        age_in_days = float(request.data.get('age_in_days'))
        age_in_years = math.floor(age_in_days / DAYS_IN_YEAR)
        pet.age = age_in_years
        pet.save()

        return Response(PetSerializer(pet).data)

    @action(detail=False, url_path='happy-bday', methods=['post'])
    def bulk_happy_birthday(self, request):
        for pet in Pet.objects.all():
            # TODO: send push
            self.increment_age(pet)

        return Response({})

    def increment_age(self, pet):
        pet.age += 1
        pet.save()
        print ("Happy birthday {}!".format(pet.name))
