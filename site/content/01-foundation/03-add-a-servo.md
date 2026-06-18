---
uid: aZVCPWrF
title: "Add a Servo"
weight: 30
session_num: 3
sessions_total: 3
duration_min: 90
prep_min: 15
prog_level: "MakeCode blocks — raw servo angles"
devices_required: true
description: "Students design and build an attachment, add a servo, and discover they have to calibrate its angles — the first full Frame → Design → Build → Iterate loop."
opening_concept: |
  **A servo moves to an *angle*, not just on or off.** Today you build your own
  attachment — a gripper, a flipper, an arm — and drive it with a servo. The catch:
  the "open" and "closed" angles built into the example are for a *different* claw.
  For **your** build, those numbers are wrong. You'll find your own by trying,
  watching, and adjusting. That loop — observe, diagnose, plan, test — is the heart
  of engineering.
run_sheet:
  - time: "0:00–0:08"
    name: "Frame the job"
    cue: "*Build something your robot can do with a moving part — grab, flip, or lift.*"
    details:
      - "Each student names what their attachment should do."
  - time: "0:08–0:33"
    name: "Design & build"
    pl_activity: "Design"
    cue: "Sketch the idea in the notebook, then build the attachment from Lego/Technic parts."
    details:
      - "Keep it simple — one moving joint driven by one servo."
    if_stuck: "Offer a known-good starting shape (a simple two-bar claw) and let them modify it."
  - time: "0:33–0:45"
    name: "Add the servo"
    cue: "Mount the servo, attach the mechanism, plug into the servo port (S1), and wire it to a button."
    details:
      - "Reuse the worked gripper pattern from Lesson 2 to trigger the servo from a button."
  - time: "0:45–0:55"
    name: "First test → the discovery"
    cue: "Trigger the button. The stock open/close angles don't fit — the claw won't close, over-travels, or binds."
    details:
      - "Name it out loud: *the numbers aren't yours yet.*"
    watch_for: "Servo buzzing or straining — it's being driven past where the mechanism can go. Back off the angle."
  - time: "0:55–1:05"
    name: "Teach calibration"
    pl_activity: "Build"
    cue: "Introduce the raw 'set servo angle' block. Demonstrate finding one good value by adjusting and testing."
    details:
      - "Show the difference between the named helper (open/close gripper) and choosing a raw angle yourself."
  - time: "1:05–1:20"
    name: "Iterate to fit"
    pl_activity: "Iterate"
    cue: "Students find their own open / closed / center angles by observe → adjust → test."
    details:
      - "Record each try and its result in the notebook so good values aren't lost."
    if_early: "Find a useful middle position too, or make a smaller angle change do more work (leverage)."
  - time: "1:20–1:30"
    name: "Share & wrap"
    cue: "Two or three demos. Everyone records their final angles."
    details:
      - "Make sure final angle values are written in the notebook before packing up."
materials:
  - "Servos (one per student) with horns and small screws"
  - "Mounting pins / brackets for the Cutebot's front mount"
  - "A bin of Lego/Technic parts for free-building attachments"
  - "The receiver project from Lesson 2; computers + USB data cables"
  - "Robots, joysticks, engineering notebooks"
engineering:
  step: "Frame → Design → Build → Iterate"
  body: |
    This is the first session that runs the **whole engineering loop**. Students
    *frame* a job (what should my attachment do?), *design* and build a mechanism,
    *build* the code to drive it, and then **iterate**: the servo doesn't fit, so
    they observe, diagnose, plan a new angle, and test again. Calibration isn't
    taught up front — it's discovered at the exact moment students need it.
troubleshooting:
  - issue: "Servo doesn't move at all"
    fix: "Check it's in the **S1** port and oriented correctly, and that the button branch actually calls the servo."
  - issue: "Servo buzzes, binds, or strips gears"
    fix: "It's being commanded past the mechanism's physical limit. Approach limits gradually and back the angle off when it strains."
  - issue: "Students expect the open/close preset to work on their own build"
    fix: "That mismatch **is** the lesson. Let them hit it, then introduce the raw 'set servo angle' block."
  - issue: "Random guessing instead of systematic tuning"
    fix: "Coach one change at a time: try an angle, watch what happens, write it down, adjust. That's the iterate loop."
  - issue: "Good angles found, then lost after re-flashing"
    fix: "Insist values go in the notebook as they're found — the notebook is the record, not the robot."
---
