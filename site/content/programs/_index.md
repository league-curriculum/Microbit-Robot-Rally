---
title: "Programs"
weight: 80
---

Ready-made MakeCode programs, the League extensions the course is built on, and a
few supporting tools. The robots and joysticks ship **pre-flashed** with the
programs below; in class, students edit the **receiver** (see the Foundation
lessons), while the joystick transmitter is left alone.

## Device Programs

| Device | Program | Source |
|--------|---------|--------|
| **Joystick 🔴** | [Open in MakeCode](https://makecode.microbit.org/S29867-07006-10286-26715) | [Remote-Joystick repo](https://github.com/League-Microbit/Remote-Joystick) |
| **Cutebot 🔵** | [Open in MakeCode](https://makecode.microbit.org/S02656-80574-03454-98135) | [remote-cutebot repo](https://github.com/League-Microbit/remote-cutebot) |

To flash a whole classroom set at once, use the **`microbit-loader`** utility in the
course repository — it loads the stock transmitter/receiver hex onto many devices
in one pass.

## MakeCode Extensions

The course's robot and joystick blocks come from custom League extensions. Add them
in MakeCode via **Extensions → paste the GitHub URL**:

- [pxt-joystick](https://github.com/League-Microbit/pxt-joystick) — the Joystick:bit controller extension
- [pxt-cutebot](https://github.com/League-Microbit/pxt-cutebot) — League version of the Elecfreaks Cutebot extension
- [pxt-leagueir](https://github.com/League-Microbit/pxt-leagueir) — infrared transmit / receive
- [pxt-radioext](https://github.com/League-Microbit/pxt-radioext) — custom radio packets and channel negotiation (device pairing)

## Other Tools

- [Part Designer](https://marian42.de/partdesigner/) — design 3D-printable, Technic-compatible parts for custom attachments ([source on GitHub](https://github.com/marian42/partdesigner))
- [Joystick:bit V2 wiki](https://wiki.elecfreaks.com/en/microbit/expansion-board/joystick-bit-v2/) — Elecfreaks hardware reference for the controller
