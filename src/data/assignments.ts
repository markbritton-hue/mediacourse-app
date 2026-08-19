export type AssignmentType =
  | "WRITTEN"
  | "VIDEO"
  | "AUDIO"
  | "PHOTOGRAPHY"
  | "EDITING"
  | "PRODUCTION"
  | "RESEARCH"
  | "REFLECTION";

export interface Assignment {
  id: string;
  title: string;
  description?: string;
  instructions?: string;
  points: number;
  assignmentType: AssignmentType;
  lessonId?: string; // links back to a curriculum lesson id
  weekNumber?: number;
}

export const ASSIGNMENTS: Assignment[] = [
  {
    id: "a1",
    title: "Production Roles Log",
    description: "Identify production roles while watching a sample production.",
    instructions:
      "While watching the sample production shown in class, log every production role you can identify and the moment you noticed it (e.g. 3:12 - camera operator pans to follow talent).",
    points: 20,
    assignmentType: "WRITTEN",
    lessonId: "w1d1",
    weekNumber: 1,
  },
  {
    id: "a2",
    title: "Signal Flow Diagram",
    description: "Draw and label the full camera-to-streaming-platform signal path.",
    instructions:
      "Draw a diagram showing Camera → SDI/HDMI → Video Switcher → Encoder → Internet → Streaming Platform. Label each connection type.",
    points: 15,
    assignmentType: "WRITTEN",
    lessonId: "w1d2",
    weekNumber: 1,
  },
  {
    id: "a3",
    title: "Camera Position Safety Checklist",
    description: "Sign-off checklist confirming a safe, complete camera position.",
    instructions:
      "Complete the checklist: tripod secure and leveled, camera mounted and locked, all cables routed safely (no trip hazards), monitor confirms a clean signal.",
    points: 15,
    assignmentType: "PRODUCTION",
    lessonId: "w1d3",
    weekNumber: 1,
  },
  {
    id: "a4",
    title: "Camera Menu Configuration Log",
    description: "Record how to reach resolution/frame-rate settings on your assigned camera.",
    instructions: "Write out the exact menu path used to set your camera to 1080p59.94, and confirm the setting with your teacher.",
    points: 10,
    assignmentType: "WRITTEN",
    lessonId: "w1d4",
    weekNumber: 1,
  },
  {
    id: "a5",
    title: "First Multi-Camera Production",
    description: "Full-crew production: record a 5-minute program using rotating roles.",
    instructions:
      "As a crew, rotate through Director, Technical Director, 3 Camera Operators, Audio, Graphics, and Production Assistant to record an approximately 5-minute student-run program. Submit the final recording.",
    points: 40,
    assignmentType: "PRODUCTION",
    lessonId: "w1d5",
    weekNumber: 1,
  },
  {
    id: "a6",
    title: "Cable Identification Worksheet",
    description: "Match connector photos to their name and best use case.",
    instructions:
      "Complete the worksheet identifying SDI/BNC, HDMI, coaxial, and fiber optic video connectors, and note when each would be used on a production.",
    points: 15,
    assignmentType: "WRITTEN",
    lessonId: "w3d1",
    weekNumber: 3,
  },
  {
    id: "a7",
    title: "XLR Wiring Diagram",
    description: "Diagram the three-pin wiring of an XLR connector.",
    instructions: "Draw and label an XLR connector's three conductors (ground, hot, cold) and briefly explain why balanced wiring resists noise.",
    points: 15,
    assignmentType: "WRITTEN",
    lessonId: "w3d2",
    weekNumber: 3,
  },
  {
    id: "a8",
    title: "Video Cable Run Sign-Off",
    description: "Build and confirm a working camera-to-monitor cable run.",
    instructions: "Complete the checklist: cable routed safely, connectors fully seated, monitor confirms a stable signal.",
    points: 15,
    assignmentType: "PRODUCTION",
    lessonId: "w3d3",
    weekNumber: 3,
  },
  {
    id: "a9",
    title: "Audio Fault Diagnosis Write-Up",
    description: "Diagnose and document a planted fault in an XLR audio chain.",
    instructions: "Write up what was wrong with your station's faulty cable and the swap-and-isolate steps you used to find it.",
    points: 15,
    assignmentType: "WRITTEN",
    lessonId: "w3d4",
    weekNumber: 3,
  },
  {
    id: "a10",
    title: "Cabling Practical Assessment",
    description: "Cumulative practical test: correctly cable and troubleshoot a video and an audio station.",
    instructions:
      "At each station, select the correct cables/connectors, route them safely, confirm a working signal, and correctly diagnose the planted fault.",
    points: 30,
    assignmentType: "PRODUCTION",
    lessonId: "w3d5",
    weekNumber: 3,
  },
  {
    id: "a11",
    title: "Depth of Field Comparison",
    description: "Shallow vs. deep depth of field stills of the same subject.",
    instructions: "Capture two stills of the same subject — one with shallow depth of field, one with deep depth of field — and label the f-stop used for each.",
    points: 15,
    assignmentType: "PHOTOGRAPHY",
    lessonId: "w4d1",
    weekNumber: 4,
  },
  {
    id: "a12",
    title: "White Balance Before/After",
    description: "Demonstrate correcting a color cast with manual white balance.",
    instructions: "Capture a still before and after white balancing under your assigned light source.",
    points: 10,
    assignmentType: "PHOTOGRAPHY",
    lessonId: "w4d4",
    weekNumber: 4,
  },
  {
    id: "a13",
    title: "Exposure Practical Assessment",
    description: "Cumulative practical: correctly expose and white balance a scene under time pressure.",
    instructions: "At your station, set iris, shutter speed, gain, and white balance to correctly and naturally expose the given scene within the time limit.",
    points: 25,
    assignmentType: "PRODUCTION",
    lessonId: "w4d5",
    weekNumber: 4,
  },
  {
    id: "a14",
    title: "Camera Movement Reel",
    description: "Submit clean examples of core camera movements.",
    instructions: "Submit one clean example each of a pan, a tilt, and a dolly or truck move, each starting and ending on a held frame.",
    points: 15,
    assignmentType: "VIDEO",
    lessonId: "w5d5",
    weekNumber: 5,
  },
  {
    id: "a15",
    title: "Shot Size Portfolio",
    description: "Capture all four basic shot sizes of the same subject.",
    instructions: "Capture and submit one still of each of the four basic shot sizes — wide, medium, close-up, extreme close-up — of the same subject.",
    points: 15,
    assignmentType: "PHOTOGRAPHY",
    lessonId: "w6d1",
    weekNumber: 6,
  },
  {
    id: "a16",
    title: "Advanced Shot Types Portfolio",
    description: "Capture the cowboy shot, two-shot, over-the-shoulder, and insert shot.",
    instructions: "Submit one example each of a cowboy shot, a two-shot, an over-the-shoulder shot, and an insert shot.",
    points: 20,
    assignmentType: "PHOTOGRAPHY",
    lessonId: "w6d2",
    weekNumber: 6,
  },
  {
    id: "a17",
    title: "Scene Shot List and Coverage",
    description: "Plan and capture a full shot list for a short scene.",
    instructions: "Submit your written shot list alongside captured footage matching each planned shot: a wide master, at least one medium, one close-up, one two-shot or OTS, and one insert.",
    points: 25,
    assignmentType: "PRODUCTION",
    lessonId: "w6d4",
    weekNumber: 6,
  },
  {
    id: "a18",
    title: "Camera Fundamentals Practical Assessment",
    description: "Cumulative practical covering exposure, focus, movement, and shot types.",
    instructions:
      "Complete the timed practical: correctly expose and white balance a scene, execute one smooth camera move, pull focus once, and capture three different shot types of the same subject.",
    points: 35,
    assignmentType: "PRODUCTION",
    lessonId: "w6d5",
    weekNumber: 6,
  },
];

export function getAssignment(id: string): Assignment | undefined {
  return ASSIGNMENTS.find((a) => a.id === id);
}
