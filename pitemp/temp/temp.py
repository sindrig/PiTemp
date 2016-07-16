import os
import glob
import time
import socket
import argparse
import random
import json
import datetime

try:
    from settings import UDP_ADDRESS, DATE_FORMAT
except ImportError:
    from .settings import UDP_ADDRESS, DATE_FORMAT

UDP_IP, UDP_PORT = UDP_ADDRESS


def prepare(fun, time_to_sleep=1):
    def inner(temperature_function):
        os.system('modprobe w1-gpio')
        os.system('modprobe w1-therm')
        while True:
            fun(temperature_function())
            time.sleep(time_to_sleep)
    hasattr(fun, 'prepare') and fun.prepare()
    return inner


def read_temp_raw():
    base_dir = '/sys/bus/w1/devices/'
    device_folder = glob.glob(base_dir + '28*')[0]
    device_file = device_folder + '/w1_slave'
    f = open(device_file, 'r')
    lines = f.readlines()
    f.close()
    return lines


def read_temp():
    lines = read_temp_raw()
    while lines[0].strip()[-3:] != 'YES':
        time.sleep(0.2)
        lines = read_temp_raw()
    equals_pos = lines[1].find('t=')
    if equals_pos != -1:
        temp_string = lines[1][equals_pos + 2:]
        temp_c = float(temp_string) / 1000.0
        return temp_c


class Streamer(object):
    def __init__(self, ip, port):
        self.ip = ip
        self.port = port

    def prepare(self):
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    def format(self, temperature):
        return json.dumps({
            'temperature': temperature,
            'time': datetime.datetime.now().strftime(DATE_FORMAT)
        })

    def __call__(self, temperature):
        self.socket.sendto(
            self.format(temperature).encode('utf8'),
            (self.ip, self.port)
        )


class GroupStreamer(Streamer):
    def __init__(self):
        pass

    def prepare(self):
        from django.conf import settings
        from channels import Group
        self.group = Group(settings.TEMP_GROUP_NAME)

    def __call__(self, temperature):
        self.group.send({'text': self.format(temperature)})


def read_stream(temperature_function=read_temp):
    import socket

    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.bind((UDP_IP, UDP_PORT))

    while True:
        data, addr = sock.recvfrom(1024)
        yield data.decode('utf8')


def print_stream(temperature_function=read_temp):
    for data in read_stream(temperature_function):
        print(data, end="\r")

ACTIONS = {
    'print': prepare(lambda temp: print(temp)),
    'stream': prepare(Streamer(UDP_IP, UDP_PORT)),
    'stream_group': prepare(GroupStreamer()),
    'read_stream': read_stream,
    'print_stream': print_stream,
}

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Get temperatures')
    parser.add_argument('action', choices=ACTIONS)
    parser.add_argument('-d', action='store_true', default=False, help='debug')
    args = parser.parse_args()
    temperature_function = read_temp
    if args.d:
        # DEBUG
        def temperature_function():
            return random.random() * 100
    ACTIONS[args.action](temperature_function)
