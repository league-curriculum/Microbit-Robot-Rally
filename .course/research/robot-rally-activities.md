# Micro:bit Robot Rally — Activities, Challenges, and Games

This document has two parts. **Part 1** records how the course already works — the
pre-loaded teleop start, the receiver-program scaffold, and the authorship surface
students actually edit. **Part 2** proposes additional activities, organized into
three kinds: **lessons** (we teach a capability), **challenges** (one student or
robot against a problem), and **games** (teleoperation and head-to-head play that
test skills under pressure). Proposals are drawn from the ElecFreaks Cutebot
catalog and adjacent micro:bit material, reframed to fit the course's
discover-the-constraint ethic rather than copied as recipes.

---

# Part 1 — How the course works now

## The pre-loaded start

Robots ship flashed. The micro:bits come pre-loaded with a joystick transmitter
program and a matching receiver program on the robot. Day one requires no
flashing and no MakeCode: students pair the joystick to the robot and drive. The
first experience is engagement and a feel for the system — robot, controller,
radio link — not code.

This makes the foundation shorter and more concrete than a generic "meet the
microcontroller, then make it move" sequence. Driving is free; the first thing
students *build* is an attachment, and the first thing they *program* is the
servo that runs it.

## The joystick persists — it is the command layer, not training wheels

The course does not move *away* from the joystick. The joystick stays as the
human-command channel while autonomy is layered underneath it. The progression is:

1. **Pure teleop** — drive it.
2. **Teleop + actuator** — drive, and press a button to grip / flip / lift.
3. **Teleop + triggered routine** — press a button, the robot runs a
   pre-programmed autonomous action, then returns control to the driver.
4. **Autonomy with joystick as start / stop / override** — the robot acts on its
   own, but the human keeps a "go," a "stop," and a "do task 3" button.

Keeping start/stop on the joystick is a deliberate control and safety decision.
A fully autonomous robot that will not stop is chaos in a room of twelve kids.
This also mirrors how real field robots work — teleoperation plus autonomy — which
is a stronger story for parents than "first we play, then we graduate to coding."

## The robot program: a self-labeling dispatch skeleton

Students open **one** file, the Cutebot receiver. Its shape:

```javascript
radiop.onReceiveJoystickMessage(function (payload) {
    if (radiop.buttonPressed(payload, radiop.JoystickButton.C)) {
        cuteBot.colorLight(cuteBot.RGBLights.ALL, 0xff0000)        // red, empty slot
    } else if (radiop.buttonPressed(payload, radiop.JoystickButton.D)) {
        cuteBot.colorLight(cuteBot.RGBLights.ALL, 0x00ff00)        // green
        cuteBot.closeGripper()                                     // worked example
    } else if (radiop.buttonPressed(payload, radiop.JoystickButton.E)) {
        cuteBot.colorLight(cuteBot.RGBLights.ALL, 0xffff00)        // yellow
        cuteBot.openGripper()                                      // worked example
    } else if (radiop.buttonPressed(payload, radiop.JoystickButton.F)) {
        cuteBot.colorLight(cuteBot.RGBLights.ALL, 0x0000ff)        // blue, empty slot
    } else if (radiop.buttonPressed(payload, radiop.JoystickButton.Logo)) {
        cuteBot.flashUniqueHeadlights()
    } else {
        cuteBot.setUniqueHeadlights()                              // resting state
    }
    cuteBot.controlMotors(payload)                                 // drive — always runs
})
```

Three design facts make this a forgiving authorship surface:

- **Driving is decoupled.** `cuteBot.controlMotors(payload)` runs on every
  message, *outside* the if/else. A student can put anything in the button
  branches and the robot keeps driving. There is no way to break driving by
  editing a button clause.
- **Lights are labels, not decoration.** Each button sets a headlight color, so a
  student presses a button and *sees* which clause it maps to — without reading
  the code. The same light is a free breakpoint when debugging ("the light still
  flashes, so my button is reaching the clause; the problem is in what I added").
- **Two slots are worked examples, two are empty.** D and E show the pattern
  "set a light, then call a robot action" (close/open gripper). C and F set a
  light and do nothing else — labeled slots waiting for the student's first code.

The A/B buttons on the micro:bit send state *back* to the joystick (a tone and an
image), which is the bidirectional feedback channel already wired as a worked
example.

This is the same legibility principle as the color-coded device fleet (red =
joystick, blue = robot): use visible state to make an invisible system readable to
a kid who cannot yet read the code. It is what makes productive struggle
survivable — the struggle is "what do I put in the clause," never "where is the
clause and did my button even fire."

## The authorship ladder

What students actually do, in order:

1. **Copy a pattern into an empty slot.** Put a named action on button C or F and
   change its light — close the gripper, play a sound, flash an image, trigger a
   dance move, whatever. No math; pure pattern-match. Accessible to every student
   in the first minute of programming. (~1.5–2 hr mark.)
2. **Swap a custom servo and calibrate its limits.** The stock gripper runs
   0→90 via `openGripper()` / `closeGripper()`. When a student mounts a *different*
   servo — a Lego gripper they built, a flipper, a swirler — those named calls no
   longer fit. They drop from the named helper to a raw servo-angle block and
   have to *find* the values: where is "open," where is "closed/flipped," where is
   center. The servo binds, over-travels, or the claw won't fully close, and they
   tune by observing and adjusting. This is the first real
   Frame → Design → Build → Iterate loop, and the first time the example doesn't
   fit their build so they must find the numbers themselves.
3. **(Advanced, optional) Crack open `controlMotors`.** Replace that one line
   with your own arithmetic on the stick values: left = forward + turn,
   right = forward − turn, then clamp. This is the first code in the course that
   *computes* on inputs rather than mapping a button to an action. The joystick
   still drives — they are reimplementing the mixing, not removing the stick.
   Replacing the stick with a sensor is a *different*, later edit. Not every
   student does this one.

## The boundary: students edit the receiver, not the transmitter

Students work on the robot's *behavior*, not the joystick's *protocol*. The
joystick transmitter is a fixed sender; pairing can't be broken by editing the
wrong file. The one exception is the bidirectional-feedback module (below), which
is the only activity that touches the joystick side.

## The existing material

The current "curriculum" is really a set of identified activities — roughly three
hours: pair-and-drive, then add-and-calibrate an attachment, then a handful of
button-authoring tasks. Everything in Part 2 builds out from there into a fuller
modular phase.

---

# Part 2 — Proposed activities

Each entry is tagged **[Lesson]**, **[Challenge]**, or **[Game]**, with the
hardware it exercises, the constraint students hit, and where it sits relative to
the authorship ladder. Difficulty: ⭐ entry, ⭐⭐ intermediate, ⭐⭐⭐ advanced.

A note on sourcing: ElecFreaks publishes the Cutebot base cases (1–15), Extended
Projects (gripper car, "Angry Cutebot," Combat Cart 1–4), and a Football Game Kit
(coin toss, penalty shootout, official competition). All are Creative Commons,
all in MakeCode blocks. They are written recipe-style — here's the code, download
it — which is the opposite of this course's ethic. So they are used as
**capability references and game-rule scaffolds**, not as lessons to adopt. Where
a proposal cites a case number, that case is the wiring/reference implementation a
student may consult after hitting the wall, not the lesson itself.

---

## A. Attachment & actuator track (the course's spine)

This is where the course's differentiator lives: user-need-before-hardware and
discover-the-constraint, applied to things students build and mount.

### A1. Calibrate Your Servo ⭐ [Lesson]
**Teach:** a servo moves to an *angle*, and the angle that means "open" for your
mechanism is something you find, not something you're told.
**Hardware:** one servo on S1, any student-built attachment.
**Constraint:** the stock 0/90 values are meaningless for a custom build; one
servo gives you open *or* closed, not graded force.
**Ladder:** rung 2. This is the first real authorship task and the gateway to the
whole track.
**Reference:** Item Grabbing Car (Case 22) for wiring.

### A2. Build a Gripper, Pick Up the Ball ⭐⭐ [Challenge]
**Teach:** geometry of a claw — reach, opening width, where the ball has to be
relative to a fixed jaw.
**Hardware:** Lego gripper on a servo; foam ball; easy holder; latching goal.
**Constraint:** a grip strong enough to hold can crush foam; a fixed claw means
the *robot's* position does the aiming, not the claw.
**Challenge form:** one robot, timed — lift from the easy holder, carry, release
into the latching goal. Pure mechanism + calibration; no opponent.
**Reference:** Case 22.

### A3. Build a Flipper ⭐⭐ [Challenge]
**Teach:** a flipper has to get *under* the opponent; throw and timing beat raw
speed.
**Hardware:** servo flipper built from Lego; building-block wedge to get the lip low.
**Constraint:** servo travel and lip height determine whether you can scoop;
weight too far forward and you tip yourself.
**Challenge form:** flip a passive "dummy" robot or a weighted block off a line.
Becomes a game in C-track (King of the Hill / Combat).
**Reference:** Combat Cart 1 (Case 26) — block build + servo on S1, C/D triggers
the action.

### A4. ~~Two-Servo Arm: Lift and Grip~~ — dropped
Not planned: a second servo on S2 is hard to mount on the Cutebot, so the actuator
track stays single-servo (S1).

### A5. Front-Wheel Lift / Wall Climber ⭐⭐⭐ [Challenge]
**Teach:** a servo can change the robot's *geometry*, not just hold a tool —
lifting the front to mount a ledge.
**Hardware:** servo arm that pushes the nose up.
**Constraint:** center of mass and timing — lift too early and you flip; too late
and you nose into the wall.
**Challenge form:** climb a low ledge or drive over a barrier. Timed, single robot.

### A6. 3D-Print a Custom Attachment ⭐⭐⭐ [Challenge] *(permanent sites / camps)*
**Teach:** the full engineering loop with fabrication — design a Technic-compatible
part in Merriam Parts Designer, print it, mount it, test, revise.
**Hardware:** 3D printer; the front mounting point; pins.
**Constraint:** printed pin holes run tight or loose; cantilevered arms flex under
load.
**Challenge form:** design an attachment that solves a chosen challenge (better
gripper, scoop, ramp-foot) and survives a run. This is the capstone of the
attachment track.

---

## B. Sensing & autonomy track

Perception comes *after* action in this course — students author button behaviors
first, then learn the sensors that let the robot decide for itself. Each of these
is a triggered routine (rung 3) or, combined, full autonomy (rung 4).

### B1. Stop at the Edge ⭐ [Lesson]
**Teach:** the line/reflectance sensors read the surface, and a reading can
trigger an action.
**Hardware:** two reflectance sensors.
**Constraint:** the sensor sees a small spot; speed vs. reaction distance.
**Reference:** Fall-arrest Cutebot (Case 07).

### B2. Line Follow ⭐⭐ [Lesson]
**Teach:** read both sensors, steer to stay centered.
**Hardware:** two reflectance sensors; taped line.
**Constraint:** two sensors can't distinguish "dead center" from "off both
sides"; sharp corners overshoot.
**Reference:** Run Along the Black Line (Case 08) — hand students this as code to
*break and fix*, not to copy clean.

### B3. Don't Crash (Sonar Stop) ⭐⭐ [Lesson]
**Teach:** read distance ahead, stop at a threshold.
**Hardware:** front sonar.
**Constraint:** narrow cone, noisy under a few cm, latency.
**Reference:** Autonomous Obstacle Avoidance (Case 09).

### B4. Convoy / Car-Following ⭐⭐⭐ [Challenge]
**Teach:** hold a *fixed distance* from a moving robot ahead — a control problem,
not a threshold.
**Hardware:** front sonar.
**Constraint:** overshoot and oscillation; the lead robot's speed changes.
**Reference:** Car Following with a Fixed Distance (Case 10).

### B5. Wall-Follow ⭐⭐⭐ [Challenge] *(needs purchase)*
**Teach:** keep a constant distance from a wall on one side.
**Hardware:** a *side*-mounted distance sensor (second sonar or IR) — see
Purchases.
**Constraint:** turns the easy "stop before the wall" into a continuous
steering-to-distance problem.

### B6. Triggered Routine ⭐⭐ [Lesson]
**Teach:** rung 3 — a button starts an autonomous action that runs to completion,
then hands control back.
**Hardware:** any sensor + a button clause.
**Constraint:** how does the routine know it's *done*? How does the driver regain
control cleanly?
**Ladder:** the bridge from button-actions to autonomy, using the joystick as the
"go" button.

---

## C. Games (teleoperation & head-to-head)

Games test skills under pressure and are multi-student. They lean on driving skill
and the attachments from track A; some add the feedback channel.

### C1. Gate Course / Time Trial ⭐ [Game]
Drive a gated course against the clock. The foundation cap. Constraint discovered:
open-loop turning is imprecise — which seeds the whole "why we need sensors" arc.

### C2. Ball Haul Race ⭐⭐ [Game]
Two+ robots, each with a gripper, race to move balls from holders into goals.
Tests A2 under time pressure and contact. The first game where built attachments
decide the outcome.

### C3. Robot Soccer ⭐⭐⭐ [Game]
The Football Game Kit structure — coin toss, timed match, penalty shootout — run
with *your* foam balls, Lego pushers, and holders as goals. Multi-student, team
play. This is the showcase game.
**Reference:** Football Game Kit case library (coin toss / official competition /
penalty shootout) for rules, field, and roles.

### C4. Sumo / King of the Hill ⭐⭐⭐ [Game]
Push or flip the opponent out of a ring, or hold a center zone. Tests A3 (flipper)
and driving. Discrete matches, bracket tournament.
**Reference:** Combat Cart 1–4 (Cases 26–29) for mechanism ideas.

### C5. Capture-the-Flag / Tag ⭐⭐⭐ [Game]
Carry an object to a base, or "tag" by bump. Uses radio between robots and the
feedback channel (below) to register hits.

### C6. Driver-Blind Relay ⭐⭐⭐ [Game]
The driver can't see the playing surface directly and must rely on signals sent
*back* to the joystick (see D1). Forces the feedback module into a real use.

### C7. Synchronized Robot Dance ⭐⭐ [Game]
Joystick buttons trigger dance moves (triggered routines); a group of students
perform a choreographed, synchronized dance together. A performance showcase rather
than head-to-head play — high engagement, and it ties button-authoring to teamwork.

---

## D. Communication & feedback track

This is the course's custom advantage — the bidirectional radio link — and the one
place students touch the joystick code.

### D1. Feedback to the Joystick ⭐⭐ [Lesson]
**Teach:** the robot can send state *back* — rumble on a hard bump, an icon when
the sonar trips, a color when the gripper closes.
**Hardware:** bidirectional radio; A/B handlers already send tone+image as a
worked example.
**Constraint:** you can't drive well by line-of-sight alone; the driver needs a
channel. This is the only module that edits both the robot *and* the joystick.

### D2. Robot-to-Robot Radio ⭐⭐⭐ [Challenge]
**Teach:** robots coordinate directly — a relay handoff, or a shared "start" signal.
**Constraint:** message collisions, knowing whose message is whose (radio groups).
**Reference:** the catalog's relay-transport / multi-robot patterns.

### D3. Accelerometer / Tilt Steering ⭐⭐ [Lesson]
**Teach:** an input doesn't have to be a button — tilt the controller to drive.
**Hardware:** controller micro:bit accelerometer.
**Constraint:** mapping a 0–1024 analog range to motor speed; dead zones.
**Reference:** Accelerometer Remote (Case 12). A gentler on-ramp to the
analog-input math behind the advanced motor-mixing module.

---

## E. Optional / decorative lessons

Short, high-engagement, low-dependency — good warmups, fast-finisher tasks, or
showcase polish. Not on the critical path.

### E1. Headlight Personality ⭐ [Lesson]
Use the light clauses for expression — victory colors, team colors, a "ready"
signal. Trivial code, immediate visible payoff; doubles as a gentle intro to the
dispatch structure.

### E2. Horn & Sound Effects ⭐ [Lesson]
The onboard buzzer for a horn or a goal-scored jingle. Maps a button to sound.

### E3. Figure-Eight / Precision Driving Drill ⭐ [Challenge]
Drive a figure-eight or a tight pattern by hand for control practice; later,
program it as a triggered routine.
**Reference:** Dance in Figure-of-eight (Case 03).

---

## Suggested sequence through the modular phase

Ordered by dependency, not mandatory — the modular phase is meant to be picked
from. A short tech club might run **Foundation → A1 → A2 → C2**. A full course
runs most of it.

1. **Foundation** — pair-and-drive (C1 caps it), then A1 (calibrate a servo).
2. **A2 / A3** — build a gripper or flipper; first attachment students own.
3. **C2** — Ball Haul Race; attachments decide outcomes.
4. **B1 → B2 → B3** — sensors enter; line-follow code to break-and-fix.
5. **D1** — feedback link; the custom-radio advantage.
6. **C3** — Robot Soccer; the showcase.
7. **B6 / C4 / C5** — triggered routines and head-to-head games.
8. **A6 + advanced motor-mixing (ladder rung 3)** — fabrication and full control,
   for camps/sites and self-selecting students.

---

## Purchases worth considering

- **More servos** — gripper and flipper both want S1, so spare/replacement servos
  per station are worth stocking. (A second servo on S2 is *not* planned — hard to
  mount on the Cutebot.)
- **A side-mounted distance sensor (second sonar or IR)** — turns "stop before the
  wall" into wall-follow (B5), a meaningfully harder challenge.
- **Football Game Kit field/goals** — if you want a turnkey soccer setup rather
  than building goals from the holders.
- **Skip for now: the AI Lens (camera).** Big jump in complexity; pulls focus from
  the mechanical-design ethic that is the course's differentiator.

---

## One decision to pin down

For each headline challenge, decide whether students get the ElecFreaks reference
code as a **starting point to break and fix** (faster, scaffolded) or write the
capability **from scratch** (slower, more honest discover-the-constraint). The
spec's productive-struggle stance points toward *from scratch for the headline
challenges* (the gripper calibration, the line-follow failure, the motor mixing)
and *break-and-fix for the plumbing* (basic drive, sound, lights). Naming this per
module keeps the difficulty curve deliberate instead of accidental.
