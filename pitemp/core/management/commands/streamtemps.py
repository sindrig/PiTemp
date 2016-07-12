from django.core.management.base import BaseCommand

from channels import Group
from django.conf import settings
from temp.temp import read_stream


class Command(BaseCommand):

    def handle(self, *args, **options):
        t = Group(settings.TEMP_GROUP_NAME)
        for message in read_stream():
            t.send({'text': message})
            print('sent {} to {}'.format(message, settings.TEMP_GROUP_NAME))
