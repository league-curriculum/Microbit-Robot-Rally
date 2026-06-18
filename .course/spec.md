# Curik Course Specification

## Course Concept
**Micro:bit Robot Rally** is a robotics-and-engineering course for middle-school
students (grades 6–8) that teaches programming and robotics through the BBC
Micro:bit, the Elecfreaks Cutebot robot, and the Joystick:bit controller,
programmed in MakeCode blocks. Students build, wire, and program robots, then put
them to work in competitive "robot rally" games. The course opens with a short
required foundation sequence and then opens up into flexible, self-contained
modules.

### Audience & Prerequisites
- Primary audience: middle school, grades 6–8 (ages ~11–14).
- No prior programming experience required; the MakeCode block editor is the on-ramp.
- No prior robotics or electronics experience assumed.

### Format: Sequence, Then Modular
- **Foundation sequence (required, in order).** Every class begins the same way:
  on the first day students simply drive the robots around with the Joystick:bit
  to get hooked, then learn the core concepts — the Micro:bit and MakeCode basics
  and programming the robot to move. These early stages are a fixed progression
  because everything later depends on them.
- **Modular phase (flexible).** Once the foundations are in place, students and
  instructors choose among self-contained modules — sensors, radio/infrared
  communication, attachments, and the competitive games — in whatever order fits
  the group and the available time.
- One curriculum therefore serves both a short tech club (foundations + a couple
  of modules) and a longer course (foundations + many modules).
- Designed to run with groups; the competitive games are multi-student activities.

### Emphasis
- Robotics and engineering first: motors, sensors (line, sonar), radio and
  infrared communication, and physical attachments (including 3D-printed Technic
  parts) are central.
- Programming concepts (events, loops, variables, message passing) are taught in
  service of making the hardware do things.
- Game-based motivation: modules build toward competitive rallies — races,
  obstacle courses, tag, and capture-the-flag.

### Hardware & Tools
- BBC Micro:bit (the controller for both the robot and the joystick).
- Elecfreaks Cutebot robot; Joystick:bit handheld controller.
- 2.4 GHz radio + infrared communication via League MakeCode extensions
  (`pxt-cutebot`, `pxt-joystick`, `pxt-leagueir`, `pxt-radioext`).
- `microbit-loader` utility for bulk-flashing classroom sets of devices.

### What Students Walk Away With
- Ability to program a Micro:bit in MakeCode to read sensors, drive motors, and
  communicate over radio/IR.
- Experience building and customizing a working robot, including physical
  attachments.
- Teamwork and problem-solving developed through iterative challenges and
  competitive games.

### Distinctive Characteristics
- Built around custom League extensions that simplify robot/joystick pairing and
  inter-device communication, enabling group games not possible with stock
  firmware.
- A sequence-then-modular structure lets one curriculum serve both short clubs
  and longer courses.

## Pedagogical Model
The course is built around hands-on robotics with **productive struggle** as the
core teaching stance: students are given problems to solve and discover solutions
themselves, with documentation and hints available for the parts they cannot get
on their own. The instructor runs the room as a **facilitator**, not a lecturer,
so the model is designed to work with limited staff.

### Engineering Process Spine: Frame → Design → Build → Iterate
The course follows the League's K–12 engineering process. At grades 6–8 this is
the **junior-high spine — Frame, Design, Build, Iterate** — which the elementary
labels (Understand, Imagine, Build, Improve) feed directly into and which in turn
feeds the high-school spine (Analysis, Concept & Embodiment Design, Build,
Iterate). The motion is the same at every tier; only the labels change.

| This course (grades 6–8) | Elementary | High school |
|--------------------------|------------|-------------|
| **Frame** | Understand | Analysis (user research + requirements) |
| **Design** | Imagine | Concept + embodiment design |
| **Build** | Build | Build (with pre-build design review) |
| **Iterate** | Improve | Iterate (reflection-on-action recorded per failure) |

- **Frame** — students are given the goal/scenario for a challenge (success
  criteria + constraints) and state in their own words what the robot needs to do.
- **Design** — students sketch/plan two or three approaches, pick one, and say why.
- **Build** — students build and program the capability with the kit on hand.
- **Iterate** — students test, observe what the robot actually does, find what
  doesn't work, change it, and test again. **Failure is treated as information,
  not something to hide.** Build and Iterate trade off continuously.

### The Engineering Notebook (core artifact)
Especially in longer classes, every student keeps a **pocket-sized engineering
notebook** used throughout Build and Iterate — the concrete form of the Iterate
phase and the habit the course is really teaching:

- **Observe** — write down what the robot actually does ("it turns too far left").
- **Diagnose** — name the issue or what went wrong.
- **Plan** — document the change to try next, then test it.

Entries are short and frequent (picture-and-sentence is fine). The notebook is a
running log of observation → issue → planned change → result, and the
junior-high seed of the engineering handbook that grows across the K–12 arc.

### Teleoperation, Then Autonomy (the control progression)
The joystick is the **command layer, not training wheels** — the course never
"moves away" from it. Autonomy is layered *underneath* the joystick across four rungs:
1. **Pure teleop** — drive it.
2. **Teleop + actuator** — drive, and press a button to grip / flip / lift.
3. **Teleop + triggered routine** — a button starts a pre-programmed autonomous
   action that runs to completion, then hands control back.
4. **Autonomy with joystick override** — the robot acts on its own, but the human
   keeps "go," "stop," and "do task N" buttons.

Keeping start/stop on the joystick is a deliberate control-and-safety decision (a
fully autonomous robot that won't stop is chaos in a room of twelve kids) and
mirrors how real field robots work — a stronger story than "play first, then
graduate to coding."

### The Authorship Surface (the starting scaffold, not a cage)
Students **begin** with one provided file — the Cutebot receiver, a self-labeling
dispatch skeleton with teleoperation and decoupled driving already wired. It is a
forgiving on-ramp, **not a restriction**: it gets every student driving and
authoring within minutes, and they are free to ignore the pattern, add their own
code, or throw the whole program out and write their own. As students move toward
autonomy, they increasingly do exactly that.

Three properties make the *starting* skeleton forgiving for productive struggle:
- **Driving is decoupled and unbreakable** — motor control runs on every radio
  message, *outside* the button if/else, so editing a button clause can't break
  driving.
- **Lights are labels, not decoration** — each button sets a headlight color, so a
  student sees which clause a button maps to without reading code; the same light
  is a free breakpoint when debugging.
- **Two worked slots, two empty** — buttons D/E demonstrate "set a light, then call
  a robot action" (close/open gripper); C/F are labeled empty slots awaiting the
  student's first code.

By default students work on the **receiver (robot behavior)** and leave the
**transmitter (joystick protocol)** alone, so pairing stays intact while they get
started — a sensible default, not a hard boundary. (The bidirectional-feedback
module deliberately edits both sides.)

### The Authorship Ladder (scaffolding fades as students climb)
Students begin by **modifying provided code** and progressively write **more
original code** — the scaffold fades along a deliberate ladder:
1. **Copy a pattern into an empty slot** — put a named action (e.g., a gripper
   call) on an empty button and change its light. Pure pattern-match; reachable in
   the first minute of programming.
2. **Swap a custom servo and calibrate its limits** — a student's own attachment
   breaks the stock open/close values, so they drop to raw servo angles and *find*
   the numbers by observing and adjusting. The first real Frame→Design→Build→Iterate loop.
3. **(Advanced, optional) Crack open motor mixing** — replace the one drive line
   with their own arithmetic on the stick values (forward ± turn, then clamp). The
   first code that *computes* on inputs rather than mapping a button to an action.

So **break-and-fix dominates early** (plumbing: basic drive, lights, sound) and
**from-scratch authoring dominates the advanced headline challenges** (servo
calibration, line-following, motor mixing). The trajectory *is* the difficulty curve.

### Course Structure: Sequence, Then Modular
- **Foundation (required, short, concrete).** Every class starts the same way, and
  it is deliberately shorter and more concrete than a generic
  "meet-the-microcontroller" intro:
  1. **Pair & Drive** — robots ship pre-flashed; students pair the joystick and
     drive. No MakeCode, no flashing — engagement and a feel for the system first.
  2. **First program + first build** — students open the receiver and copy the
     gripper pattern into an empty button slot (their first program — and where
     they meet MakeCode and the micro:bit), then build/mount an attachment and
     program/calibrate its servo.
- **Modular phase (flexible order).** After the foundation, students and
  instructors pick among tracks — Attachments & Actuators (the spine), Sensing &
  Autonomy, Games, Communication & Feedback, and optional warmups — each module
  declaring its prerequisites. See the Course Structure Outline for the catalog and
  suggested sequence.

### Module Shape: the Spine, Capped by a Game
Each module runs one turn of the engineering spine and ends in play:
1. **Frame** — pose the challenge as success criteria + constraints.
2. **Design** — plan an approach in the notebook before coding.
3. **Build** — introduce one capability, then apply it (modifying provided code
   early in the course, authoring from scratch later).
4. **Iterate** — test, observe, diagnose, and revise using the notebook.
5. **Game** — a mini contest or rally that pressure-tests the capability and
   serves as the showcase.

### Discovery-Driven, Just-in-Time Lessons
Most techniques in this course are **discoveries**, not front-loaded instruction.
Students are engaged in a build, challenge, or game, and a skill is taught at the
moment they hit the need for it — when the robot won't yet do what they want. Lesson
titles name the *activity* the student is doing ("Add a Servo," "Build a Gripper"),
and the underlying technique (calibration, conditionals, radio messages) is
introduced in context when the need surfaces — the productive-struggle logic applied
to *what* is taught, not just *how* the instructor helps.

### Grouping & Hardware
- **One robot per student.** Each student has their own Micro:bit, Cutebot, and
  Joystick:bit, maximizing hands-on time and individual ownership of the code.
- Competitive games are multi-student, so individually-built robots come together
  for team and head-to-head play.

### Classroom Norms (from existing practice)
- **Start stripped.** Students begin with a bare robot and earn/add attachments.
- **Fast finishers help and share.** Students who get ahead are recruited to help
  others and to share their ideas and approaches with the class — peer teaching,
  not a gate on running.
- **Legibility through visible state.** Color-coded devices (red = joystick, blue =
  robot) and the receiver's label-lights make an invisible system readable to a kid
  who can't yet read the code — which is what makes the struggle survivable.

### Instructor Role (Facilitator, Low-Staff)
- The instructor circulates, asks the notebook's guiding questions, and unblocks
  rather than demonstrating every step. Scaffold *after* a genuine attempt and
  impasse; lead with questions; normalize failure.
- Documentation and in-lesson hints carry the explanatory load, keeping the model
  viable with few staff and enabling peer-to-peer help.

### Differentiation
- The foundation guarantees a shared floor; the modular phase and the authorship
  ladder provide the ceiling. Open-ended challenges, the iterate loop, and the
  games all support multiple levels of solution sophistication.

## Research Summary
Phase 1c research covered three tracks: standards alignment, existing curricula
and resources, and pedagogy + certifications. Full findings (with sources/URLs)
are in `.course/research/standards-alignment.md`, `existing-curricula.md`, and
`pedagogy-and-certs.md`. Highlights below; the alignment decision itself is made
in Phase 1d.

### Standards Alignment Candidates
- **CSTA K-12 CS Standards, Level 2 (grades 6–8) — recommended primary.** The
  Algorithms & Programming strand fits strongly: 2-AP-13 (decompose) and 2-AP-17
  (systematically test & refine) *are* the Frame/Design and Iterate phases;
  2-AP-11/12 (variables; nested loops & compound conditionals) cover line-following,
  driving, and game logic; 2-AP-16 (use existing libraries with attribution) maps
  to the League extensions. Also 2-CS-02/03 (hardware+software projects; systematic
  troubleshooting). Most granular and most state-adopted; gives lesson-level claims.
  Precedent: micro:bit Foundation ships a CSTA-aligned "Intro to CS" course.
- **NGSS MS-ETS1 (middle-school engineering design) — recommended co-primary.**
  Frame → Design → Build → Iterate + the engineering notebook map almost 1:1 onto
  MS-ETS1-1…-4; MS-ETS1-4 (model → generate data → iterative testing/modification)
  is the single tightest fit. Pairing CSTA (what they program) with NGSS-ETS1 (how
  they engineer) covers both halves of the course's identity.
- **ISTE Standards 4 (Innovative Designer) & 5 (Computational Thinker)** and the
  **K-12 CS Framework practices** (esp. 2, 3, 5, 6) — strong as a cross-cutting
  disposition lens, but not content-granular; use as secondary framing.

**Standards gaps (typical for hands-on robotics):** Impacts of Computing
(2-IC-20/21/22: ethics, careers) is out of scope; Networks security (2-NI-05/06)
not covered — the radio/IR module models device-to-device *protocols*, not the
Internet. Cheap upgrades that raise coverage: require parameterized MakeCode
functions (2-AP-14) and in-code comments (2-AP-19); add explicit criteria/
constraints rubrics and a class-wide comparison of test data to fully unlock
MS-ETS1-2/-3; an "encrypt your radio messages" twist would touch 2-NI-06.

### Existing Resources — Link vs Adapt
Key conflict: every external robot example uses **stock** extensions, so **no
robot code is directly linkable** — all robot resources are **Adapt** (reuse the
sequence/framing, rewrite code against `pxt-cutebot`/`pxt-joystick`/`pxt-leagueir`/
`pxt-radioext`). Only pure-Micro:bit, no-robot resources are conflict-free.

Most useful (all Adapt unless noted):
- **Elecfreaks Cutebot Wiki — 15 MakeCode cases** — best structural match (driving,
  line-follow, obstacle-avoid, radio remote, Joystick:bit remote, IR remote).
  Mirror the sequence; rewrite the code.
- **MakeCode "Intro to CS" + standalone Radio course** (grades 6–8, free) — gold
  standard for foundation concepts and the radio module (groups/channels,
  send/receive, "Marco Polo").
- **micro:bit Foundation "First Lessons with MakeCode"** — near 1:1 for "Meet the
  Micro:bit"; no extension conflict.
- **Elecfreaks Cutebot Football Game Kit** — only existing competition analog for
  Robot Rally Games.
- **Kitronik :MOVE** and **Raspberry Pi Foundation** projects — comparison/
  scaffolding models (RPi's Explore→Design→Invent parallels our spine).

**Per-module external coverage:** Meet the Micro:bit / Make It Move / Sensors &
Line-following — High. Radio comms — High (concept). Drive Day — Medium. IR comms
— Medium-low. Attachments & 3D parts — ~None. Robot Rally Games — Low.

**Author-original (no external curriculum exists):** `pxt-leagueir` IR
device-to-device messaging; the Robot Rally Games; Attachments & 3D-printed Technic
parts; the Drive-Day "hook-first" onboarding; and the engineering-notebook spine.

### Pedagogy Takeaways (to bake into lessons)
- Adopt the **Oregon "Design It! Middle School" notebook structure** (state-published,
  NGSS MS-ETS1-aligned): short one-line prompts + grid sketch pages. Map our
  Observe → Diagnose → Plan → Result loop onto its Test → Evaluate → Improve sections.
- **Frame every challenge as success criteria + constraints** (e.g., "follow the
  line without overshooting," one robot, class time) — makes the Iterate loop
  measurable and is the NGSS "define the problem" move.
- **Embed reflection continuously** during Build/Iterate (not a terminal write-up);
  explicitly name a failed test as the most useful data.
- **Codify just-in-time hinting** (strongest finding for the facilitator model):
  open tasks with multiple valid paths, scaffold *after* a genuine attempt and
  impasse, lead with questions, normalize failure. Recruiting fast finishers to
  help and share their ideas is a legitimate peer-coaching structure.
- **Assess with the notebook (process) + the module Game (showcase) as a pair**,
  plus a quick "explain your robot" so reasoning/trade-offs are assessed — not a
  written test.
- **Self-contained modules with explicit prerequisites** is the recognized pattern
  that lets one curriculum serve both a short club and a long course.

### Certification Verdict
**No formal credential exists** for micro:bit/MakeCode/middle-school robotics
(nothing comparable to PCEP — confirmed). Nearby options are participation-based:
the Micro:bit Foundation **"do your :bit"** challenge and MakeCode **skillmap
badges**. Recommendation: award an **internal course completion badge**, optionally
hook into "do your :bit," and name **VEX IQ / FIRST LEGO League** (competitions)
and **PCEP / Certiport IT Specialist – Python** (text-coding) as downstream
pathways — but do not promise a formal certification.

## Alignment Decision
**Decision:** the course aligns to a **dual primary target** — **CSTA K-12 CS
Standards, Level 2 (grades 6–8)** for the computing content and **NGSS MS-ETS1
(middle-school engineering design)** for the engineering process — with **ISTE
Standards 4 & 5** and the **K-12 CS Framework practices** as a secondary
cross-cutting lens. This pairing reflects the course's two halves: *what students
program* (CSTA) and *how they engineer* (NGSS-ETS1 + the engineering notebook).

### Primary Alignment Targets
- **CSTA L2, Algorithms & Programming (anchor strand):** 2-AP-11 (variables),
  2-AP-12 (nested loops & compound conditionals), 2-AP-13 (decompose), 2-AP-16
  (use libraries with attribution), 2-AP-17 (systematically test & refine).
  Plus 2-CS-02/03 (hardware+software projects; systematic troubleshooting) and a
  partial 2-NI-04 (protocols, via radio/IR).
- **NGSS MS-ETS1:** MS-ETS1-1 (define a problem with criteria & constraints),
  MS-ETS1-2 (evaluate competing solutions), MS-ETS1-3 (analyze test data to
  improve), MS-ETS1-4 (model → generate data → iterate). MS-ETS1-4 is the tightest
  single fit and is carried by the Iterate loop + engineering notebook.

### Secondary Lens
- **ISTE 4 (Innovative Designer)** and **5 (Computational Thinker)** describe the
  course's dispositions; **K-12 CS Framework practices 2, 3, 5, 6** frame the
  cross-cutting skills. Used for framing, not lesson-level claims.

### Topic List (aligned to modules)
| Module | Topics | Standards hit |
|--------|--------|---------------|
| Drive Day | system overview, radio link, robot control feel | (engagement; sets up MS-ETS1-1) |
| Meet the Micro:bit | microcontroller, MakeCode, display/buttons, events, first program | 2-AP-11, 2-CS-02 |
| Make It Move | motors, sequencing, loops, basic driving in code | 2-AP-11/12, 2-CS-02 |
| Sensors & Line-following | line/sonar sensors, conditionals, calibration, test-refine | 2-AP-12/17, 2-CS-03, MS-ETS1-3/-4 |
| Radio & Infrared Comms | radio groups/channels, IR send/receive, message protocols | 2-AP-16, 2-NI-04 (partial), 2-CS-02 |
| Attachments & 3D Parts | mechanisms, build/iterate physical design | MS-ETS1-1/-2/-4 |
| Robot Rally Games | game logic, strategy, multi-device play, competition | 2-AP-12/13/17, MS-ETS1-2/-3 |

### Coverage Upgrades Adopted
To strengthen alignment at low cost, the course will:
- Require **parameterized MakeCode functions** (→ 2-AP-14) and **in-code comments /
  block annotations** (→ 2-AP-19).
- Use explicit **criteria & constraints rubrics** and a **class-wide comparison of
  test data** in challenges (→ fully unlocks MS-ETS1-2/-3).

### Explicitly Out of Scope (honest coverage)
- **Impacts of Computing** (2-IC-20/21/22 — ethics, careers, crowdsourcing): not a
  goal of this course.
- **Network security** (2-NI-05/06): the comms module models device-to-device
  *protocols*, not Internet security. (Optional enrichment: an "encrypt your radio
  messages" twist touches 2-NI-06.)

### Credential Stance
No formal certification exists for this space. The course awards an **internal
completion badge**, may hook into the Micro:bit Foundation **"do your :bit"**
challenge, and names **VEX IQ / FIRST LEGO League** (competitions) and **PCEP /
Certiport IT Specialist – Python** (text coding) as downstream pathways. It does
not promise a formal credential.

## Course Structure Outline
The course is a short required **Foundation** followed by a **modular phase**
organized into five tracks. Activities are tagged **[L]** lesson (teach a
capability), **[C]** challenge (one robot vs. a problem), or **[G]** game
(multi-student, head-to-head). Difficulty: ⭐ entry · ⭐⭐ intermediate · ⭐⭐⭐
advanced. Full activity detail (constraints, hardware, ElecFreaks references) is in
`.course/research/robot-rally-activities.md`.

### Foundation (required, ~3 hours, in order)
- **Pair & Drive** [L] ⭐ — pair the pre-flashed joystick and robot and drive; no
  code. Capped by **Gate Course / Time Trial** (C1) [G] ⭐, whose imprecise
  open-loop turning seeds the "why we need sensors" arc.
- **First Program — Author a Button** [L] ⭐ — open the receiver and copy a pattern
  into an empty slot (C/F): make a button close the gripper, play a sound, flash an
  image, trigger a dance move, change its light — whatever they like. First contact
  with MakeCode and the dispatch skeleton.
- **Calibrate Your Servo** (A1) [L] ⭐ — mount a student-built attachment; the stock
  open/close angles don't fit, so find the values. First real Frame→Design→Build→
  Iterate loop and the gateway to the spine.

### Track A — Attachments & Actuators (the spine)
- **A2 · Build a Gripper, Pick Up the Ball** [C] ⭐⭐ — claw geometry; timed
  lift-carry-release of a foam ball.
- **A3 · Build a Flipper** [C] ⭐⭐ — get under the opponent; throw/timing beat speed.
- **A5 · Front-Wheel Lift / Wall Climber** [C] ⭐⭐⭐ — a servo changes the robot's
  geometry; center-of-mass timing.
- **A6 · 3D-Print a Custom Attachment** [C] ⭐⭐⭐ *(camps / permanent sites)* — full
  fabrication loop; the attachment-track capstone.

### Track B — Sensing & Autonomy
Students program **autonomous behaviors** — e.g., "drive to a line" or "open the
gripper and drive forward" — so the robot can tackle a section of a playfield on
its own, without the joystick driving it (the triggered-routine and autonomy rungs).
- **B1 · Stop at the Edge** [L] ⭐ — reflectance sensors trigger an action.
- **B2 · Line Follow** [L] ⭐⭐ — steer to stay centered; given as code to break-and-fix.
- **B3 · Don't Crash (Sonar Stop)** [L] ⭐⭐ — distance threshold.
- **B4 · Convoy / Car-Following** [C] ⭐⭐⭐ — hold a fixed distance (a control problem).
- **B5 · Wall-Follow** [C] ⭐⭐⭐ *(needs side sensor)* — continuous steer-to-distance.
- **B6 · Triggered Routine** [L] ⭐⭐ — rung 3: a button runs an autonomous action,
  then returns control to the driver.

### Track C — Games (multi-student, head-to-head)
- **C1 · Gate Course / Time Trial** [G] ⭐ — the foundation cap (above).
- **C2 · Ball Haul Race** [G] ⭐⭐ — gripper race; first game where attachments decide.
- **C3 · Robot Soccer** [G] ⭐⭐⭐ — Football-kit structure (coin toss, match, penalty
  shootout); the showcase game.
- **C4 · Sumo / King of the Hill** [G] ⭐⭐⭐ — push/flip out of a ring; bracket tournament.
- **C5 · Capture-the-Flag / Tag** [G] ⭐⭐⭐ — uses robot-to-robot radio + the feedback channel.
- **C6 · Driver-Blind Relay** [G] ⭐⭐⭐ — forces the feedback channel into real use.
- **C7 · Synchronized Robot Dance** [G] ⭐⭐ — joystick buttons trigger dance moves
  (triggered routines); a group of students perform a choreographed, synchronized
  dance together. A performance showcase rather than a head-to-head game.

### Track D — Communication & Feedback (the custom-radio advantage)
- **D1 · Feedback to the Joystick** [L] ⭐⭐ — robot sends state back (rumble / icon /
  color); the only module that edits the joystick side.
- **D2 · Robot-to-Robot Radio** [C] ⭐⭐⭐ — robots coordinate; radio groups, collisions.
- **D3 · Accelerometer / Tilt Steering** [L] ⭐⭐ — analog input → motor speed; on-ramp
  to the motor-mixing math.

### Track E — Optional / Warmups (off the critical path)
- **E1 · Headlight Personality** [L] ⭐ · **E2 · Horn & Sound Effects** [L] ⭐ ·
  **E3 · Figure-Eight Precision Drill** [C] ⭐.

### Suggested Sequences (ordered by dependency, not mandatory)
- **Short tech club:** Foundation → A2 → C2.
- **Full course:** Foundation → A2 / A3 → C2 → B1 → B2 → B3 → D1 → C3 → B6 / C4 / C5
  → A6 + advanced motor-mixing (for camps and self-selecting students).

## Assessment Plan
Assessment is **portfolio- and performance-based**, not a written test — it mirrors
how engineers are actually judged and fits the productive-struggle stance.

### What's Assessed
- **The engineering notebook (process).** The running Observe → Diagnose → Plan →
  Result log is the primary evidence of engineering thinking. Assessed for the
  *habit* — frequent, honest entries; failed tests recorded as data — not neatness.
- **The module game / challenge (performance).** Each module ends in a game or timed
  challenge that pressure-tests the capability — the authentic demonstration that
  it works.
- **"Explain your robot" (reasoning).** A short verbal or recorded explanation of
  what they built, why, and what a failed test told them — so reasoning and
  trade-offs are assessed, not just who won the race.

### Framing Challenges So Success Is Measurable
Every challenge is stated as **success criteria + constraints** ("follow the line
without overshooting"; one robot; class time). This is the NGSS "define the
problem" move (MS-ETS1-1) and makes the Iterate loop measurable. Where useful, the
class compares solution test data side by side (MS-ETS1-2 / -3).

### Progression of Independence
Scaffolding fades along the authorship ladder: early work is **modify-provided-code**
(break-and-fix), advancing to **original authoring** on headline challenges.
Assessment expectations rise with it — early modules credit correct modification and
careful observation; advanced modules credit original design decisions and iteration.

### Differentiation
Open-ended challenges and games admit multiple levels of solution sophistication, so
the same task fairly assesses a range of students. Grade-appropriate stretch (e.g., a
sentence on what a test revealed, or attempting a motor-mixing rewrite) is expected of
stronger students.

### Credential
No formal external certification exists for this space. The course awards an
**internal completion badge** based on the notebook + game + explanation, and may
hook into the Micro:bit Foundation **"do your :bit"** challenge. Downstream pathways:
**VEX IQ / FIRST LEGO League** (competitions) and **PCEP / Certiport IT Specialist –
Python** (text coding). The course does not promise a formal credential.

## Technical Decisions
### Hardware
- **BBC Micro:bit v2 only** (speaker, mic, touch logo, more memory). Two per student
  station: one in the Cutebot (robot/receiver), one in the Joystick:bit
  (controller/transmitter).
- **Elecfreaks Cutebot** robot and **Joystick:bit** controller.
- **One robot per student**; competitive games bring individual robots together.
- **Color-coded device fleet** (red = joystick, blue = robot), with a separate
  unmarked set reserved for student reprogramming so the demo fleet stays intact.

### Software & Programming
- **MakeCode blocks**, **online editor** (makecode.microbit.org) in a browser;
  flashing over **WebUSB**. The offline MakeCode app is the fallback for
  low-connectivity rooms.
- **League MakeCode extensions:** `pxt-cutebot` (robot), `pxt-joystick` (controller),
  `pxt-radioext` (radio packets / channels / pairing), `pxt-leagueir` (infrared). All
  robot work targets these, not the stock extensions — so external robot examples are
  *adapted/rewritten*, never linked as-is.
- **Pre-flashed start.** Robots and joysticks ship with a joystick **transmitter**
  program and a matching **receiver** program. Students edit the **receiver** — a
  self-labeling dispatch skeleton — while the transmitter is fixed (except the D1
  feedback module). Driving is decoupled from the button clauses so it can't be
  broken.
- **Bulk flashing** of the device fleet via the **`microbit-loader`** utility (loads
  the stock transmitter/receiver hex onto many devices at once).

### Code Saving & Sharing
- Students save and share via **MakeCode "Share" links** (URLs), as the old Programs
  page did — simplest for grades 6–8 and easy to collect for the showcase. No GitHub
  workflow at this level.

### Site & Hosting
- The curriculum site is **Hugo** (in `site/`, using the curriculum theme), built and
  deployed to **GitHub Pages** via the repo's GitHub Actions workflow. The old Jekyll
  site is sequestered in `_old/` as reference material only.

### Equipment Notes / Purchases
- **More servos** — a gripper and a flipper both want S1, so spare/replacement
  servos per station are worth stocking. (A second servo on S2 is *not* planned —
  it's hard to mount on the Cutebot.)
- **A side-mounted distance sensor** (second sonar or IR) unlocks B5 (wall-follow).
- **Football Game Kit** field/goals for a turnkey soccer setup (C3).
- **Skip for now: the AI Lens (camera)** — a large complexity jump that pulls focus
  from the mechanical-design ethic that is the course's differentiator.
