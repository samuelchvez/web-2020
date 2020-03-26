from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from pets.models import Pet
from pets.serializers import PetSerializer


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

        # TODO: conectarme a FCM y mandar la push
        print("FELIZ CUMPLE MANO {}!".format(pet.name))
        pet.age += 1
        pet.save()

        return Response(PetSerializer(pet).data)



'''
C reate
R ead
U pdate
D elete
'''
