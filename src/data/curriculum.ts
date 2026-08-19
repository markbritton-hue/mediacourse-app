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
  { number: 2, title: "Camera Fundamentals", weekCount: 3, color: "#38bdf8" },
  { number: 3, title: "Composition and Visual Storytelling", weekCount: 2, color: "#a78bfa" },
  { number: 4, title: "Audio Production", weekCount: 3, color: "#34d399" },
  { number: 5, title: "Video Editing", weekCount: 4, color: "#fbbf24" },
  { number: 6, title: "Interviews and News Packages", weekCount: 3, color: "#f472b6" },
  { number: 7, title: "Live Video Production", weekCount: 4, color: "#fb7185" },
  { number: 8, title: "Streaming and IP Video", weekCount: 3, color: "#22d3ee" },
  { number: 9, title: "Sports Production", weekCount: 3, color: "#4ade80" },
  { number: 10, title: "Commercial and Promotional Production", weekCount: 2, color: "#c084fc" },
  { number: 11, title: "Short Film and Storytelling", weekCount: 3, color: "#fdba74" },
  { number: 12, title: "Advanced Production and Capstone", weekCount: 4, color: "#e879f9" },
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
