from rest_framework import serializers

from pets.models import Pet
from owners.serializers import OwnerSerializer


class PetSerializer(serializers.ModelSerializer):
    is_old = serializers.SerializerMethodField()

    class Meta:
        model = Pet
        fields = (
            'id',
            'name',
            'age',
            'owner',
            'is_old',
            'pet_type'
        )

    def get_is_old(self, obj):
        return obj.age > 100
