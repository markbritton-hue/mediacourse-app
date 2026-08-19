// Static curriculum content for the Media Production course.
// No database — this file is the single source of truth, checked into
// the repo and edited directly to update the curriculum.

export type LessonType =
  | "INSTRUCTION"
  | "DEMONSTRATION"
  | "CAMERA_LAB"
  | "AUDIO_LAB"
  | "EDITING_LAB"
  | "STREAMING_LAB"
  | "PRODUCTION_LAB"
  | "PROJECT_WORK"
  | "LIVE_PRODUCTION"
  | "QUIZ"
  | "PRACTICAL_TEST"
  | "REVIEW"
  | "CRITIQUE"
  | "CAPSTONE";

export interface Lesson {
  id: string;
  weekNumber: number;
  dayOfWeek: number; // 1 = Monday .. 5 = Friday
  lessonNumber: number;
  title: string;
  duration: number;
  lessonType: LessonType;
  objective?: string;
  essentialQuestion?: string;
  vocabulary?: string[];
  teacherPrep?: string;
  requiredEquipment?: string;
  introduction?: string;
  demonstration?: string;
  content?: string;
  handsOnActivity?: string;
  productionLab?: string;
  studentAssignmentText?: string;
  assessment?: string;
  exitTicket?: string;
  homework?: string;
  timing: {
    bellwork: number;
    instruct: number;
    demo: number;
    handsOn: number;
    cleanup: number;
    review: number;
  };
}

export interface Unit {
  number: number;
  title: string;
  weekCount: number;
  color: string;
}

export interface Week {
  number: number;
  unitNumber: number;
  title?: string;
}

export const DEFAULT_TIMING = {
  bellwork: 5,
  instruct: 10,
  demo: 10,
  handsOn: 25,
  cleanup: 5,
  review: 5,
};

export const UNITS: Unit[] = [
  { number: 1, title: "Media Production Foundations", weekCount: 2, color: "#f97316" },
  { number: 2, title: "Cabling and Connectors", weekCount: 1, color: "#94a3b8" },
  { number: 3, title: "Camera Fundamentals", weekCount: 3, color: "#38bdf8" },
  { number: 4, title: "Composition and Visual Storytelling", weekCount: 2, color: "#a78bfa" },
  { number: 5, title: "Audio Production", weekCount: 3, color: "#34d399" },
  { number: 6, title: "Video Editing", weekCount: 4, color: "#fbbf24" },
  { number: 7, title: "Interviews and News Packages", weekCount: 3, color: "#f472b6" },
  { number: 8, title: "Live Video Production", weekCount: 4, color: "#fb7185" },
  { number: 9, title: "Streaming and IP Video", weekCount: 3, color: "#22d3ee" },
  { number: 10, title: "Sports Production", weekCount: 3, color: "#4ade80" },
  { number: 11, title: "Commercial and Promotional Production", weekCount: 2, color: "#c084fc" },
  { number: 12, title: "Short Film and Storytelling", weekCount: 3, color: "#fdba74" },
  { number: 13, title: "Advanced Production and Capstone", weekCount: 4, color: "#e879f9" },
];

export const WEEKS: Week[] = (() => {
  const weeks: Week[] = [];
  let weekCounter = 1;
  for (const unit of UNITS) {
    for (let i = 0; i < unit.weekCount; i++) {
      if (weekCounter > 36) break;
      weeks.push({
        number: weekCounter,
        unitNumber: unit.number,
        title: i === 0 ? unit.title : undefined,
      });
      weekCounter++;
    }
  }
  return weeks;
})();

export const LESSONS: Lesson[] = [
  {
    id: "w1d1",
    weekNumber: 1,
    dayOfWeek: 1,
    lessonNumber: 1,
    title: "Introduction to Media Production",
    duration: 60,
    lessonType: "INSTRUCTION",
    objective:
      "Students will identify the three major phases of media production and describe common production crew roles.",
    essentialQuestion: "What happens before, during, and after a video is produced?",
    vocabulary: ["Pre-production", "Production", "Post-production", "Producer", "Director", "Crew"],
    teacherPrep: "Cue a short sample production (news package or live broadcast clip) for class viewing.",
    requiredEquipment: "Projector/display, sample video",
    introduction: "Ask students to list every video they've watched this week and guess how many people it took to make one.",
    demonstration: "Walk through the pre-production / production / post-production pipeline using the sample video.",
    content: "Define pre-production, production, and post-production. Introduce core crew roles: producer, director, camera operator, audio engineer, editor.",
    handsOnActivity: "In small groups, students sequence production-phase task cards into the correct pipeline order.",
    studentAssignmentText:
      "While watching the sample production, log every production role you can identify and the moment you noticed it.",
    assessment: "Exit ticket: name the three production phases and one role from each.",
    exitTicket: "Write one sentence describing what a Director does differently from a Producer.",
    homework: "Watch any TV segment at home and note the crew roles you think were involved.",
    timing: DEFAULT_TIMING,
  },
  {
    id: "w1d2",
    weekNumber: 1,
    dayOfWeek: 2,
    lessonNumber: 2,
    title: "Production Equipment and Signal Flow",
    duration: 60,
    lessonType: "INSTRUCTION",
    objective: "Students will trace a video signal from camera to streaming platform.",
    essentialQuestion: "How does a picture from a camera end up on a screen somewhere else?",
    vocabulary: ["SDI", "HDMI", "Video switcher", "Encoder", "Signal flow", "Source", "Transport", "Processing", "Distribution"],
    teacherPrep: "Lay out one full signal chain (camera, cable, switcher, encoder) on a table or cart for students to see.",
    requiredEquipment: "Camera, SDI/HDMI cable, video switcher, encoder",
    introduction: "Ask: what has to happen for a livestream to show up on your phone?",
    demonstration: "Teacher traces Camera → SDI/HDMI → Video Switcher → Encoder → Internet → Streaming Platform live on the equipment cart.",
    content: "Introduce the Source → Transport → Processing → Distribution model of signal flow.",
    handsOnActivity: "Students physically trace a production signal path using the lab equipment, labeling each stage.",
    productionLab: "Rotate through stations tracing signal from camera to switcher to encoder.",
    studentAssignmentText: "Draw and label your own signal flow diagram from camera to streaming platform.",
    assessment: "Signal flow diagram checked for correct order and labeling.",
    exitTicket: "What stage comes right after 'Transport' in the signal flow model?",
    timing: DEFAULT_TIMING,
  },
  {
    id: "w1d3",
    weekNumber: 1,
    dayOfWeek: 3,
    lessonNumber: 3,
    title: "Camera Setup",
    duration: 60,
    lessonType: "CAMERA_LAB",
    objective: "Students will safely set up a complete camera position including tripod, power, video, and audio connections.",
    essentialQuestion: "What does a camera need before it can start recording?",
    vocabulary: ["Tripod", "Quick-release plate", "Pan/tilt", "Cable management", "Monitoring"],
    teacherPrep: "Set out tripods, cameras, cables, and monitors at each lab station.",
    requiredEquipment: "Tripods, cameras, power cables, video cables, audio cables, monitors",
    introduction: "Demonstrate an unsafe camera setup (loose plate, unsecured cables) and ask students to spot the hazards.",
    demonstration: "Teacher builds one complete camera position step by step: tripod, mount, power, video out, audio, monitor.",
    content: "Cover tripod leveling, camera mounting/locking, cable routing and safety, and confirming a monitored signal.",
    handsOnActivity: "Students build a complete camera position at their station and confirm signal on a monitor.",
    productionLab: "Stations rotate so every student builds at least one full camera position.",
    studentAssignmentText: "Checklist sign-off: tripod secure, camera mounted, cables routed safely, monitor confirms signal.",
    assessment: "Teacher checks each station's camera position against the safety checklist.",
    exitTicket: "Name one cable-safety hazard you fixed today.",
    timing: DEFAULT_TIMING,
  },
  {
    id: "w1d4",
    weekNumber: 1,
    dayOfWeek: 4,
    lessonNumber: 4,
    title: "Understanding Video Signals",
    duration: 60,
    lessonType: "CAMERA_LAB",
    objective: "Students will configure a camera to output 1080p59.94 and explain common resolution/frame-rate formats.",
    essentialQuestion: "Why do resolution and frame rate matter for a production?",
    vocabulary: ["720p", "1080p", "1080i", "4K", "29.97", "30 fps", "59.94", "60 fps", "SDI", "HDMI"],
    teacherPrep: "Confirm all lab cameras can be set to 1080p59.94.",
    requiredEquipment: "Cameras, monitors, SDI/HDMI cables",
    introduction: "Show the same clip at two different frame rates and ask students what feels different.",
    demonstration: "Teacher navigates a camera's menu to change resolution and frame rate, explaining each option.",
    content: "Cover progressive vs. interlaced, common broadcast resolutions, and standard frame rates.",
    handsOnActivity: "Students configure their assigned camera to 1080p59.94 and verify the setting on the camera and monitor.",
    studentAssignmentText: "Record your camera's menu path to reach resolution/frame-rate settings.",
    assessment: "Teacher verifies each camera is correctly set to 1080p59.94.",
    exitTicket: "What does the '59.94' in 1080p59.94 refer to?",
    timing: DEFAULT_TIMING,
  },
  {
    id: "w1d5",
    weekNumber: 1,
    dayOfWeek: 5,
    lessonNumber: 5,
    title: "First Multi-Camera Production",
    duration: 60,
    lessonType: "LIVE_PRODUCTION",
    objective: "Students will operate a basic three-camera production, rotating through crew roles, and produce a five-minute student-run program.",
    essentialQuestion: "What does it take for a crew to work together in real time?",
    vocabulary: ["Wide shot", "Medium shot", "Close-up", "Director", "Technical Director", "Camera Operator"],
    teacherPrep: "Set up three camera positions (wide/medium/close-up), switcher, and audio for a simple in-class production.",
    requiredEquipment: "3 cameras, tripods, switcher, mixer, headsets if available",
    introduction: "Quick recap: signal flow and camera setup from the week.",
    demonstration: "Teacher walks through crew roles for today: Director, Technical Director, 3 Camera Operators, Audio, Graphics, Production Assistant.",
    content: "Introduce basic multi-camera shot assignments (wide/medium/close-up) and director-to-crew communication.",
    handsOnActivity: "Crew rehearses cues and camera framing before recording.",
    productionLab: "Students rotate through all crew roles and record an approximately 5-minute student-run program.",
    studentAssignmentText: "Full crew production: record a 5-minute program using rotating roles.",
    assessment: "Post-production critique: crew reviews the recording together and discusses what worked and what to improve.",
    exitTicket: "Which role did you enjoy most today, and which was hardest?",
    timing: DEFAULT_TIMING,
  },
  {
    id: "w3d1",
    weekNumber: 3,
    dayOfWeek: 1,
    lessonNumber: 11,
    title: "Video Cabling and Connectors",
    duration: 60,
    lessonType: "INSTRUCTION",
    objective: "Students will identify common video cable and connector types and explain when each is used.",
    essentialQuestion: "Why aren't all video cables interchangeable?",
    vocabulary: ["SDI", "BNC", "HDMI", "HD-SDI", "3G-SDI", "Coaxial", "Fiber optic", "Composite video", "Component video"],
    teacherPrep: "Lay out a sample of each cable/connector type (SDI/BNC, HDMI, coax, fiber if available) at each table.",
    requiredEquipment: "Sample SDI, HDMI, coax, and fiber cables; BNC connectors; a cable tester if available",
    introduction: "Pass around an SDI cable and an HDMI cable and ask: what's actually different besides the connector shape?",
    demonstration: "Teacher compares SDI (locking BNC, long-run, professional) against HDMI (consumer-friendly, shorter reliable runs) and shows a fiber run for long distances.",
    content: "Cover BNC/SDI (including HD-SDI and 3G-SDI bandwidth differences), HDMI, coaxial, and fiber optic video cabling — construction, typical run length, and where each shows up in a broadcast signal chain.",
    handsOnActivity: "Students sort a mixed pile of cables/connectors into the correct category and label the likely use case for each.",
    studentAssignmentText: "Complete a cable identification worksheet matching each connector photo to its name and best use case.",
    assessment: "Cable identification worksheet checked for accuracy.",
    exitTicket: "Why would a production use SDI instead of HDMI for a camera that's 100 feet from the switcher?",
    timing: DEFAULT_TIMING,
  },
  {
    id: "w3d2",
    weekNumber: 3,
    dayOfWeek: 2,
    lessonNumber: 12,
    title: "Audio Cabling and Connectors",
    duration: 60,
    lessonType: "AUDIO_LAB",
    objective: "Students will identify common audio cable and connector types and explain balanced vs. unbalanced audio.",
    essentialQuestion: "Why do professional audio cables have three pins instead of two?",
    vocabulary: ["XLR", "TRS", "TS", "RCA", "Balanced audio", "Unbalanced audio", "Phantom power"],
    teacherPrep: "Set out XLR, TRS, TS, and RCA cables at each station along with a mixer that can supply phantom power.",
    requiredEquipment: "XLR cables, TRS cables, TS instrument cables, RCA cables, audio mixer",
    introduction: "Ask students why a guitar cable (TS) picks up more hum than a microphone cable (XLR) of the same length.",
    demonstration: "Teacher opens an XLR connector to show the three pins and explains how balanced wiring cancels induced noise; contrasts with unbalanced TS/RCA.",
    content: "Cover XLR (balanced, locking, standard for professional mics), TRS (balanced 1/4\" or mini, used for headphones/line level), TS (unbalanced instrument cable), and RCA (unbalanced consumer/line level).",
    handsOnActivity: "Students identify balanced vs. unbalanced cables by pin/conductor count and confirm with a continuity or cable tester.",
    studentAssignmentText: "Diagram the wiring of an XLR connector and label the three conductors (ground, hot, cold).",
    assessment: "Teacher checks each student's XLR wiring diagram for correct pin labeling.",
    exitTicket: "Name one cable type from today that is balanced and one that is unbalanced.",
    timing: DEFAULT_TIMING,
  },
  {
    id: "w3d3",
    weekNumber: 3,
    dayOfWeek: 3,
    lessonNumber: 13,
    title: "Cable Lab: Building a Video Signal Run",
    duration: 60,
    lessonType: "CAMERA_LAB",
    objective: "Students will build and test a complete video cable run from camera to monitor.",
    essentialQuestion: "How do you confirm a cable run is actually working before a production depends on it?",
    vocabulary: ["Cable run", "Signal loss", "Termination", "Cable tester"],
    teacherPrep: "Set up lab stations with a camera, a long SDI or HDMI run, and a monitor at each.",
    requiredEquipment: "Cameras, SDI/HDMI cables of varying lengths, monitors, cable tester",
    introduction: "Quick recap of yesterday's connector types.",
    demonstration: "Teacher runs a cable across the room, connects camera to monitor, and shows how to check for a clean signal vs. signs of a bad run (dropouts, no signal, sync errors).",
    content: "Cover safe cable routing, strain relief, and how to systematically test a run end-to-end when there's no picture.",
    handsOnActivity: "Students route and connect their own camera-to-monitor cable run and confirm a stable image.",
    productionLab: "Stations rotate so every student completes at least one full video cable run.",
    studentAssignmentText: "Checklist sign-off: cable routed safely, connectors fully seated, monitor confirms a stable signal.",
    assessment: "Teacher verifies each station's run against the checklist.",
    exitTicket: "If a monitor shows no signal, what's the first thing you should check?",
    timing: DEFAULT_TIMING,
  },
  {
    id: "w3d4",
    weekNumber: 3,
    dayOfWeek: 4,
    lessonNumber: 14,
    title: "Cable Lab: Building an Audio Signal Run",
    duration: 60,
    lessonType: "AUDIO_LAB",
    objective: "Students will build and test a complete audio cable run from microphone to mixer, and diagnose a common audio cabling fault.",
    essentialQuestion: "What's the fastest way to find a bad connection in an audio chain?",
    vocabulary: ["Signal chain", "Gain staging", "Dead cable", "Ground loop"],
    teacherPrep: "Set up lab stations with a microphone, XLR cable, and mixer; intentionally break one cable per station for troubleshooting practice.",
    requiredEquipment: "Microphones, XLR cables (including one intentionally faulty per station), audio mixers, headphones",
    introduction: "Ask: if a mic isn't producing sound, what could be wrong besides the microphone itself?",
    demonstration: "Teacher shows a systematic swap-and-isolate method: swap the cable, then the mic, then the input, to isolate the fault.",
    content: "Cover signal chain order (mic → cable → mixer input → gain → output) and how to isolate a fault by substitution.",
    handsOnActivity: "Students build a mic-to-mixer run, confirm clean signal, then diagnose the intentionally faulty cable at their station using the swap-and-isolate method.",
    productionLab: "Stations rotate so every student both builds a clean run and diagnoses a faulty one.",
    studentAssignmentText: "Write up what was wrong with your station's faulty cable and how you found it.",
    assessment: "Teacher checks each student's diagnosis write-up for correct method and conclusion.",
    exitTicket: "Name the three things you swap, in order, to isolate a 'no audio' problem.",
    timing: DEFAULT_TIMING,
  },
  {
    id: "w3d5",
    weekNumber: 3,
    dayOfWeek: 5,
    lessonNumber: 15,
    title: "Cabling Practical Assessment",
    duration: 60,
    lessonType: "PRACTICAL_TEST",
    objective: "Students will identify cable/connector types and correctly wire and test a mixed audio/video cable station.",
    essentialQuestion: "Can you set up a working signal path under time pressure?",
    vocabulary: ["SDI", "HDMI", "XLR", "TRS", "TS", "RCA", "Balanced", "Unbalanced"],
    teacherPrep: "Set up practical test stations, each with a mix of correct and incorrect cable/connector options and one intentional fault.",
    requiredEquipment: "Full set of video and audio cables/connectors from the week, cameras, monitors, microphones, mixers",
    introduction: "Review the week: video cabling, audio cabling, and troubleshooting method.",
    content: "No new content — this is a cumulative practical assessment of the week's material.",
    handsOnActivity: "Students rotate through a video station and an audio station, correctly cabling each and diagnosing one planted fault per station.",
    assessment: "Practical checklist: correct connector selection, safe routing, confirmed working signal, correct fault diagnosis.",
    exitTicket: "What's one cabling mistake you'll make sure never to repeat on a real production?",
    timing: DEFAULT_TIMING,
  },
];

export function getUnit(unitNumber: number): Unit | undefined {
  return UNITS.find((u) => u.number === unitNumber);
}

export function getWeek(weekNumber: number): Week | undefined {
  return WEEKS.find((w) => w.number === weekNumber);
}

export function getLessonsForWeek(weekNumber: number): Lesson[] {
  return LESSONS.filter((l) => l.weekNumber === weekNumber).sort((a, b) => a.dayOfWeek - b.dayOfWeek);
}

export function getLesson(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}
