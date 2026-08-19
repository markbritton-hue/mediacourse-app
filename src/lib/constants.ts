export const DAY_NAMES = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export const LESSON_TYPE_LABELS: Record<string, string> = {
  INSTRUCTION: "Instruction",
  DEMONSTRATION: "Demonstration",
  CAMERA_LAB: "Camera Lab",
  AUDIO_LAB: "Audio Lab",
  EDITING_LAB: "Editing Lab",
  STREAMING_LAB: "Streaming Lab",
  PRODUCTION_LAB: "Production Lab",
  PROJECT_WORK: "Project Work",
  LIVE_PRODUCTION: "Live Production",
  QUIZ: "Quiz",
  PRACTICAL_TEST: "Practical Test",
  REVIEW: "Review",
  CRITIQUE: "Critique",
  CAPSTONE: "Capstone",
};

export const LESSON_STATUS_LABELS: Record<string, string> = {
  PLANNED: "Planned",
  COMPLETE: "Complete",
  PARTIAL: "Partially Complete",
  SKIPPED: "Skipped",
  RESCHEDULED: "Rescheduled",
  CANCELLED: "Cancelled",
};

export const LESSON_STATUS_COLORS: Record<string, string> = {
  PLANNED: "bg-zinc-700 text-zinc-200",
  COMPLETE: "bg-emerald-900 text-emerald-300 border border-emerald-700",
  PARTIAL: "bg-amber-900 text-amber-300 border border-amber-700",
  SKIPPED: "bg-zinc-800 text-zinc-500 border border-zinc-700",
  RESCHEDULED: "bg-sky-900 text-sky-300 border border-sky-700",
  CANCELLED: "bg-red-950 text-red-400 border border-red-800",
};

export const DEFAULT_TIMING = {
  timingBellwork: 5,
  timingInstruct: 10,
  timingDemo: 10,
  timingHandsOn: 25,
  timingCleanup: 5,
  timingReview: 5,
};

export const SKILL_LEVEL_LABELS: Record<string, string> = {
  NOT_INTRODUCED: "Not Introduced",
  INTRODUCED: "Introduced",
  PRACTICING: "Practicing",
  COMPETENT: "Competent",
  PROFICIENT: "Proficient",
  MASTERED: "Mastered",
};

export const SKILL_LEVEL_COLORS: Record<string, string> = {
  NOT_INTRODUCED: "bg-zinc-800 text-zinc-500",
  INTRODUCED: "bg-zinc-700 text-zinc-300",
  PRACTICING: "bg-amber-900 text-amber-300",
  COMPETENT: "bg-sky-900 text-sky-300",
  PROFICIENT: "bg-indigo-900 text-indigo-300",
  MASTERED: "bg-emerald-900 text-emerald-300",
};

export const EQUIPMENT_STATUS_COLORS: Record<string, string> = {
  AVAILABLE: "bg-emerald-900 text-emerald-300 border border-emerald-700",
  CHECKED_OUT: "bg-amber-900 text-amber-300 border border-amber-700",
  IN_USE: "bg-sky-900 text-sky-300 border border-sky-700",
  NEEDS_REPAIR: "bg-red-950 text-red-400 border border-red-800",
  RETIRED: "bg-zinc-800 text-zinc-500 border border-zinc-700",
};

export const PROJECT_STATUS_LABELS: Record<string, string> = {
  PLANNING: "Planning",
  PRE_PRODUCTION: "Pre-Production",
  PRODUCTION: "Production",
  POST_PRODUCTION: "Post-Production",
  COMPLETE: "Complete",
  ARCHIVED: "Archived",
};
