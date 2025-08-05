# Imports go at the top
from microbit import *
from microbit import scale

x = y = 3
ave_len = 20  # Length of the running average


def run_ave(new, old):
    return round((new + old * (ave_len - 1)) / ave_len, 0)


clip_ul = lambda x, l, u: max(min(x, u), l)
clip = lambda x: clip_ul(x, 0, 4)


def sp(x, y, intensity):
    """"set pixels with limits"""
    x = clip(x)
    y = clip(y)
    display.set_pixel(x, y, intensity)


def mr(x):
    return int(round(
        scale(int(x), from_=(-1000, 1000), to=(0, 4))
    ))


while True:
    ox, oy = mr(x), mr(y)
    y = run_ave(accelerometer.get_y(), y)
    x = run_ave(accelerometer.get_x(), x)
    mrx = mr(x)
    mry = mr(y)

    if not (ox == mrx and oy == mry):
        sp(ox, oy, 3)

    sp(mr(x), mr(y), 9)

    if button_a.was_pressed():
        display.clear()

