# Standards Alignment Research — Micro:bit Robot Rally

Phase 1c research output. Maps the course (grades 6–8, MakeCode blocks, Micro:bit +
Cutebot + Joystick:bit; foundation sequence then modular units; Frame → Design →
Build → Iterate spine + engineering notebook) to recognized K–12 standards.

Scope note: this course is a **robotics/engineering + intro-CS** course taught in
**block-based MakeCode**. It is strong on algorithms/programming fundamentals,
physical computing (hardware/software systems), wireless communication, and the
engineering-design cycle. It is intentionally light on text languages, the
public Internet, data science, and computing-ethics/society content.

---

## Sources

| URL | Title | Relevance |
|-----|-------|-----------|
| https://csteachers.org/wp-content/uploads/2025/03/csta-k-12-computer-science-standards-revised.pdf | CSTA K-12 CS Standards, Revised 2017 (full PDF, verbatim Level 2 text used here) | High |
| https://csteachers.org/k12standards/interactive/ | CSTA K-12 Standards — interactive viewer & identifier scheme | High |
| https://k12cs.org/ | K-12 Computer Science Framework (5 core concepts, 7 core practices) | High |
| https://www.nextgenscience.org/dci-arrangement/ms-ets1-engineering-design | NGSS MS-ETS1 Engineering Design (PEs, SEPs, DCIs) | High |
| https://www.nextgenscience.org/pe/ms-ets1-1-engineering-design | NGSS MS-ETS1-1 performance expectation page | High |
| https://www.nextgenscience.org/pe/ms-ets1-4-engineering-design | NGSS MS-ETS1-4 performance expectation page | High |
| https://iste.org/standards/students | ISTE Standards for Students (2016, the seven standards + sub-standards) | High |
| https://makecode.com/blog/microbit/csintro-educator | Intro to CS with the micro:bit — official MakeCode course, CSTA-aligned + Standards Alignment Guide | Med |
| https://www.scribd.com/document/517505631/Standards-alignment-guide-Intro-to-CS-MakeCode-microbit | "Standards Alignment Guide – Intro to CS MakeCode microbit" (Prime 8 Consulting / MakeCode; maps the 12-unit course to CSTA) | Med |
| https://makecode.microbit.org/courses/csintro | Intro to CS course landing (lessons mapped to CSTA K-12 Standards) | Med |
| https://ospi.k12.wa.us/sites/default/files/2022-12/cs-standards-6-8.pdf | WA OSPI grades 6–8 CS standards (CSTA Level 2, state-adopted; cross-check) | Med |

Notes on micro:bit-specific mapping: micro:bit Foundation / Microsoft MakeCode
publish an official "Intro to CS with the micro:bit" course (authored by Douglas
& Mary Kiang, produced by Prime 8 Consulting) that is explicitly mapped to the
CSTA K-12 Standards and ships a downloadable **Standards Alignment Guide** plus
assessment rubrics. That guide is the closest existing precedent for aligning a
Micro:bit/MakeCode course; it anchors primarily on the CSTA **Algorithms &
Programming (AP)** strand at Level 2, which is the same anchor recommended below.

---

## Frameworks at a glance

**CSTA K-12 CS Standards (Revised 2017)** — five concepts (Computing Systems;
Networks & the Internet; Data & Analysis; Algorithms & Programming; Impacts of
Computing) crossed with seven practices. Level 2 = grades 6–8. These are the most
granular, the most widely state-adopted, and the natural primary target for an
intro-CS-via-robotics course. Identifier scheme: `Level-Concept-Number`
(e.g., `2-AP-13`).

**K-12 CS Framework (k12cs.org)** — the higher-level document CSTA standards were
built from. Same 5 concepts. Seven **core practices**: (1) Fostering an Inclusive
Computing Culture, (2) Collaborating Around Computing, (3) Recognizing & Defining
Computational Problems, (4) Developing & Using Abstractions, (5) Creating
Computational Artifacts, (6) Testing & Refining Computational Artifacts,
(7) Communicating About Computing. Useful as the "practices" lens; this course
hits practices 2, 3, 5, 6 hardest.

**NGSS Engineering Design, middle school (MS-ETS1)** — four performance
expectations. Maps almost one-to-one onto the course's Frame → Design → Build →
Iterate spine and the engineering notebook. This is the engineering-science
anchor.

**ISTE Standards for Students (2016)** — seven dispositional standards. Best fit:
Innovative Designer (4), Computational Thinker (5), Empowered Learner (1), Global
Collaborator (7). Good as a secondary/disposition alignment, weak as a primary
target because it is not content-granular.

---

## CSTA Level 2 (grades 6–8) — verbatim standards + coverage

Coverage = how well this course's foundation + modules + spine hit the standard.
Course modules referenced: **DD** Drive Day, **MM** Meet the Micro:bit, **MIM**
Make It Move, **SLF** Sensors & Line-following, **RIR** Radio/IR comms, **ATT**
Attachments & 3D-printed parts, **GAMES** Robot Rally Games, **NB** engineering
notebook / Frame-Design-Build-Iterate spine (cross-cutting).

### Computing Systems (CS)

| Code | Standard (verbatim) | Modules | Coverage |
|------|---------------------|---------|----------|
| 2-CS-01 | Recommend improvements to the design of computing devices, based on an analysis of how users interact with the devices. | ATT, GAMES, NB | Partial — joystick/robot/attachment usability gets analyzed in Iterate, but "computing device" framing is implicit |
| 2-CS-02 | Design projects that combine hardware and software components to collect and exchange data. | MIM, SLF, RIR, ATT | **Strong** — the entire course is hardware+software projects; sensors collect, radio/IR exchanges |
| 2-CS-03 | Systematically identify and fix problems with computing devices and their components. | All + NB | **Strong** — notebook Observe→Diagnose→Plan is literally structured troubleshooting across robot/joystick/wiring |

### Networks & the Internet (NI)

| Code | Standard (verbatim) | Modules | Coverage |
|------|---------------------|---------|----------|
| 2-NI-04 | Model the role of protocols in transmitting data across networks and the Internet. | RIR | Partial — radio/IR pairing & message passing models device-to-device protocols; not the *Internet* per se |
| 2-NI-05 | Explain how physical and digital security measures protect electronic information. | — | **None** — no security content |
| 2-NI-06 | Apply multiple methods of encryption to model the secure transmission of information. | (RIR, optional) | **None** by default — could be a stretch add (encode/decode radio messages) but not currently in scope |

### Data & Analysis (DA)

| Code | Standard (verbatim) | Modules | Coverage |
|------|---------------------|---------|----------|
| 2-DA-07 | Represent data using multiple encoding schemes. | SLF, RIR | Partial — sensor readings, radio message values; "multiple encoding schemes" is light |
| 2-DA-08 | Collect data using computational tools and transform the data to make it more useful and reliable. | SLF, NB | Partial — line/sonar sensor data is read and acted on; notebook records observations, but little explicit data transformation |
| 2-DA-09 | Refine computational models based on the data they have generated. | SLF, GAMES, NB | **Strong** — the Iterate loop literally refines the robot's behavior/program from observed (sensor + test) data; game-balancing example in the standard mirrors GAMES |

### Algorithms & Programming (AP) — the course's core strand

| Code | Standard (verbatim) | Modules | Coverage |
|------|---------------------|---------|----------|
| 2-AP-10 | Use flowcharts and/or pseudocode to address complex problems as algorithms. | NB (Design phase), MIM, SLF | Partial→Strong — Design phase has students plan approaches before coding; formalizing as flowchart/pseudocode would lock this in |
| 2-AP-11 | Create clearly named variables that represent different data types and perform operations on their values. | MIM, SLF, RIR, GAMES | **Strong** — speed/distance variables, sensor thresholds, scores, message payloads |
| 2-AP-12 | Design and iteratively develop programs that combine control structures, including nested loops and compound conditionals. | MIM, SLF, RIR, GAMES | **Strong** — line-following (conditionals on sensor state), driving loops, game logic (compound conditions) |
| 2-AP-13 | Decompose problems and subproblems into parts to facilitate the design, implementation, and review of programs. | NB, SLF, GAMES | **Strong** — breaking a rally challenge into drive/sense/decide subproblems is the Design→Build motion |
| 2-AP-14 | Create procedures with parameters to organize code and make it easier to reuse. | MIM, SLF | Partial — MakeCode "functions" with parameters (e.g., turn(angle)) are natural but must be deliberately taught |
| 2-AP-15 | Seek and incorporate feedback from team members and users to refine a solution that meets user needs. | GAMES, NB | **Strong** — ready-together rule, peer help, competitive play surface feedback; Iterate incorporates it |
| 2-AP-16 | Incorporate existing code, media, and libraries into original programs, and give attribution. | All (League extensions) | **Strong** — the course is built on `pxt-cutebot`, `pxt-joystick`, `pxt-leagueir`, `pxt-radioext` extensions/libraries; attribution can be made explicit |
| 2-AP-17 | Systematically test and refine programs using a range of test cases. | All + NB | **Strong** — Iterate loop + game pressure-testing IS systematic test/refine; "failure as information" stance maps exactly |
| 2-AP-18 | Distribute tasks and maintain a project timeline when collaboratively developing computational artifacts. | GAMES | Partial — team games involve role distribution; "one robot per student" build is individual, so collaborative *development* is lighter |
| 2-AP-19 | Document programs in order to make them easier to follow, test, and debug. | NB, all | Partial→Strong — engineering notebook documents process; in-code comments/documentation should be required to fully hit |

### Impacts of Computing (IC)

| Code | Standard (verbatim) | Modules | Coverage |
|------|---------------------|---------|----------|
| 2-IC-20 | Compare tradeoffs associated with computing technologies that affect people's everyday activities and career options. | (optional discussion) | **None** by default — robotics/automation careers + tradeoffs would be a low-cost add but not in scope |
| 2-IC-21 | Discuss issues of bias and accessibility in the design of existing technologies. | (ATT, GAMES — optional) | **None** by default — accessibility of controls/attachments could be raised but isn't currently |
| 2-IC-22 | Collaborate with many contributors through strategies such as crowdsourcing or surveys when creating a computational artifact. | — | **None** — not applicable to this course |

(Note: at Level 2, Impacts of Computing has exactly three standards, 2-IC-20/21/22; there is no 2-IC-23 at this level.)

### CSTA Level 2 coverage tally
- **Strong:** 2-CS-02, 2-CS-03, 2-DA-09, 2-AP-11, 2-AP-12, 2-AP-13, 2-AP-15, 2-AP-16, 2-AP-17 (9)
- **Partial:** 2-CS-01, 2-NI-04, 2-DA-07, 2-DA-08, 2-AP-10, 2-AP-14, 2-AP-18, 2-AP-19 (8)
- **None / out of scope:** 2-NI-05, 2-NI-06, 2-IC-20, 2-IC-21, 2-IC-22 (5)

The course covers the **Algorithms & Programming** strand densely (9 of 10 AP
standards at strong or partial), plus the physical-computing parts of Computing
Systems and the modeling part of Data & Analysis. The systematic misses are
**Impacts of Computing** (society/ethics/careers) and the **security half of
Networks & the Internet** — exactly the strands a hands-on robotics course
typically omits.

---

## K-12 CS Framework — core practices coverage

| Practice | Coverage | Where |
|----------|----------|-------|
| 1. Fostering an Inclusive Computing Culture | Partial | "Ready-together" rule, peer helpers — inclusion in *room culture*, not in artifact design |
| 2. Collaborating Around Computing | **Strong** | Team games, peer help, ready-together rule |
| 3. Recognizing & Defining Computational Problems | **Strong** | Frame phase: students restate the challenge/goal |
| 4. Developing & Using Abstractions | Partial | Variables, functions, library blocks; could be made more explicit |
| 5. Creating Computational Artifacts | **Strong** | Every module Builds a working program/robot |
| 6. Testing & Refining Computational Artifacts | **Strong** | Iterate loop + notebook + games — the defining activity of the course |
| 7. Communicating About Computing | Partial | Notebook entries; weaker on formal communication/presentation of code |

---

## NGSS Middle School Engineering Design (MS-ETS1) — coverage

These map directly onto Frame → Design → Build → Iterate. Strong content fit;
the caveat is NGSS PEs expect explicit *criteria/constraints* and *comparing
competing solutions with data*, which the course should name to claim full
alignment.

| Code | Performance expectation (verbatim/near) | Spine phase | Coverage |
|------|------------------------------------------|-------------|----------|
| MS-ETS1-1 | Define the criteria and constraints of a design problem with sufficient precision to ensure a successful solution, taking into account relevant scientific principles and potential impacts on people and the natural environment. | **Frame** | **Strong** if criteria/constraints are stated explicitly (course already has students "state what the robot needs to do"); tighten by naming measurable criteria |
| MS-ETS1-2 | Evaluate competing design solutions using a systematic process to determine how well they meet the criteria and constraints of the problem. | **Design** | Partial→Strong — Design phase has students "plan two or three approaches, pick one, say why"; that IS evaluating competing solutions. Add a shared criteria rubric to fully hit |
| MS-ETS1-3 | Analyze data from tests to determine similarities and differences among several design solutions to identify the best characteristics of each that can be combined into a new solution to better meet criteria for success. | **Iterate / Game** | Partial — Iterate analyzes test results; comparing *multiple solutions'* data and combining best characteristics is lighter and could be strengthened (e.g., compare line-following strategies across the class) |
| MS-ETS1-4 | Develop a model to generate data for iterative testing and modification of a proposed object, tool, or process such that an optimal design can be achieved. | **Build / Iterate** | **Strong** — the robot/program is the model; test runs generate data; notebook drives modification toward an optimal design. This is the single tightest fit in the whole course |

Supporting SEPs (Asking Questions & Defining Problems, Developing & Using
Models, Analyzing & Interpreting Data, Engaging in Argument from Evidence) and
DCIs (ETS1.A Defining/Delimiting Problems, ETS1.B Developing Solutions, ETS1.C
Optimizing the Design Solution) all have natural homes in the spine + notebook.

---

## ISTE Standards for Students (2016) — coverage

| # | Standard | Coverage | Where |
|---|----------|----------|-------|
| 1 | Empowered Learner | Partial | Self-directed productive struggle, one-robot-per-student ownership; "set learning goals / use feedback to improve" maps to notebook |
| 2 | Digital Citizen | **None** | No online-citizenship content |
| 3 | Knowledge Constructor | Partial | Students use documentation/hints to construct understanding; light on "curating resources" |
| 4 | Innovative Designer | **Strong** | 4a deliberate design process = Frame/Design; 4c develop/test/refine prototypes = Build/Iterate; 4d tolerance for ambiguity & open-ended problems = the productive-struggle stance |
| 5 | Computational Thinker | **Strong** | 5a problem definitions for tech methods; 5c decomposition & models; 5d automation + algorithmic thinking = programming the robot |
| 6 | Creative Communicator | Partial | Notebook = communicating process; weak on creative media/presentation |
| 7 | Global Collaborator | Partial | 7c project teams via games & peer help; "global" dimension absent |

ISTE 4 (Innovative Designer) and 5 (Computational Thinker) are the standout fits
and together they describe this course almost exactly.

---

## Alignment candidates (recommended primary target)

1. **PRIMARY: CSTA K-12 CS Standards, Level 2 — anchored on Algorithms &
   Programming (2-AP-10…19), with Computing Systems (2-CS-02/03) and Data &
   Analysis (2-DA-09).** Rationale: most granular and most widely state-adopted;
   provides measurable, lesson-level claims; the AP strand is hit at strong/partial
   for 9 of 10 standards; and there is direct precedent in micro:bit Foundation's
   own CSTA-aligned "Intro to CS with the micro:bit" course. This is the spine of
   any defensible alignment statement.

2. **CO-PRIMARY: NGSS MS-ETS1 (Engineering Design).** Rationale: the Frame →
   Design → Build → Iterate spine + engineering notebook map one-to-one onto
   MS-ETS1-1 through -4 (MS-ETS1-4 is the tightest single fit in the course). This
   is what makes the course an *engineering* course, not just a coding course, and
   it complements CSTA's CS-content focus with science-standard credibility. Pairing
   CSTA (the "what they program") with NGSS-ETS1 (the "how they engineer") covers
   both halves of the course's identity.

3. **SECONDARY/disposition: ISTE Standards 4 (Innovative Designer) & 5
   (Computational Thinker).** Rationale: easy, honest add for marketing/teacher-
   facing alignment; not granular enough to be the primary target.

Use the **K-12 CS Framework practices** as the cross-cutting "practices" language
(esp. practices 2, 3, 5, 6) rather than as a separate alignment target.

Recommended phrasing for the alignment decision: *primary = CSTA Level 2 (AP-led)
+ NGSS MS-ETS1; secondary = ISTE 4/5.*

---

## Gaps (standards a course like this typically does NOT hit)

- **Impacts of Computing (2-IC-20/21/22):** society, ethics, bias/accessibility,
  careers, crowdsourcing — entirely out of scope. *Low-cost adds:* a short
  discussion of robotics/automation careers & tradeoffs (2-IC-20) and of control/
  attachment accessibility (2-IC-21) could be bolted onto a module wrap-up if
  fuller CSTA coverage is desired. Decide deliberately rather than by omission.
- **Networks security (2-NI-05, 2-NI-06):** no security or encryption content. An
  optional "encode your radio messages so the other team can't read them" twist on
  the RIR module would convert 2-NI-06 from None to Partial and fits the games
  theme — but it is not currently in scope.
- **Internet/public-network framing (2-NI-04):** the radio/IR module models
  device-to-device protocols, not the Internet; claim this only as a *protocols*
  partial, not full Internet coverage.
- **Formal abstraction (2-AP-14) and code documentation (2-AP-19):** present but
  implicit. Requiring parameterized MakeCode functions and in-code comments would
  upgrade both from Partial to Strong cheaply.
- **Data transformation/representation (2-DA-07/08):** sensor data is used but not
  much *transformed* or represented in multiple schemes; full DA coverage would
  need explicit data-logging/analysis activities the course doesn't have.
- **NGSS "compare competing solutions with data" (MS-ETS1-2/3):** the Design and
  Iterate phases get most of the way there, but explicit shared **criteria/
  constraints rubrics** and **class-wide comparison of multiple solutions' test
  data** are needed to claim MS-ETS1-2 and -3 fully (currently partial).
- **ISTE Digital Citizen (2) and the "global" in Global Collaborator (7):** not
  addressed; expected for an offline robotics course.
- **Text-based programming / data structures beyond intro level:** out of scope by
  design (block-based MakeCode, middle school) — not a gap to fix, just a boundary
  to state.
