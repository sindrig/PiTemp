#!/usr/bin/env python
import glob
import datetime
import os
import subprocess
import shutil
import sys
import time
import traceback

from tendo import singleton

import temp

TEMPFILE = '/home/pi/temps.txt'

MOUNT_PARTITION = '/dev/disk/by-label/Temps'
MOUNT_LOCATION = '/home/pi/usb'

LED_TRIGGER_FILE = '/sys/class/leds/led0/trigger'
LED_ACTIONS = {
    'working': 'heartbeat',
    'success': 'default-on',
    'default': 'mmc0'
}

WAIT_FOR_MOUNT = 2.5
WAIT_AFTER_FINISH = 10


def store_temp():
    temp.prepare()
    temperature = temp.read_temp()
    if temperature:
        with open(TEMPFILE, 'a') as f:
            f.write('%0.3f %s\n' % (
                temperature, get_timestamp()
            ))


def get_timestamp():
    return datetime.datetime.now().strftime('%Y%m%dT%H%M%S')


class Mounter(object):
    mount_options = [
        'mount',
        MOUNT_PARTITION,
        MOUNT_LOCATION
    ]

    umount_options = [
        'umount',
        MOUNT_PARTITION
    ]

    def mount(self):
        with open(LED_TRIGGER_FILE, 'w') as f:
            f.write(LED_ACTIONS['working'])
        stdout, stderr = subprocess.Popen(
            self.mount_options,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        ).communicate()
        if stderr and 'already mounted' not in stderr:
            raise ValueError(stderr)

        time.sleep(WAIT_FOR_MOUNT)

        return MOUNT_LOCATION

    def umount(self):
        stdout, stderr = subprocess.Popen(
            self.umount_options,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        ).communicate()
        with open(LED_TRIGGER_FILE, 'w') as f:
            f.write(LED_ACTIONS['success'])

        time.sleep(WAIT_AFTER_FINISH)

        with open(LED_TRIGGER_FILE, 'w') as f:
            f.write(LED_ACTIONS['default'])

    def __enter__(self):
        return self.mount()

    def __exit__(self, exc_type, exc_val, exc_tb):
        return self.umount()


def concat_tempfiles():
    filenames = sorted(glob.glob(
        os.path.join(MOUNT_LOCATION, 'temps_*.txt')
    ))
    with open(os.path.join(MOUNT_LOCATION, 'all.txt'), 'w') as outfile:
        for fname in filenames:
            with open(fname) as infile:
                for line in infile:
                    outfile.write(line)


def save_temps():
    with Mounter() as location:
        try:
            shutil.move(
                TEMPFILE,
                os.path.join(location, 'temps_%s.txt' % get_timestamp())
            )
            concat_tempfiles()
        except Exception:
            with open(os.path.join(location, 'errors.txt'), 'a') as f:
                f.write(traceback.format_exc())

        # So the file get's recreated
        store_temp()


if __name__ == '__main__':
    me = singleton.SingleInstance()
    with open('/tmp/logger', 'a') as logger:
        logger.write('Invoked! sys.argv: %s\n' % sys.argv)
        if len(sys.argv) < 2:
            print('Need two arguments')
        else:
            arg = sys.argv[1]
            if arg == 'store':
                store_temp()
            elif arg == 'save':
                save_temps()
            elif arg in ('mount', 'umount'):
                mounter = Mounter()
                if arg == 'mount':
                    mounter.mount()
                else:
                    mounter.umount()
            else:
                print('Only know save and store')
        logger.write('Done!\n')
