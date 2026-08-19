import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const UNITS = [
  { number: 1, title: "Media Production Foundations", weeks: 2, color: "#f97316" },
  { number: 2, title: "Camera Fundamentals", weeks: 3, color: "#38bdf8" },
  { number: 3, title: "Composition and Visual Storytelling", weeks: 2, color: "#a78bfa" },
  { number: 4, title: "Audio Production", weeks: 3, color: "#34d399" },
  { number: 5, title: "Video Editing", weeks: 4, color: "#fbbf24" },
  { number: 6, title: "Interviews and News Packages", weeks: 3, color: "#f472b6" },
  { number: 7, title: "Live Video Production", weeks: 4, color: "#fb7185" },
  { number: 8, title: "Streaming and IP Video", weeks: 3, color: "#22d3ee" },
  { number: 9, title: "Sports Production", weeks: 3, color: "#4ade80" },
  { number: 10, title: "Commercial and Promotional Production", weeks: 2, color: "#c084fc" },
  { number: 11, title: "Short Film and Storytelling", weeks: 3, color: "#fdba74" },
  { number: 12, title: "Advanced Production and Capstone", weeks: 4, color: "#e879f9" },
];

const SKILL_CATEGORIES: Record<string, string[]> = {
  "Camera Skills": [
    "Set up tripod",
    "Mount camera safely",
    "Connect SDI",
    "Connect HDMI",
    "Set resolution",
    "Set frame rate",
    "Set white balance",
    "Set exposure",
    "Manual focus",
    "Compose wide shot",
    "Compose medium shot",
    "Compose close-up",
    "Follow moving subject",
    "Operate sports camera",
  ],
  "Audio Skills": [
    "Connect XLR microphone",
    "Set mixer gain",
    "Monitor audio",
    "Use lavalier microphone",
    "Use wireless microphone",
    "Identify clipping",
    "Correct low audio",
    "Prevent feedback",
    "Mix multiple microphones",
  ],
  "Live Production Skills": [
    "Configure video switcher",
    "Preview camera",
    "Take camera to program",
    "Perform dissolve",
    "Operate graphics",
    "Insert lower third",
    "Communicate with camera operators",
    "Direct multi-camera production",
    "Technical direct production",
    "Troubleshoot missing video source",
  ],
  "Streaming Skills": [
    "Configure encoder",
    "Configure RTMP",
    "Configure SRT",
    "Explain bitrate",
    "Set CBR",
    "Determine streaming bandwidth",
    "Identify IP address",
    "Troubleshoot network stream",
    "Monitor stream health",
  ],
  "Editing Skills": [
    "Import media",
    "Organize project",
    "Create timeline",
    "Perform basic cuts",
    "Use B-roll",
    "Mix audio",
    "Add music",
    "Create titles",
    "Color correct video",
    "Export final video",
  ],
};

const PRODUCTION_ROLES: { name: string; category: string }[] = [
  { name: "Producer", category: "Direction" },
  { name: "Director", category: "Direction" },
  { name: "Technical Director", category: "Direction" },
  { name: "Camera Operator 1", category: "Camera" },
  { name: "Camera Operator 2", category: "Camera" },
  { name: "Camera Operator 3", category: "Camera" },
  { name: "Camera Operator 4", category: "Camera" },
  { name: "Audio Engineer", category: "Audio" },
  { name: "Graphics Operator", category: "Graphics" },
  { name: "Replay Operator", category: "Graphics" },
  { name: "Streaming Engineer", category: "Streaming" },
  { name: "Floor Director", category: "Direction" },
  { name: "Lighting", category: "Lighting" },
  { name: "Editor", category: "Post-Production" },
  { name: "Talent", category: "Talent" },
  { name: "Announcer", category: "Talent" },
  { name: "Production Assistant", category: "Direction" },
];

const GRADING_CATEGORIES = [
  { name: "Productions / Projects", weightPct: 40 },
  { name: "Equipment and Production Labs", weightPct: 20 },
  { name: "Participation / Production Roles", weightPct: 15 },
  { name: "Practical Skills Tests", weightPct: 15 },
  { name: "Quizzes / Written Work", weightPct: 10 },
];

async function main() {
  console.log("Seeding Media Production course...");

  const teacherUser = await prisma.user.upsert({
    where: { email: "teacher@school.edu" },
    update: {},
    create: { email: "teacher@school.edu", name: "Media Production Teacher", role: "TEACHER" },
  });

  const teacher = await prisma.teacher.upsert({
    where: { userId: teacherUser.id },
    update: {},
    create: { userId: teacherUser.id, title: "Media Production Instructor" },
  });

  let course = await prisma.course.findFirst({ where: { name: "Media Production" } });
  if (!course) {
    course = await prisma.course.create({
      data: {
        name: "Media Production",
        description:
          "Full-year high school course covering camera, audio, editing, live production, streaming, sports, and short-form storytelling. 20% instruction / 80% hands-on production.",
        teacherId: teacher.id,
      },
    });
  }

  const startDate = new Date("2026-08-24");
  const endDate = new Date("2027-06-05");
  let schoolYear = await prisma.schoolYear.findFirst({ where: { courseId: course.id } });
  if (!schoolYear) {
    schoolYear = await prisma.schoolYear.create({
      data: { courseId: course.id, label: "2026-2027", startDate, endDate },
    });
  }

  // Units
  const unitRecords: Record<number, { id: string }> = {};
  for (const u of UNITS) {
    const rec = await prisma.unit.upsert({
      where: { courseId_number: { courseId: course.id, number: u.number } },
      update: { title: u.title, weekCount: u.weeks, color: u.color },
      create: {
        courseId: course.id,
        number: u.number,
        title: u.title,
        weekCount: u.weeks,
        color: u.color,
      },
    });
    unitRecords[u.number] = rec;
  }

  // 36 weeks, mapped sequentially to units by weekCount
  let weekCounter = 1;
  for (const u of UNITS) {
    for (let i = 0; i < u.weeks; i++) {
      if (weekCounter > 36) break;
      await prisma.week.upsert({
        where: { schoolYearId_number: { schoolYearId: schoolYear.id, number: weekCounter } },
        update: { unitId: unitRecords[u.number].id },
        create: {
          schoolYearId: schoolYear.id,
          number: weekCounter,
          unitId: unitRecords[u.number].id,
          title: i === 0 ? u.title : undefined,
        },
      });
      weekCounter++;
    }
  }

  // Week 1 lessons
  const week1 = await prisma.week.findFirstOrThrow({
    where: { schoolYearId: schoolYear.id, number: 1 },
  });

  const week1Lessons = [
    {
      dayOfWeek: 1,
      lessonNumber: 1,
      title: "Introduction to Media Production",
      lessonType: "INSTRUCTION" as const,
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
      productionLab: "",
      studentAssignmentText:
        "While watching the sample production, log every production role you can identify and the moment you noticed it.",
      assessment: "Exit ticket: name the three production phases and one role from each.",
      exitTicket: "Write one sentence describing what a Director does differently from a Producer.",
      homework: "Watch any TV segment at home and note the crew roles you think were involved.",
      teacherNotes: "First day — keep energy high, this sets tone for the year.",
      standards: "",
    },
    {
      dayOfWeek: 2,
      lessonNumber: 2,
      title: "Production Equipment and Signal Flow",
      lessonType: "INSTRUCTION" as const,
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
      homework: "",
      teacherNotes: "Check cable inventory before class.",
      standards: "",
    },
    {
      dayOfWeek: 3,
      lessonNumber: 3,
      title: "Camera Setup",
      lessonType: "CAMERA_LAB" as const,
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
      homework: "",
      teacherNotes: "Emphasize cable safety — tripping hazards are the most common lab issue.",
      standards: "",
    },
    {
      dayOfWeek: 4,
      lessonNumber: 4,
      title: "Understanding Video Signals",
      lessonType: "CAMERA_LAB" as const,
      objective: "Students will configure a camera to output 1080p59.94 and explain common resolution/frame-rate formats.",
      essentialQuestion: "Why do resolution and frame rate matter for a production?",
      vocabulary: ["720p", "1080p", "1080i", "4K", "29.97", "30 fps", "59.94", "60 fps", "SDI", "HDMI"],
      teacherPrep: "Confirm all lab cameras can be set to 1080p59.94.",
      requiredEquipment: "Cameras, monitors, SDI/HDMI cables",
      introduction: "Show the same clip at two different frame rates and ask students what feels different.",
      demonstration: "Teacher navigates a camera's menu to change resolution and frame rate, explaining each option.",
      content: "Cover progressive vs. interlaced, common broadcast resolutions, and standard frame rates.",
      handsOnActivity: "Students configure their assigned camera to 1080p59.94 and verify the setting on the camera and monitor.",
      productionLab: "",
      studentAssignmentText: "Record your camera's menu path to reach resolution/frame-rate settings.",
      assessment: "Teacher verifies each camera is correctly set to 1080p59.94.",
      exitTicket: "What does the '59.94' in 1080p59.94 refer to?",
      homework: "",
      teacherNotes: "",
      standards: "",
    },
    {
      dayOfWeek: 5,
      lessonNumber: 5,
      title: "First Multi-Camera Production",
      lessonType: "LIVE_PRODUCTION" as const,
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
      homework: "",
      teacherNotes: "This is the culminating Week 1 activity — first taste of running as a crew. Keep critique constructive.",
      standards: "",
    },
  ];

  for (const l of week1Lessons) {
    await prisma.lesson.upsert({
      where: { weekId_dayOfWeek: { weekId: week1.id, dayOfWeek: l.dayOfWeek } },
      update: {},
      create: {
        weekId: week1.id,
        dayOfWeek: l.dayOfWeek,
        lessonNumber: l.lessonNumber,
        orderIndex: l.lessonNumber,
        title: l.title,
        lessonType: l.lessonType,
        objective: l.objective,
        essentialQuestion: l.essentialQuestion,
        vocabulary: l.vocabulary,
        teacherPrep: l.teacherPrep,
        requiredEquipment: l.requiredEquipment,
        introduction: l.introduction,
        content: l.content,
        demonstration: l.demonstration,
        handsOnActivity: l.handsOnActivity,
        productionLab: l.productionLab,
        studentAssignmentText: l.studentAssignmentText,
        assessment: l.assessment,
        exitTicket: l.exitTicket,
        homework: l.homework,
        teacherNotes: l.teacherNotes,
        standards: l.standards,
      },
    });
  }

  // Skills
  let catIndex = 0;
  for (const [catName, skills] of Object.entries(SKILL_CATEGORIES)) {
    let category = await prisma.skillCategory.findFirst({
      where: { courseId: course.id, name: catName },
    });
    if (!category) {
      category = await prisma.skillCategory.create({
        data: { courseId: course.id, name: catName, orderIndex: catIndex },
      });
    }
    let skillIndex = 0;
    for (const skillName of skills) {
      const existing = await prisma.skill.findFirst({
        where: { categoryId: category.id, name: skillName },
      });
      if (!existing) {
        await prisma.skill.create({
          data: { categoryId: category.id, name: skillName, orderIndex: skillIndex },
        });
      }
      skillIndex++;
    }
    catIndex++;
  }

  // Production roles
  for (const role of PRODUCTION_ROLES) {
    await prisma.productionRoleDef.upsert({
      where: { courseId_name: { courseId: course.id, name: role.name } },
      update: { category: role.category },
      create: { courseId: course.id, name: role.name, category: role.category },
    });
  }

  // Grading categories
  for (const gc of GRADING_CATEGORIES) {
    const existing = await prisma.gradingCategory.findFirst({
      where: { courseId: course.id, name: gc.name },
    });
    if (!existing) {
      await prisma.gradingCategory.create({
        data: { courseId: course.id, name: gc.name, weightPct: gc.weightPct },
      });
    }
  }

  // Sample equipment
  const equipmentSeed = [
    { manufacturer: "Sony", model: "PXW-Z190", category: "CAMERAS" as const, quantity: 4, assetNumber: "CAM-01" },
    { manufacturer: "Blackmagic", model: "ATEM Mini Extreme", category: "VIDEO_SWITCHERS" as const, quantity: 2, assetNumber: "SW-01" },
    { manufacturer: "Shure", model: "SM7B", category: "MICROPHONES" as const, quantity: 3, assetNumber: "MIC-01" },
    { manufacturer: "Sennheiser", model: "EW 100 G4", category: "WIRELESS_AUDIO" as const, quantity: 2, assetNumber: "WA-01" },
    { manufacturer: "Manfrotto", model: "MVK502AM", category: "TRIPODS" as const, quantity: 6, assetNumber: "TRI-01" },
    { manufacturer: "Yamaha", model: "MG10XU", category: "AUDIO_MIXERS" as const, quantity: 1, assetNumber: "MIX-01" },
  ];
  for (const e of equipmentSeed) {
    const existing = await prisma.equipment.findFirst({
      where: { courseId: course.id, assetNumber: e.assetNumber },
    });
    if (!existing) {
      await prisma.equipment.create({ data: { ...e, courseId: course.id } });
    }
  }

  // Sample students
  const students = [
    { firstName: "Jordan", lastName: "Alvarez", classPeriod: "3rd Period" },
    { firstName: "Maya", lastName: "Chen", classPeriod: "3rd Period" },
    { firstName: "Ethan", lastName: "Brooks", classPeriod: "5th Period" },
    { firstName: "Sofia", lastName: "Ramirez", classPeriod: "5th Period" },
  ];
  const studentRecords = [];
  for (const s of students) {
    let student = await prisma.student.findFirst({
      where: { firstName: s.firstName, lastName: s.lastName },
    });
    if (!student) {
      student = await prisma.student.create({ data: s });
    }
    await prisma.courseEnrollment.upsert({
      where: { courseId_studentId: { courseId: course.id, studentId: student.id } },
      update: {},
      create: { courseId: course.id, studentId: student.id },
    });
    studentRecords.push(student);
  }

  // Sample project
  const existingProject = await prisma.project.findFirst({
    where: { name: "Weekly Announcements Broadcast" },
  });
  if (!existingProject) {
    const unit1 = unitRecords[1];
    const project = await prisma.project.create({
      data: {
        name: "Weekly Announcements Broadcast",
        description: "Student-run weekly announcements broadcast for the school.",
        objective: "Produce a 5-minute announcements segment using a rotating crew.",
        unitId: unit1.id,
        status: "PLANNING",
        deliverables: "Final edited video, published to school channel.",
      },
    });
    for (const s of studentRecords) {
      await prisma.projectMember.create({ data: { projectId: project.id, studentId: s.id } });
    }
  }

  // Sample practical test
  const existingTest = await prisma.practicalTest.findFirst({ where: { title: "Camera Practical Test" } });
  if (!existingTest) {
    await prisma.practicalTest.create({
      data: {
        title: "Camera Practical Test",
        description: "Baseline camera setup and configuration skills check.",
        items: {
          create: [
            { description: "Set camera to 1080p59.94", orderIndex: 1 },
            { description: "Set correct white balance", orderIndex: 2 },
            { description: "Set exposure", orderIndex: 3 },
            { description: "Set focus", orderIndex: 4 },
            { description: "Compose wide shot", orderIndex: 5 },
            { description: "Compose medium shot", orderIndex: 6 },
            { description: "Compose close-up", orderIndex: 7 },
            { description: "Connect SDI output", orderIndex: 8 },
          ],
        },
      },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
