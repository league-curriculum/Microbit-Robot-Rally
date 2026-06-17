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

- **Frame** — students are given the goal/scenario for a challenge (and, where it
  fits, a user or stakeholder it serves) and state in their own words what the
  robot needs to do. They do not have to invent the problem.
- **Design** — students sketch/plan two or three approaches, pick one, and say
  why (including why not the others).
- **Build** — students build and program the capability with the kit on hand.
- **Iterate** — students test, observe what the robot actually does, find what
  doesn't work, change it, and test again. **Failure is treated as information,
  not something to hide** — a test that doesn't work is the most useful event in
  the cycle. Build and Iterate trade off continuously; they are not separate
  sessions.

### The Engineering Notebook (core artifact)
Especially in longer classes, every student keeps a **pocket-sized engineering
notebook** and uses it throughout Build and Iterate. It is the concrete form of
the Iterate phase and the habit the course is really teaching:

- **Observe** — write down what the robot actually does ("it turns too far left
  on the line").
- **Diagnose** — name the issue or what went wrong.
- **Plan** — document the change to try next, then test it.

Entries are short and frequent (picture-and-sentence is fine). The notebook is a
running log of observation → issue → planned change → result, and it is the
elementary/junior-high seed of the engineering handbook that grows with the
student across the K–12 arc. It also supplies the natural prompts a facilitator
(or an AI interview assistant) asks: "What did the robot do?" "Why three turns
instead of one?" "What went wrong the first time, and what did the test tell you?"

### Course Structure: Sequence, Then Modular
- **Foundation sequence (required, fixed order).** Every class runs the same
  opening progression so all students share a baseline before branching:
  1. **Drive Day** — students immediately drive pre-loaded robots with the
     Joystick:bit. No coding yet; the goal is engagement and a feel for the
     system (robot, controller, radio link).
  2. **Meet the Micro:bit** — the microcontroller, the MakeCode editor, the LED
     display and buttons, and a first program.
  3. **Make It Move** — programming the Cutebot's motors and basic driving in
     code; students reproduce in code what the joystick did for them on Drive Day.
- **Modular phase (flexible order).** After the foundation, students and
  instructors pick among self-contained modules (sensors and line-following,
  radio/IR communication, attachments and 3D-printed parts, and the competitive
  games). Each module declares its prerequisites so the flexible ordering stays
  coherent.

### Module Shape: the Spine, Capped by a Game
Each module runs one turn of the engineering spine and ends in play:
1. **Frame** — pose the challenge/goal (e.g., "follow the line without
   overshooting"); students restate what's needed.
2. **Design** — students plan an approach in the notebook before coding.
3. **Build** — a short guided build introduces one capability, then students
   apply it.
4. **Iterate** — test, observe, diagnose, and revise using the notebook;
   repeat until it works.
5. **Game** — a mini contest or rally (race, obstacle, tag, capture-the-flag)
   that pressure-tests the capability, motivates iteration, and serves as the
   showcase.

### Grouping & Hardware
- **One robot per student.** Each student has their own Micro:bit, Cutebot, and
  Joystick:bit, maximizing hands-on time and individual ownership of the code.
- Competitive games are multi-student activities, so individually-built robots
  come together for team and head-to-head play.

### Classroom Norms (from existing practice)
- **Start stripped.** Students begin with a bare robot and earn/add attachments,
  so they understand each part they add.
- **Ready-together rule.** No one runs their robot until most of the class (≈3/4)
  is ready — this turns faster students into helpers and builds a collaborative
  room.
- **Color-coded devices.** Marked Micro:bits indicate their loaded program
  (e.g., red = Joystick, blue = Robot); a separate unmarked set is reserved for
  student reprogramming so the demo fleet stays intact.

### Instructor Role (Facilitator, Low-Staff)
- The instructor circulates, asks the notebook's guiding questions, and unblocks
  rather than demonstrating every step from the front.
- Documentation and in-lesson hints carry the explanatory load, keeping the model
  viable with few staff and enabling peer-to-peer help.

### Differentiation
- The foundation sequence guarantees a shared floor; the modular phase provides
  the ceiling, letting faster students take on more or harder modules while others
  consolidate.
- Open-ended challenges, the iterate loop, and the games all support multiple
  levels of solution sophistication.

## Research Summary
TBD

## Alignment Decision
TBD

## Course Structure Outline
TBD

## Assessment Plan
TBD

## Technical Decisions
TBD
