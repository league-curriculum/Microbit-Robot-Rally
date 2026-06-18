---
title: foundation
created: 2026-06-17T21:56:53Z
approved: true
---

# Foundation Module — Outline

The required entry sequence every class runs in order, before the modular phase.
Deliberately short and concrete: students drive first (no code), then make their
first edit, then run their first real engineering-iteration loop. Teleoperation is
established here as the command layer the rest of the course builds on.

**How these lessons work.** The lessons are activity- and discovery-driven: students
are doing something — driving, building, competing — and each technique is taught at
the moment they discover they need it, not front-loaded. A lesson title names the
*activity* ("Add a Servo"); the skill it requires (e.g., calibration) is introduced
in context when the need surfaces.

**Session length:** 90-minute sessions, one lesson per session (≈3 sessions). The
longer blocks give more build + iterate time per session.

---

## Lesson 1 — Pair & Drive  *(no code)*
- **Goal:** engagement + a feel for the system (robot, controller, radio link); set
  the teleop baseline.
- **Activities:** pair the pre-flashed joystick to the robot → free drive → informal
  driving play (steer around obstacles, attempt tight turns). The competitive **Gate
  Course / Time Trial** lives in the Games track (C1), not here.
- **Constraint noticed:** even in free play, open-loop turning is imprecise — an
  early observation that seeds the later "why we need sensors/autonomy" arc.
- **Notebook:** first entries — *observe* what the robot does, especially on tight turns.
- **Standards:** sets up MS-ETS1-1 (framing problems) for later lessons.
- **Materials highlights:** charged, pre-flashed robots + joysticks (color-coded),
  open floor space, a few obstacles/markers for informal driving.

## Lesson 2 — First Program: Author a Button
- **Goal:** first contact with MakeCode and the receiver dispatch skeleton; prove
  "I can change the robot's behavior."
- **Activities:** open the receiver project → copy the worked pattern into an empty
  slot (button C or F): make the button do something visible — close the gripper,
  play a sound, flash an image, trigger a dance move — and change its label light →
  flash and test.
- **Key ideas:** driving is decoupled (can't be broken by a button edit); lights are
  labels/breakpoints; edit the **receiver**, not the transmitter.
- **Notebook:** what the button did vs. what you expected.
- **Standards:** CSTA 2-AP-11, 2-CS-02.
- **Materials highlights:** computers with the MakeCode editor + WebUSB; the receiver
  starter project (Share link); USB cables.

## Lesson 3 — Add a Servo  *(first real Frame→Design→Build→Iterate)*
- **Goal:** add a servo to drive a student-built attachment — and, in doing so,
  *discover* the need to calibrate it: the "open"/"closed" angles for your mechanism
  are something you find, not something you're told. Calibration is taught here, at
  the point students hit the need.
- **Activities:** students **design and build their own attachment (free-build)**
  from Lego/Technic parts → add a servo and wire it to a button → try to make it
  work → discover the stock open/close calls don't fit their mechanism → (taught
  here) drop to raw servo-angle blocks and find open / closed / center by observing
  and adjusting.
- **Constraint discovered:** one servo gives open *or* closed, not graded force;
  values are mechanism-specific — and a self-designed mechanism makes that vivid.
- **Notebook:** observe → diagnose → plan → result, iterated (the canonical loop).
- **Standards:** MS-ETS1-4, CSTA 2-AP-17, 2-CS-03.
- **Materials highlights:** servos + horns/screws; **Lego/Technic parts for students
  to design and build their own attachment**; the receiver project from Lesson 2.

---

## Decisions (confirmed)
1. **Session length:** 90 minutes, one lesson per session.
2. **Lesson 3 attachment:** free-build — students design and build their own.
3. **Time trial:** moved to the Games track (C1); Lesson 1 is pure free-drive.
