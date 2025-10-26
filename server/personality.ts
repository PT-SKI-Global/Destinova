// Personality quiz scoring and MBTI type calculation

export interface QuizAnswer {
  questionId: number;
  value: string;
}

export interface PersonalityResult {
  mbtiType: string;
  description: string;
  strengths: string[];
  careerFit: string[];
}

// MBTI type mapping based on quiz answers
const MBTI_TYPES: Record<string, PersonalityResult> = {
  "INTJ": {
    mbtiType: "INTJ",
    description: "The Architect - Strategic, analytical, and independent thinker.",
    strengths: ["Analytical thinking", "Strategic planning", "Problem solving", "Independence"],
    careerFit: ["Software Developer", "Data Scientist", "Engineer", "Strategist", "Researcher"]
  },
  "INTP": {
    mbtiType: "INTP",
    description: "The Logician - Innovative, curious, and theoretical.",
    strengths: ["Logical analysis", "Innovation", "Theoretical thinking", "Curiosity"],
    careerFit: ["Software Engineer", "Scientist", "Professor", "Analyst", "Architect"]
  },
  "ENTJ": {
    mbtiType: "ENTJ",
    description: "The Commander - Bold, imaginative, and strong-willed leader.",
    strengths: ["Leadership", "Strategic thinking", "Decisiveness", "Efficiency"],
    careerFit: ["CEO", "Manager", "Consultant", "Lawyer", "Entrepreneur"]
  },
  "ENTP": {
    mbtiType: "ENTP",
    description: "The Debater - Smart, curious, and loves intellectual challenges.",
    strengths: ["Innovation", "Quick thinking", "Adaptability", "Communication"],
    careerFit: ["Entrepreneur", "Consultant", "Marketing", "Inventor", "Lawyer"]
  },
  "INFJ": {
    mbtiType: "INFJ",
    description: "The Advocate - Quiet, mystical, and inspiring idealist.",
    strengths: ["Empathy", "Insight", "Creativity", "Idealism"],
    careerFit: ["Counselor", "Writer", "Teacher", "Designer", "Psychologist"]
  },
  "INFP": {
    mbtiType: "INFP",
    description: "The Mediator - Poetic, kind, and altruistic.",
    strengths: ["Creativity", "Empathy", "Idealism", "Open-mindedness"],
    careerFit: ["Writer", "Artist", "Counselor", "Teacher", "Designer"]
  },
  "ENFJ": {
    mbtiType: "ENFJ",
    description: "The Protagonist - Charismatic, inspiring, and natural leader.",
    strengths: ["Leadership", "Communication", "Empathy", "Organization"],
    careerFit: ["Teacher", "HR Manager", "Counselor", "Public Speaker", "Coach"]
  },
  "ENFP": {
    mbtiType: "ENFP",
    description: "The Campaigner - Enthusiastic, creative, and sociable.",
    strengths: ["Creativity", "Communication", "Enthusiasm", "Flexibility"],
    careerFit: ["Marketing", "Designer", "Entrepreneur", "Teacher", "Journalist"]
  },
  "ISTJ": {
    mbtiType: "ISTJ",
    description: "The Logistician - Practical, fact-minded, and reliable.",
    strengths: ["Organization", "Reliability", "Attention to detail", "Logic"],
    careerFit: ["Accountant", "Administrator", "Engineer", "Analyst", "Manager"]
  },
  "ISFJ": {
    mbtiType: "ISFJ",
    description: "The Defender - Dedicated, warm, and protector.",
    strengths: ["Reliability", "Empathy", "Attention to detail", "Dedication"],
    careerFit: ["Nurse", "Teacher", "Administrator", "Counselor", "Librarian"]
  },
  "ESTJ": {
    mbtiType: "ESTJ",
    description: "The Executive - Excellent administrator, organized and traditional.",
    strengths: ["Organization", "Leadership", "Decisiveness", "Practicality"],
    careerFit: ["Manager", "Administrator", "Lawyer", "Judge", "Military Officer"]
  },
  "ESFJ": {
    mbtiType: "ESFJ",
    description: "The Consul - Caring, social, and popular.",
    strengths: ["Social skills", "Organization", "Empathy", "Cooperation"],
    careerFit: ["Teacher", "Nurse", "HR", "Event Planner", "Social Worker"]
  },
  "ISTP": {
    mbtiType: "ISTP",
    description: "The Virtuoso - Bold, practical, and master of tools.",
    strengths: ["Technical skills", "Problem solving", "Practicality", "Adaptability"],
    careerFit: ["Engineer", "Mechanic", "Pilot", "Chef", "Craftsperson"]
  },
  "ISFP": {
    mbtiType: "ISFP",
    description: "The Adventurer - Flexible, charming, and artistic.",
    strengths: ["Creativity", "Flexibility", "Empathy", "Aesthetics"],
    careerFit: ["Artist", "Designer", "Musician", "Chef", "Photographer"]
  },
  "ESTP": {
    mbtiType: "ESTP",
    description: "The Entrepreneur - Smart, energetic, and perceptive.",
    strengths: ["Action-oriented", "Adaptability", "Problem solving", "Social skills"],
    careerFit: ["Entrepreneur", "Sales", "Marketing", "Paramedic", "Detective"]
  },
  "ESFP": {
    mbtiType: "ESFP",
    description: "The Entertainer - Spontaneous, energetic, and enthusiastic.",
    strengths: ["Social skills", "Enthusiasm", "Creativity", "Adaptability"],
    careerFit: ["Performer", "Teacher", "Sales", "Event Planner", "Designer"]
  }
};

export function calculateMBTI(answers: QuizAnswer[]): PersonalityResult {
  // Simplified MBTI calculation based on quiz answers
  // In a real implementation, you'd have more sophisticated scoring
  
  let E_I = 0; // Extraversion vs Introversion
  let S_N = 0; // Sensing vs Intuition
  let T_F = 0; // Thinking vs Feeling
  let J_P = 0; // Judging vs Perceiving

  answers.forEach((answer) => {
    // Map answers to MBTI dimensions
    if (answer.value === "team") E_I += 1;
    if (answer.value === "alone") E_I -= 1;
    if (answer.value === "intuition") S_N += 1;
    if (answer.value === "analyze") S_N -= 1;
    if (answer.value === "logic") T_F += 1;
    if (answer.value === "values") T_F -= 1;
    if (answer.value === "structured") J_P += 1;
    if (answer.value === "flexible") J_P -= 1;
  });

  const mbti = 
    (E_I > 0 ? "E" : "I") +
    (S_N > 0 ? "N" : "S") +
    (T_F > 0 ? "T" : "F") +
    (J_P > 0 ? "J" : "P");

  return MBTI_TYPES[mbti] || MBTI_TYPES["INTJ"];
}

export function getCareerCompatibility(mbtiType: string, career: string): number {
  const personality = MBTI_TYPES[mbtiType];
  if (!personality) return 50;

  // Check if career is in the career fit list
  const isDirectFit = personality.careerFit.some(fit => 
    career.toLowerCase().includes(fit.toLowerCase()) || 
    fit.toLowerCase().includes(career.toLowerCase())
  );

  if (isDirectFit) return 85 + Math.floor(Math.random() * 15); // 85-100%
  
  // Partial match based on career categories
  const techCareers = ["developer", "engineer", "programmer", "data", "tech"];
  const creativeCareers = ["designer", "artist", "writer", "creative"];
  const businessCareers = ["manager", "consultant", "entrepreneur", "business"];
  const socialCareers = ["teacher", "counselor", "nurse", "social"];

  const isTech = techCareers.some(t => career.toLowerCase().includes(t));
  const isCreative = creativeCareers.some(t => career.toLowerCase().includes(t));
  const isBusiness = businessCareers.some(t => career.toLowerCase().includes(t));
  const isSocial = socialCareers.some(t => career.toLowerCase().includes(t));

  // Simplified compatibility logic
  if (mbtiType.startsWith("INT") && isTech) return 70 + Math.floor(Math.random() * 15);
  if (mbtiType.startsWith("ENT") && isBusiness) return 70 + Math.floor(Math.random() * 15);
  if (mbtiType.startsWith("INF") && isCreative) return 70 + Math.floor(Math.random() * 15);
  if (mbtiType.startsWith("E") && isSocial) return 70 + Math.floor(Math.random() * 15);

  return 50 + Math.floor(Math.random() * 20); // 50-70% base compatibility
}
