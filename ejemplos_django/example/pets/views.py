import math

from guardian.shortcuts import assign_perm
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from permissions.services import APIPermissionClassFactory
from pets.models import Pet
from pets.serializers import PetSerializer


DAYS_IN_YEAR = 365


def evaluar_notify(user, obj, request):
    return user.first_name == obj.owner.name


class PetViewSet(viewsets.ModelViewSet):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    permission_classes = (
        APIPermissionClassFactory(
            name='PetPermission',
            permission_configuration={
                'base': {
                    'create': True,
                    'list': True,
                    'bulk_happy_birthday': True
                },
                'instance': {
                    'retrieve': 'pets.view_pet',
                    'destroy': False,
                    'update': True,
                    'partial_update': 'pets.change_pet',
                    'notify': evaluar_notify,
                    # 'update_permissions': 'users.add_permissions'
                    # 'archive_all_students': phase_user_belongs_to_school,
                    # 'add_clients': True,
                }
            }
        ),
    )

    def perform_create(self, serializer):
        pet = serializer.save()
        user = self.request.user
        assign_perm('pets.change_pet', user, pet)
        return Response(serializer.data)

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
