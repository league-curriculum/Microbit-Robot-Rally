---
uid: EJnHKmgq
title: "Pair & Drive"
weight: 10
session_num: 1
sessions_total: 3
duration_min: 90
prep_min: 10
prog_level: "Level 0 — No code"
devices_required: true
description: "Students pair the joystick to the robot and drive — no code. First feel for the system, and the first engineering-notebook observations."
opening_concept: |
  **Robot + controller + radio.** The Cutebot and the Joystick:bit each contain a
  micro:bit, and they talk to each other over a 2.4 GHz radio link — like two
  walkie-talkies. Today there's no programming: *you* are the brain and the robot
  does what you tell it. As you drive, notice one thing — turning the robot exactly
  where you want is hard. That observation is the seed for everything we add later.
run_sheet:
  - time: "0:00–0:10"
    name: "Welcome & the system"
    cue: "Hold up a robot and a joystick. Ask: *how do you think these talk to each other?*"
    details:
      - "Name the three parts: the **robot**, the **controller** (joystick), and the **radio link** between them."
      - "Point out the color dots — red = joystick, blue = robot — and that they come in matched sets."
  - time: "0:10–0:20"
    name: "Pair up"
    cue: "Hand out matched red/blue sets. Power on both and pair."
    details:
      - "Confirm each student's joystick drives **their own** robot, not a neighbor's."
    watch_for: "Two robots responding to one joystick, or none — re-pair and spread groups out."
  - time: "0:20–0:40"
    name: "Free drive"
    cue: "Open driving in clear space — forward, reverse, turns, speed. Goal is feel and fun."
    details:
      - "Let students just play and get comfortable with the controls."
    if_stuck: "Check power, charge, and that the link formed (confirmation shows on the micro:bit display)."
  - time: "0:40–1:00"
    name: "Obstacle play"
    cue: "Add cones, blocks, or tape lines. Weave through, attempt tight turns, stop on a mark."
    details:
      - "Set loose goals: drive between the cones, stop on the tape square, turn around in the box."
    if_early: "Make the course tighter, or have them drive it in reverse."
  - time: "1:00–1:15"
    name: "Notebook: observe"
    cue: "First engineering-notebook entry. Prompt: *what does the robot do when you try a sharp turn?*"
    details:
      - "Students write or sketch what they notice — especially that turns overshoot or drift."
  - time: "1:15–1:25"
    name: "Share-out"
    cue: "Three or four students demo something they noticed."
    details:
      - "Steer the discussion toward 'turning is hard to control precisely.' Name it; don't fix it yet."
  - time: "1:25–1:30"
    name: "Wrap-up & pack"
    cue: "Power down, return devices to the color-coded bins."
    details:
      - "Tease the next session: *next time, you program the robot.*"
materials:
  - "One pre-flashed Cutebot (blue dot) + Joystick:bit (red dot) per student, charged"
  - "Spare batteries / charging cables; a few spare robots"
  - "Open floor space (~3 × 3 m per group)"
  - "Cones, foam blocks, or tape for an informal driving course"
  - "Pocket engineering notebook + pencil per student"
engineering:
  step: "Frame (observe)"
  body: |
    Before students can *frame* a problem, they have to notice one. Drive Day is
    pure observation: students feel how the robot responds and discover — on their
    own — that open-loop driving can't turn precisely. That noticed gap is the raw
    material every later session builds on, when we start framing problems and
    adding sensors to solve them.
troubleshooting:
  - issue: "Two robots respond to one joystick (or none respond)"
    fix: "Re-pair the set, confirm the red/blue dots match, and spread groups out so radios don't overlap."
  - issue: "Robot won't move"
    fix: "Check power on **both** devices, battery charge, and that the link formed (confirmation shows on the micro:bit display)."
  - issue: "Students frustrated they can't steer precisely"
    fix: "Reframe it: *nobody* can make it perfect — the interesting part is noticing **how** it misses. That's tomorrow's problem to solve."
  - issue: "Robots crashing or driving off tables"
    fix: "Keep all driving on the floor and set a boundary line or taped box."
---
