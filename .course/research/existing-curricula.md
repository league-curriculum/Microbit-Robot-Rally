# Phase 1c Research — Existing Curricula & Resources

Course: **Micro:bit Robot Rally** (grades 6–8, MakeCode blocks, BBC Micro:bit +
Elecfreaks Cutebot + Joystick:bit, custom League extensions `pxt-cutebot`,
`pxt-joystick`, `pxt-leagueir`, `pxt-radioext`).

Scope of this research: existing curricula, lesson sets, tutorials, and starter
projects relevant to the course, classified as **Linked** (point students at
directly), **Adapted** (inspiration we rewrite into our format), or **Skip**, with
notes on module mapping and conflicts with our custom extensions.

Date: 2026-06-17. All URLs verified to resolve during research.

---

## 1. Sources

| # | Title | URL | Relevance | Classification | Notes |
|---|-------|-----|-----------|----------------|-------|
| 1 | Elecfreaks WIKI — Cutebot (Smart Cutebot, 15 cases) | https://wiki.elecfreaks.com/en/microbit/microbit-smart-car/microbit-smart-cutebot/ | **High** | **Adapted** (some Linked) | The single most relevant resource. 15 MakeCode cases that map directly onto most of our modules. Uses Elecfreaks' stock `cutebot` extension — conflicts conceptually with our `pxt-cutebot`/`pxt-joystick`/`pxt-leagueir`, so block code must be rewritten; structure/sequence is excellent inspiration. |
| 2 | Elecfreaks WIKI — Cutebot Pro (encoder motors, 4-way line sensor) | https://wiki.elecfreaks.com/en/microbit/microbit-smart-car/microbit-smart-cutebot-pro/ | Med | Adapted/Skip | For the Pro variant (encoders, 4-way line sensor, precise distance/turn). We use the standard Cutebot; useful only as reference for line-following and obstacle cases if/when Pro hardware is in play. |
| 3 | Elecfreaks WIKI — Joystick:bit V2 | https://wiki.elecfreaks.com/en/microbit/expansion-board/joystick-bit-v2/ | **High** | Adapted | Hardware reference + stock `joystickbit` extension. Confirms button/axis layout, buzzer, vibration motor. We replace with `pxt-joystick`; use for pinout/behavior reference and Drive Day framing. |
| 4 | Elecfreaks WIKI — Cutebot Fun Football Game Kit | https://wiki.elecfreaks.com/en/microbit/microbit-smart-car/microbit-smart-cutebot/cutebot-fun-football-game-kit/ | **High** | Adapted | Competition-based teaching model (robot soccer with a wheeled ball). Direct inspiration for our Robot Rally Games module — especially capture-the-flag / tag / ball games. Closest existing analog to our games phase. |
| 5 | Elecfreaks Cutebot WIKI — Case 11 micro:bit Remote Control (radio) | https://www.elecfreaks.com/learn-en/microbitKit/smart_cutebot/cutebot_case11.html | **High** | Adapted | Radio-controlled driving between two micro:bits. Maps to our Radio module + Drive Day. Uses stock radio blocks, not our `pxt-radioext` — rewrite, but the pedagogy (send command → drive) transfers. |
| 6 | Elecfreaks Cutebot WIKI — Case 13 Remote Control with Joystick:bit | https://wiki.elecfreaks.com/en/microbit/microbit-smart-car/microbit-smart-cutebot/ (case list) | **High** | Adapted | Joystick:bit drives Cutebot over radio — our exact Drive Day / radio setup. Inspiration; rewrite with `pxt-joystick` + `pxt-radioext`. |
| 7 | Elecfreaks Cutebot WIKI — Case 14 IR Remote Control Car | https://www.elecfreaks.com/learn-en/microbitKit/smart_cutebot/ (case list) | Med-High | Adapted | Infrared control of the robot. Maps to our IR comms module. Stock IR vs our `pxt-leagueir` — rewrite. Rare external IR-between-devices example, so valuable despite differences. |
| 8 | MakeCode for micro:bit — Intro to CS (Online + Classroom) | https://makecode.microbit.org/courses | **High** | Adapted (Radio unit near-Linkable) | Free 14-week course explicitly for **grades 6–8 / ages 9–15**. Units: Making, Algorithms, Variables, Conditionals, Iteration, Coordinates, Booleans, Binary, **Radio**, Arrays, Final Projects. Gold-standard for our foundation programming concepts and especially the Radio module. |
| 9 | MakeCode — Radio and Communication course unit | https://makecode.microbit.org/courses/csintro/radio | **High** | Adapted | Standalone radio teaching: group/channel concept, send/receive numbers & strings, "Marco Polo / Morse code" activity. Directly seeds our Radio comms module's concepts (channels, packets). Pairs with our `pxt-radioext`. |
| 10 | micro:bit Foundation — First Lessons with MakeCode | https://microbit.org/teach/lessons/first-lessons-with-makecode-and-the-microbit/ | Med-High | Adapted | Six beginner MakeCode projects (Name badge, Beating heart, Emotion badge, Step counter, Night light, Rock-paper-scissors). Ideal scaffolding for our "Meet the Micro:bit" foundation lesson (LEDs, buttons, first program). Not robotics. |
| 11 | micro:bit Foundation — Lessons hub | https://microbit.org/teach/lessons/ | Med | Adapted/Skip | 19 units of work + 6 design challenges, ages 7–16, incl. Computing fundamentals (ages 11–14), Data handling, Python first lessons. Use Computing Fundamentals as a concept reference; most units aren't robotics. |
| 12 | micro:bit Foundation — do your :bit | https://microbit.org/teach/do-your-bit/ | Low-Med | Skip/Adapted | UN Global Goals design-challenge program. Strong on framing real-world problems (fits our Frame phase) but not aligned to robotics/Cutebot. Borrow framing ideas only. |
| 13 | Kitronik — 4 Lesson Plans for :MOVE mini | https://kitronik.co.uk/blogs/resources/lesson-plans-for-move-mini-microbit | Med | Adapted (comparison) | Free downloadable KS3 robotics lesson plans (curriculum mapping, challenges, PowerPoints) for a competing micro:bit buggy. Different hardware; mine for lesson structure, "make robots move via algorithms," radio-controller-as-second-microbit pattern. |
| 14 | Kitronik — :MOVE Motor online resources | https://kitronik.co.uk/blogs/resources/online-resources-for-move-motor-microbit | Med | Adapted (comparison) | Tutorials: draw shapes, ZIP LEDs, Bluetooth control, **second micro:bit as controller via radio**. Comparison robotics platform; the radio-controller tutorial parallels our Drive Day/radio design. |
| 15 | Raspberry Pi Foundation — micro:bit coding projects | https://www.raspberrypi.org/blog/microbit-coding-projects/ and https://projects.raspberrypi.org/en/projects | Med | Adapted | Structured MakeCode projects with Explore → Design → Invent progression (mirrors our Frame→Design→Build→Iterate). Good model for project scaffolding & differentiation; not Cutebot-specific. |
| 16 | code.org — Physical Computing with micro:bit (Maker / CS Discoveries) | https://code.org/en-US/curriculum/maker | Med | Adapted/Skip | Middle-school physical-computing curriculum using micro:bit. Useful for general CS framing and classroom pacing at our grade band; not robotics/Cutebot. |
| 17 | Adafruit Learn — micro:bit Radio-Controlled Puppet | https://learn.adafruit.com/micro-bit-radio-controlled-puppet | Low-Med | Adapted/Skip | Two-micro:bit radio "text message" / control project. Small inspiration for radio messaging activities; non-Cutebot. |
| 18 | SparkFun Education — Working with the radio on the micro:bit | https://blog.sparkfuneducation.com/working-with-the-radio-on-the-microbit | Low-Med | Adapted/Skip | Conceptual explainer on radio groups/channels. Background reading for instructors; supports Radio module concepts. |

---

## 2. Per-Module Coverage

Our modules → external resources that cover them → recommended action.

| Our module | External resources | Coverage | Action |
|------------|-------------------|----------|--------|
| **Foundation: Drive Day** (drive pre-loaded robots w/ Joystick:bit; no coding) | Cutebot Case 13 (Joystick:bit remote, #6); Joystick:bit V2 wiki (#3); Cutebot Case 11 radio (#5) | Med | **Adapt.** External cases assume students code the link; our Drive Day pre-loads it. Borrow hardware/setup, not code. Original to us. |
| **Foundation: Meet the Micro:bit** (LEDs, buttons, first program, MakeCode editor) | micro:bit First Lessons (#10); MakeCode Intro to CS — Making/Algorithms (#8); Foundation Computing Fundamentals (#11) | **High** | **Adapt / partially Link.** Strongest external support. First Lessons + Intro-to-CS opening units map almost 1:1. |
| **Foundation: Make It Move** (program Cutebot motors, basic driving) | Cutebot Cases 1–4 (move, accelerate, figure-8, random) (#1) | **High** | **Adapt.** Direct match; rewrite blocks for `pxt-cutebot`. |
| **Sensors & Line-following** | Cutebot Cases 5–10 (headlights, lamps, fall-arrest, line follow, obstacle avoid, car-follow) (#1); Cutebot Pro Cases 08/10 (#2); RPi projects (#15) | **High** | **Adapt.** Excellent coverage. Rewrite for our extension; keep case progression. |
| **Radio & Infrared comms** | MakeCode Radio course (#9); Intro to CS Radio unit (#8); Cutebot Case 11 radio (#5), Case 13 joystick-radio (#6), Case 14 IR (#7); Adafruit (#17); SparkFun (#18); Kitronik radio-controller (#14) | **High (radio) / Med (IR)** | **Adapt.** Radio concepts well-covered externally and reusable. **IR is thinly covered** — Case 14 is the main analog; our `pxt-leagueir` is largely novel. |
| **Attachments & 3D-printed parts** | (none found directly) — Kitronik :MOVE add-ons (servo/LED) (#14) loosely | **Low** | **Original.** Build ourselves. No external 3D-printed-Technic-for-Cutebot curriculum located. |
| **Robot Rally Games** (race, obstacle, tag, capture-the-flag) | Cutebot Fun Football Game Kit (#4); obstacle-avoid cases (#1, #2); A-Z Robotics / SparkFun maker courses (#8) | **Low-Med** | **Adapt the Football kit's competition model; rest original.** No external race/tag/capture-the-flag curriculum for Cutebot. |

---

## 3. Conflicts With Our Custom Extensions

All Elecfreaks/MakeCode robot examples use **stock extensions** (`cutebot`,
`joystickbit`, built-in `radio`, stock IR). Our course standardizes on
`pxt-cutebot`, `pxt-joystick`, `pxt-leagueir`, `pxt-radioext`.

Implications:
- **Block code is NOT directly Linkable** for any robot example — block names,
  packet/channel APIs, and IR APIs differ. External robot resources are
  **Adapted**, not Linked: borrow sequence, framing, and challenge ideas; rewrite
  all code against our extensions.
- **`pxt-radioext`** (channels/packets) overlaps conceptually with the MakeCode
  Radio course (groups + send/receive); that course's *concepts* transfer cleanly
  even though our API differs — strongest reuse candidate in the comms module.
- **`pxt-leagueir`** (IR comms between devices) is the most novel: only Cutebot
  Case 14 (IR remote) is a near-analog, and even that is consumer-IR-style, not
  device-to-device messaging. Expect to author this module largely from scratch.
- Pure-Micro:bit, no-robot resources (First Lessons, Intro-to-CS non-robot units)
  have **no extension conflict** and are the most directly Linkable/Adaptable.

---

## 4. Gaps (little or no external support — author original)

1. **Custom-extension comms (esp. IR / `pxt-leagueir`).** Device-to-device IR
   messaging has essentially no existing curriculum; radio has concept-level
   support but our `pxt-radioext` channel/packet API needs original lessons.
2. **Robot Rally Games.** Race / obstacle / tag / capture-the-flag for Cutebot has
   no published curriculum. The Cutebot Football Game Kit (#4) is the only
   competition-model analog — adapt its structure; design the games ourselves.
3. **Attachments & 3D-printed Technic parts.** No external Cutebot
   attachment/3D-printing curriculum found. Fully original.
4. **Drive-Day-style "hook first, code later" onboarding.** External robot
   resources jump straight to coding; our no-code engagement opener is original.
5. **Engineering-notebook / Frame→Design→Build→Iterate spine.** No external
   micro:bit-robotics resource embeds this. (RPi's Explore→Design→Invent and
   do-your-:bit framing are the closest references to adapt.)
