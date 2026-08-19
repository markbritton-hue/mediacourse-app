/**
 * AI service abstraction for future generative features.
 * No provider is wired up yet — every method throws NotImplemented so
 * callers can build UI against a stable interface today and swap in a
 * real implementation (e.g. an Anthropic-backed AiService) later
 * without touching call sites.
 */

export interface GenerateLessonPlanInput {
  unitTitle: string;
  topic: string;
  durationMinutes: number;
}

export interface GenerateQuizInput {
  topic: string;
  questionCount: number;
}

export interface GenerateRubricInput {
  projectTitle: string;
  categories: string[];
}

export interface GenerateTroubleshootingScenarioInput {
  equipmentInvolved: string;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
}

export interface GenerateFeedbackInput {
  studentName: string;
  context: string;
}

export interface AiService {
  generateLessonPlan(input: GenerateLessonPlanInput): Promise<string>;
  generateQuiz(input: GenerateQuizInput): Promise<string>;
  generateAssignment(input: { topic: string }): Promise<string>;
  generateProjectRubric(input: GenerateRubricInput): Promise<string>;
  generateTroubleshootingScenario(
    input: GenerateTroubleshootingScenarioInput
  ): Promise<string>;
  generateVocabularyQuiz(input: { terms: string[] }): Promise<string>;
  generateSubstituteLesson(input: { lessonId: string }): Promise<string>;
  generateStudentFeedback(input: GenerateFeedbackInput): Promise<string>;
  generateProductionCritique(input: { projectId: string }): Promise<string>;
  generateModifiedAssignment(input: {
    assignmentId: string;
    level: string;
  }): Promise<string>;
}

class NotImplementedAiService implements AiService {
  private fail(name: string): never {
    throw new Error(
      `AI feature "${name}" is not implemented yet. This is planned future functionality.`
    );
  }
  generateLessonPlan() {
    return Promise.reject(this.fail("generateLessonPlan"));
  }
  generateQuiz() {
    return Promise.reject(this.fail("generateQuiz"));
  }
  generateAssignment() {
    return Promise.reject(this.fail("generateAssignment"));
  }
  generateProjectRubric() {
    return Promise.reject(this.fail("generateProjectRubric"));
  }
  generateTroubleshootingScenario() {
    return Promise.reject(this.fail("generateTroubleshootingScenario"));
  }
  generateVocabularyQuiz() {
    return Promise.reject(this.fail("generateVocabularyQuiz"));
  }
  generateSubstituteLesson() {
    return Promise.reject(this.fail("generateSubstituteLesson"));
  }
  generateStudentFeedback() {
    return Promise.reject(this.fail("generateStudentFeedback"));
  }
  generateProductionCritique() {
    return Promise.reject(this.fail("generateProductionCritique"));
  }
  generateModifiedAssignment() {
    return Promise.reject(this.fail("generateModifiedAssignment"));
  }
}

export const aiService: AiService = new NotImplementedAiService();
