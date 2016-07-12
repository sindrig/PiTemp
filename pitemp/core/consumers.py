from channels import Group
from django.conf import settings


# Connected to websocket.connect
def ws_add(message):
    Group(settings.TEMP_GROUP_NAME).add(message.reply_channel)
    print('Added {} to {}'.format(message, settings.TEMP_GROUP_NAME))


# Connected to websocket.disconnect
def ws_disconnect(message):
    Group(settings.TEMP_GROUP_NAME).discard(message.reply_channel)
