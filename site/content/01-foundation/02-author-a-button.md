---
uid: XnzRI7to
title: "First Program: Author a Button"
weight: 20
session_num: 2
sessions_total: 3
duration_min: 90
prep_min: 15
prog_level: "MakeCode blocks — modify"
devices_required: true
description: "Students open the robot's receiver in MakeCode and give a button a new behavior by editing the dispatch skeleton — their first program."
opening_concept: |
  **You can change what the robot does.** The robot runs a program called the
  *receiver*. It's built so that **driving always works** — that part runs on every
  radio message, outside the buttons — and each button just sets a light and does
  one action. Today you copy the worked example into an empty button slot and make
  it your own. Because driving is separate, you can't break it.
run_sheet:
  - time: "0:00–0:08"
    name: "Recap & hook"
    cue: "*Last time you drove it. Today you change what it does.*"
    details:
      - "Show a button doing something new — a sound, an image, the gripper."
  - time: "0:08–0:23"
    name: "Open & flash the baseline"
    cue: "Open the receiver share link, connect over WebUSB, and flash the unchanged project."
    details:
      - "Confirm driving still works after flashing."
    watch_for: "Charge-only USB cables power the board but won't flash it. Use a data cable."
    if_stuck: "Use Chrome or Edge, click **Connect device**, and pick the micro:bit."
  - time: "0:23–0:38"
    name: "Read the skeleton"
    cue: "Walk the dispatch structure together."
    details:
      - "Each button sets a **light** and does an **action** (D and E are worked examples — open/close gripper)."
      - "Driving runs on every message, **outside** the if/else — so editing a button can't break it."
      - "C and F are **empty slots** waiting for the student's first code."
  - time: "0:38–1:03"
    name: "Author a button"
    pl_activity: "Modify"
    cue: "Copy the worked pattern into C or F: make the button do something visible, and set its light."
    details:
      - "Options: play a sound, flash an image, close the gripper, trigger a dance move."
      - "Flash and test on the robot."
    watch_for: "Edited but didn't flash ('nothing changed') — confirm they clicked Download and the robot re-flashed."
  - time: "1:03–1:15"
    name: "Iterate & extend"
    cue: "Tweak it; fill the second empty slot if time allows."
    details:
      - "Notebook: *what did your button do versus what you expected?*"
    if_early: "Chain two actions in one button (light + sound + move), or design a 'signature' light pattern."
  - time: "1:15–1:25"
    name: "Share-out"
    cue: "Three or four students show their button."
    details:
      - "Celebrate the range — every student made the robot do something different."
  - time: "1:25–1:30"
    name: "Wrap-up & pack"
    cue: "Save the share link, power down, store devices."
    details:
      - "Remind students their program lives at the share link — they'll build on it next time."
materials:
  - "A computer per student or pair (Chrome or Edge for WebUSB), online MakeCode editor"
  - "The receiver starter project (share link), posted in the room"
  - "USB **data** cables (not charge-only)"
  - "Robots + joysticks (color-coded), charged"
  - "Engineering notebooks"
engineering:
  step: "Build (modify)"
  body: |
    This is the first rung of the authorship ladder: students **modify provided
    code**. The receiver skeleton is a scaffold — driving is decoupled and
    unbreakable, and the label-lights make it obvious which button fired. Students
    get a real win (the robot does something *they* chose) without having to write
    a program from scratch yet.
troubleshooting:
  - issue: "Edited the program but nothing changed"
    fix: "They didn't flash. Click **Download** and confirm the robot re-flashed; check the right device is selected in WebUSB."
  - issue: "Pairing or driving broke after editing"
    fix: "They likely opened the **transmitter** by mistake. Re-open the **receiver** share link — students only edit the receiver."
  - issue: "The new action runs all the time, or driving stopped"
    fix: "Code went in the wrong place. Keep the action **inside** the C/F button branch; leave the driving line where it is."
  - issue: "Can't tell whether the button fired"
    fix: "Set a distinct light color in the branch first — the headlight is a built-in 'did it run?' check."
  - issue: "WebUSB won't connect"
    fix: "Use Chrome or Edge, a data cable, then **Connect device** and pick the micro:bit."
---
