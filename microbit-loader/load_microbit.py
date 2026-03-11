#!/usr/bin/env python3
"""Load hex files onto micro:bit devices as they are plugged in."""

import shutil
import time
import os
import sys
import tty
import termios

MICROBIT_VOLUME = "/Volumes/MICROBIT"
POLL_INTERVAL = 0.5  # seconds

# ANSI color codes (dark colors for yellow background)
BLACK = "\033[30m"
BOLD = "\033[1m"
RESET = "\033[0m"
CLEAR = "\033[2J\033[H"

OPTIONS = [
    {
        "hex": "microbit-Remote-Joystick.hex",
        "label": "joystick",
        "dot": "\U0001f534",  # red circle emoji
    },
    {
        "hex": "microbit-Cutebot-Remote.hex",
        "label": "cutebot",
        "dot": "\U0001f535",  # blue circle emoji
    },
]


def read_key() -> str:
    """Read a single keypress, handling arrow key escape sequences."""
    fd = sys.stdin.fileno()
    old = termios.tcgetattr(fd)
    try:
        tty.setraw(fd)
        ch = sys.stdin.read(1)
        if ch == "\x1b":
            ch2 = sys.stdin.read(1)
            if ch2 == "[":
                ch3 = sys.stdin.read(1)
                if ch3 == "A":
                    return "up"
                elif ch3 == "B":
                    return "down"
            return "esc"
        elif ch in ("\r", "\n"):
            return "enter"
        elif ch == "\x03":
            return "ctrl-c"
        return ch
    finally:
        termios.tcsetattr(fd, termios.TCSADRAIN, old)


def draw_menu(selected: int) -> None:
    """Draw the selection menu."""
    sys.stdout.write(CLEAR)
    sys.stdout.write(f"{BLACK}{BOLD}  Select program to load:{RESET}\n\n")
    for i, opt in enumerate(OPTIONS):
        arrow = f"\u25b6 " if i == selected else "  "
        sys.stdout.write(f"  {BLACK}{arrow}{RESET}{opt['dot']}  {BLACK}{BOLD}{opt['label']}{RESET}\n\n")
    sys.stdout.write(f"  {BLACK}Use \u2191\u2193 arrows, Enter to select{RESET}\n")
    sys.stdout.flush()


def choose_program() -> dict:
    """TUI picker: arrow keys to move, Enter to select."""
    selected = 0
    draw_menu(selected)
    while True:
        key = read_key()
        if key in ("up", "down"):
            selected = 1 - selected
            draw_menu(selected)
        elif key == "enter":
            return OPTIONS[selected]
        elif key in ("ctrl-c", "esc"):
            sys.stdout.write(CLEAR)
            sys.exit(0)


def draw_status(label: str, dot: str, message: str, count: int) -> None:
    """Draw the loading status screen."""
    sys.stdout.write(CLEAR)
    sys.stdout.write(f"\n  {BLACK}{BOLD}micro:bit loader{RESET}\n\n")
    sys.stdout.write(f"  Loading:  {dot}  {BLACK}{BOLD}{label}{RESET}\n\n")
    sys.stdout.write(f"  Loaded:   {BLACK}{count} device(s){RESET}\n\n")
    sys.stdout.write(f"  {BLACK}{BOLD}{message}{RESET}\n")
    sys.stdout.flush()


def copy_hex(hex_file: str) -> None:
    """Copy hex file to the micro:bit volume."""
    src = os.path.join(os.path.dirname(os.path.abspath(__file__)), hex_file)
    dst = os.path.join(MICROBIT_VOLUME, hex_file)
    shutil.copy2(src, dst)


def main():
    info = choose_program()

    hex_file = info["hex"]
    label = info["label"]
    dot = info["dot"]
    count = 0

    while True:
        draw_status(label, dot, "Waiting for MICROBIT device...", count)

        while not os.path.isdir(MICROBIT_VOLUME):
            time.sleep(POLL_INTERVAL)

        # Brief pause to let the volume fully mount
        time.sleep(1)

        if not os.path.isdir(MICROBIT_VOLUME):
            continue

        count += 1
        draw_status(label, dot, f"Copying {hex_file} ...", count)
        copy_hex(hex_file)

        draw_status(label, dot, "Done! Remove device and plug in the next one.", count)

        while os.path.isdir(MICROBIT_VOLUME):
            time.sleep(POLL_INTERVAL)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        sys.stdout.write(f"{CLEAR}")
        sys.stdout.flush()
