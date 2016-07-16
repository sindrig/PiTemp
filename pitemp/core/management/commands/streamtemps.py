import random

from django.core.management.base import BaseCommand
from temp.temp import ACTIONS, read_temp


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('-d', action='store_true', default=False)

    def handle(self, *args, **options):
        temperature_function = read_temp
        if options['d']:
            def temperature_function():
                return random.random() * 100
        ACTIONS['stream_group'](temperature_function)
