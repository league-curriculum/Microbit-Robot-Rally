---
title: "Reference Curricula & Resources"
weight: 10
description: "Outside curricula and resources to draw on — and how to adapt them to the League hardware."
---

These are the most useful existing resources for teaching micro:bit + Cutebot
robotics. They came out of the Phase 1c research; the full analysis (with coverage
ratings and notes) lives in `.course/research/existing-curricula.md`.

## The one big caveat

Every published Cutebot/robot example uses the **stock** MakeCode extensions, not
the League ones (`pxt-cutebot`, `pxt-joystick`, `pxt-leagueir`, `pxt-radioext`). So
**no robot code is directly reusable** — robot resources are for **adapting**:
reuse the sequence, framing, and game rules, but rewrite the code against the League
extensions. Only pure-micro:bit (no-robot) resources are conflict-free.

## Resources

| Resource | Use it for | How |
|----------|-----------|-----|
| [Elecfreaks Cutebot Wiki](https://wiki.elecfreaks.com/en/microbit/microbit-smart-car/microbit-smart-cutebot/) — 15 MakeCode cases ([case library](https://www.elecfreaks.com/learn-en/microbitKit/smart_cutebot/)) | Driving, line-following, obstacle avoidance, radio/joystick/IR remote | **Adapt** — closest structural match; mirror the sequence, rewrite the code |
| [MakeCode "Intro to CS"](https://makecode.microbit.org/courses) + [Radio course](https://makecode.microbit.org/courses/csintro/radio) | Foundation programming concepts and the radio module (groups, channels, send/receive) | **Adapt** — free, explicitly grades 6–8 |
| [micro:bit "First Lessons with MakeCode"](https://microbit.org/teach/lessons/first-lessons-with-makecode-and-the-microbit/) | "Meet the Micro:bit" basics — display, buttons, first programs | **Adapt** — no robot, so conflict-free |
| [Cutebot Football Game Kit](https://wiki.elecfreaks.com/en/microbit/microbit-smart-car/microbit-smart-cutebot/cutebot-fun-football-game-kit/) | Competition structure (coin toss, match, penalty shootout) for the Games track | **Adapt** — the only existing competition analog |
| [Kitronik :MOVE lesson plans](https://kitronik.co.uk/blogs/resources/lesson-plans-for-move-mini-microbit) | Comparison; their "second micro:bit as a radio controller" parallels Drive Day | **Reference** — different hardware |
| [Raspberry Pi Foundation projects](https://projects.raspberrypi.org/en/projects) | Scaffolding and differentiation; Explore → Design → Invent parallels our spine | **Reference** |
| [micro:bit "do your :bit"](https://microbit.org/teach/do-your-bit/) | A participation challenge / showcase hook and completion badge | **Optional** |

## Where you're on your own (author original)

No existing curriculum covers these, so the course builds them from scratch:

- **Infrared device-to-device messaging** (`pxt-leagueir`)
- **The Robot Rally games** (race, tag, capture-the-flag, soccer, sumo)
- **Attachments & 3D-printed Technic parts**
- **The Drive-Day "hook-first" onboarding** and the **engineering-notebook spine**
