import random

from django.core.management.base import BaseCommand
from temp.temp import ACTIONS, read_temp, debug_temperature_function


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('-d', action='store_true', default=False)

    def handle(self, *args, **options):
        temperature_function = read_temp
        if options['d']:
            temperature_function = debug_temperature_function
        ACTIONS['stream_group'](temperature_function)
