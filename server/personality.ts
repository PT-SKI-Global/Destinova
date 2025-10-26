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

export interface EnneagramResult {
  type: number;
  wing: string;
  description: string;
  coreMotivation: string;
  coreFear: string;
  strengths: string[];
  challenges: string[];
  careerFit: string[];
}

export interface JungianFunctions {
  dominant: string;
  auxiliary: string;
  tertiary: string;
  inferior: string;
  descriptions: {
    [key: string]: string;
  };
}

export interface ProPsychResult extends PersonalityResult {
  jungianFunctions: JungianFunctions;
  enneagram: EnneagramResult;
  careerMatches: Array<{
    title: string;
    fitScore: number;
    reason: string;
  }>;
  preferredWorkEnvironment: string[];
  communicationStyle: string;
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
  // Enhanced MBTI calculation with 16 questions (4 per dimension)
  let E_score = 0; // Extraversion
  let I_score = 0; // Introversion
  let S_score = 0; // Sensing
  let N_score = 0; // iNtuition
  let T_score = 0; // Thinking
  let F_score = 0; // Feeling
  let J_score = 0; // Judging
  let P_score = 0; // Perceiving

  answers.forEach((answer) => {
    // Count each preference
    switch (answer.value) {
      case "E": E_score++; break;
      case "I": I_score++; break;
      case "S": S_score++; break;
      case "N": N_score++; break;
      case "T": T_score++; break;
      case "F": F_score++; break;
      case "J": J_score++; break;
      case "P": P_score++; break;
    }
  });

  // Determine MBTI type based on highest scores
  const mbti = 
    (E_score > I_score ? "E" : "I") +
    (N_score > S_score ? "N" : "S") +
    (T_score > F_score ? "T" : "F") +
    (J_score > P_score ? "J" : "P");

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

// Jungian Cognitive Functions mapping for each MBTI type
const JUNGIAN_FUNCTIONS: Record<string, JungianFunctions> = {
  "INTJ": {
    dominant: "Ni", auxiliary: "Te", tertiary: "Fi", inferior: "Se",
    descriptions: {
      "Ni": "Introverted Intuition - Visi jangka panjang, melihat pola tersembunyi",
      "Te": "Extraverted Thinking - Efisiensi, struktur, hasil terukur",
      "Fi": "Introverted Feeling - Nilai personal, integritas dalam",
      "Se": "Extraverted Sensing - Detail konkret, pengalaman sensorik"
    }
  },
  "INTP": {
    dominant: "Ti", auxiliary: "Ne", tertiary: "Si", inferior: "Fe",
    descriptions: {
      "Ti": "Introverted Thinking - Logika internal, analisis mendalam",
      "Ne": "Extraverted Intuition - Ide kreatif, kemungkinan tak terbatas",
      "Si": "Introverted Sensing - Memori detail, pengalaman masa lalu",
      "Fe": "Extraverted Feeling - Harmoni sosial, empati eksternal"
    }
  },
  "ENTJ": {
    dominant: "Te", auxiliary: "Ni", tertiary: "Se", inferior: "Fi",
    descriptions: {
      "Te": "Extraverted Thinking - Leadership, strategi bisnis efisien",
      "Ni": "Introverted Intuition - Visi strategis jangka panjang",
      "Se": "Extraverted Sensing - Action-oriented, responsif terhadap situasi",
      "Fi": "Introverted Feeling - Nilai internal yang kuat"
    }
  },
  "ENTP": {
    dominant: "Ne", auxiliary: "Ti", tertiary: "Fe", inferior: "Si",
    descriptions: {
      "Ne": "Extraverted Intuition - Inovasi, brainstorming",
      "Ti": "Introverted Thinking - Analisis logis, debugging mental",
      "Fe": "Extraverted Feeling - Charisma, membaca suasana",
      "Si": "Introverted Sensing - Konsistensi, rutinitas"
    }
  },
  "INFJ": {
    dominant: "Ni", auxiliary: "Fe", tertiary: "Ti", inferior: "Se",
    descriptions: {
      "Ni": "Introverted Intuition - Insight mendalam, visioner",
      "Fe": "Extraverted Feeling - Empati, harmoni kelompok",
      "Ti": "Introverted Thinking - Logika terstruktur",
      "Se": "Extraverted Sensing - Kesadaran lingkungan"
    }
  },
  "INFP": {
    dominant: "Fi", auxiliary: "Ne", tertiary: "Si", inferior: "Te",
    descriptions: {
      "Fi": "Introverted Feeling - Autentisitas, nilai kuat",
      "Ne": "Extraverted Intuition - Kemungkinan kreatif",
      "Si": "Introverted Sensing - Detail personal",
      "Te": "Extraverted Thinking - Organisasi eksternal"
    }
  },
  "ENFJ": {
    dominant: "Fe", auxiliary: "Ni", tertiary: "Se", inferior: "Ti",
    descriptions: {
      "Fe": "Extraverted Feeling - Inspirasi, membimbing orang",
      "Ni": "Introverted Intuition - Visi untuk masa depan",
      "Se": "Extraverted Sensing - Present-focused",
      "Ti": "Introverted Thinking - Analisis internal"
    }
  },
  "ENFP": {
    dominant: "Ne", auxiliary: "Fi", tertiary: "Te", inferior: "Si",
    descriptions: {
      "Ne": "Extraverted Intuition - Entusiasme, eksplorasi",
      "Fi": "Introverted Feeling - Autentik, passionate",
      "Te": "Extraverted Thinking - Efisiensi praktis",
      "Si": "Introverted Sensing - Tradisi, rutinitas"
    }
  },
  "ISTJ": {
    dominant: "Si", auxiliary: "Te", tertiary: "Fi", inferior: "Ne",
    descriptions: {
      "Si": "Introverted Sensing - Detail, akurasi, tradisi",
      "Te": "Extraverted Thinking - Efisiensi terstruktur",
      "Fi": "Introverted Feeling - Loyalitas, nilai personal",
      "Ne": "Extraverted Intuition - Kemungkinan baru"
    }
  },
  "ISFJ": {
    dominant: "Si", auxiliary: "Fe", tertiary: "Ti", inferior: "Ne",
    descriptions: {
      "Si": "Introverted Sensing - Protektif, detail-oriented",
      "Fe": "Extraverted Feeling - Caring, supportif",
      "Ti": "Introverted Thinking - Logika praktis",
      "Ne": "Extraverted Intuition - Inovasi"
    }
  },
  "ESTJ": {
    dominant: "Te", auxiliary: "Si", tertiary: "Ne", inferior: "Fi",
    descriptions: {
      "Te": "Extraverted Thinking - Administrator, organisator",
      "Si": "Introverted Sensing - Tradisi, prosedur",
      "Ne": "Extraverted Intuition - Adaptasi",
      "Fi": "Introverted Feeling - Nilai internal"
    }
  },
  "ESFJ": {
    dominant: "Fe", auxiliary: "Si", tertiary: "Ne", inferior: "Ti",
    descriptions: {
      "Fe": "Extraverted Feeling - Hospitality, harmoni",
      "Si": "Introverted Sensing - Mengingat preferensi orang",
      "Ne": "Extraverted Intuition - Kreativitas sosial",
      "Ti": "Introverted Thinking - Logika"
    }
  },
  "ISTP": {
    dominant: "Ti", auxiliary: "Se", tertiary: "Ni", inferior: "Fe",
    descriptions: {
      "Ti": "Introverted Thinking - Analisis mekanis",
      "Se": "Extraverted Sensing - Hands-on, praktis",
      "Ni": "Introverted Intuition - Problem-solving intuitif",
      "Fe": "Extraverted Feeling - Koneksi emosional"
    }
  },
  "ISFP": {
    dominant: "Fi", auxiliary: "Se", tertiary: "Ni", inferior: "Te",
    descriptions: {
      "Fi": "Introverted Feeling - Estetika, nilai artistik",
      "Se": "Extraverted Sensing - Pengalaman sensorik",
      "Ni": "Introverted Intuition - Kreativitas mendalam",
      "Te": "Extraverted Thinking - Struktur eksternal"
    }
  },
  "ESTP": {
    dominant: "Se", auxiliary: "Ti", tertiary: "Fe", inferior: "Ni",
    descriptions: {
      "Se": "Extraverted Sensing - Action, responsif",
      "Ti": "Introverted Thinking - Tactical thinking",
      "Fe": "Extraverted Feeling - Charisma natural",
      "Ni": "Introverted Intuition - Visi jangka panjang"
    }
  },
  "ESFP": {
    dominant: "Se", auxiliary: "Fi", tertiary: "Te", inferior: "Ni",
    descriptions: {
      "Se": "Extraverted Sensing - Entertainer, hidup saat ini",
      "Fi": "Introverted Feeling - Autentik, expressive",
      "Te": "Extraverted Thinking - Praktis",
      "Ni": "Introverted Intuition - Planning"
    }
  }
};

// Enneagram types data
const ENNEAGRAM_TYPES: Record<number, EnneagramResult> = {
  1: {
    type: 1, wing: "1w9 atau 1w2", 
    description: "The Reformer - Perfeksionis, berintegritas tinggi, fokus pada improvement",
    coreMotivation: "Menjadi baik, seimbang, dan berintegritas",
    coreFear: "Corrupt, tidak benar, atau cacat moral",
    strengths: ["Detail-oriented", "Ethical", "Reliable", "Organized"],
    challenges: ["Terlalu kritis", "Perfeksionis berlebihan", "Kaku"],
    careerFit: ["Quality Assurance", "Auditor", "Ethics Officer", "Editor", "Judge"]
  },
  2: {
    type: 2, wing: "2w1 atau 2w3",
    description: "The Helper - Empathetic, generous, people-oriented",
    coreMotivation: "Merasa dibutuhkan dan dihargai orang lain",
    coreFear: "Tidak dicintai atau tidak dibutuhkan",
    strengths: ["Empati tinggi", "Generosity", "People skills", "Supportif"],
    challenges: ["People-pleasing", "Mengabaikan kebutuhan sendiri"],
    careerFit: ["Counselor", "Nurse", "Teacher", "HR", "Social Worker"]
  },
  3: {
    type: 3, wing: "3w2 atau 3w4",
    description: "The Achiever - Success-oriented, adaptif, goal-driven",
    coreMotivation: "Merasa valuable dan worthwhile",
    coreFear: "Tidak bernilai tanpa prestasi",
    strengths: ["Goal-oriented", "Confident", "Efficient", "Adaptable"],
    challenges: ["Workaholic", "Image-focused"],
    careerFit: ["CEO", "Sales", "Marketing", "Entrepreneur", "Lawyer"]
  },
  4: {
    type: 4, wing: "4w3 atau 4w5",
    description: "The Individualist - Creative, sensitive, expressive",
    coreMotivation: "Menemukan diri sendiri dan significance",
    coreFear: "Tidak punya identitas unik",
    strengths: ["Creativity", "Emotional depth", "Authenticity", "Artistic"],
    challenges: ["Moody", "Self-absorbed"],
    careerFit: ["Artist", "Designer", "Writer", "Musician", "Therapist"]
  },
  5: {
    type: 5, wing: "5w4 atau 5w6",
    description: "The Investigator - Analytical, perceptive, independent",
    coreMotivation: "Memahami dunia dan kompeten",
    coreFear: "Incompetent atau overwhelmed",
    strengths: ["Analytical", "Innovative", "Independent", "Focused"],
    challenges: ["Detached", "Overthinking"],
    careerFit: ["Researcher", "Data Scientist", "Programmer", "Analyst", "Professor"]
  },
  6: {
    type: 6, wing: "6w5 atau 6w7",
    description: "The Loyalist - Responsible, trustworthy, security-oriented",
    coreMotivation: "Merasa aman dan didukung",
    coreFear: "Tanpa support atau guidance",
    strengths: ["Loyal", "Responsible", "Team player", "Prepared"],
    challenges: ["Anxious", "Suspicious"],
    careerFit: ["Project Manager", "Administrator", "Security", "Compliance", "Lawyer"]
  },
  7: {
    type: 7, wing: "7w6 atau 7w8",
    description: "The Enthusiast - Spontaneous, versatile, optimistic",
    coreMotivation: "Happy, fulfilled, dan mengalami berbagai hal",
    coreFear: "Terjebak dalam pain atau deprivation",
    strengths: ["Optimistic", "Versatile", "Spontaneous", "Energetic"],
    challenges: ["Impulsif", "Scattered focus"],
    careerFit: ["Entrepreneur", "Marketing", "Event Planner", "Travel Guide", "Designer"]
  },
  8: {
    type: 8, wing: "8w7 atau 8w9",
    description: "The Challenger - Powerful, assertive, protective",
    coreMotivation: "Self-reliant dan melindungi diri/orang lain",
    coreFear: "Dikontrol atau dikhianati",
    strengths: ["Leadership", "Decisive", "Confident", "Protective"],
    challenges: ["Dominating", "Confrontational"],
    careerFit: ["CEO", "Military Officer", "Lawyer", "Entrepreneur", "Union Leader"]
  },
  9: {
    type: 9, wing: "9w8 atau 9w1",
    description: "The Peacemaker - Agreeable, reassuring, complacent",
    coreMotivation: "Inner peace dan harmony",
    coreFear: "Konflik dan separation",
    strengths: ["Diplomatic", "Patient", "Accepting", "Supportive"],
    challenges: ["Avoidant", "Stubborn passively"],
    careerFit: ["Mediator", "Counselor", "HR", "Librarian", "Veterinarian"]
  }
};

// Calculate Enneagram based on MBTI and additional traits
export function calculateEnneagram(mbtiType: string): EnneagramResult {
  // Simplified mapping - in real implementation, would use separate questionnaire
  const mapping: Record<string, number> = {
    "INTJ": 5, "INTP": 5, "ENTJ": 8, "ENTP": 7,
    "INFJ": 4, "INFP": 4, "ENFJ": 2, "ENFP": 7,
    "ISTJ": 1, "ISFJ": 2, "ESTJ": 8, "ESFJ": 2,
    "ISTP": 9, "ISFP": 9, "ESTP": 7, "ESFP": 7
  };
  
  const enneagramType = mapping[mbtiType] || 5;
  return ENNEAGRAM_TYPES[enneagramType];
}

export function getJungianFunctions(mbtiType: string): JungianFunctions {
  return JUNGIAN_FUNCTIONS[mbtiType] || JUNGIAN_FUNCTIONS["INTJ"];
}

export function calculateProPsych(mbtiType: string): ProPsychResult {
  const basicResult = MBTI_TYPES[mbtiType] || MBTI_TYPES["INTJ"];
  const jungianFunctions = getJungianFunctions(mbtiType);
  const enneagram = calculateEnneagram(mbtiType);
  
  // Enhanced career matches with reasoning
  const careerMatches = basicResult.careerFit.slice(0, 5).map((career, idx) => ({
    title: career,
    fitScore: 90 - (idx * 5),
    reason: idx === 0 
      ? `Perfect match dengan ${jungianFunctions.dominant} dan ${enneagram.description.split(' - ')[0]} traits`
      : `Strong fit dengan MBTI ${mbtiType} preferences`
  }));
  
  // Work environment preferences based on MBTI
  const preferredWorkEnvironment: string[] = [];
  if (mbtiType[0] === 'E') preferredWorkEnvironment.push("Kolaborasi tim aktif");
  else preferredWorkEnvironment.push("Fokus mendalam individual");
  
  if (mbtiType[1] === 'N') preferredWorkEnvironment.push("Inovasi dan eksplorasi");
  else preferredWorkEnvironment.push("Prosedur jelas dan terstruktur");
  
  if (mbtiType[3] === 'J') preferredWorkEnvironment.push("Deadline dan planning yang jelas");
  else preferredWorkEnvironment.push("Fleksibilitas dan adaptasi");
  
  // Communication style
  let communicationStyle = "";
  if (mbtiType[2] === 'T') {
    communicationStyle = "Direct, logical, dan to-the-point. Fokus pada fakta dan solusi efisien.";
  } else {
    communicationStyle = "Empathetic, diplomatis, dan memperhatikan perasaan. Fokus pada harmoni dan dampak personal.";
  }
  
  return {
    ...basicResult,
    jungianFunctions,
    enneagram,
    careerMatches,
    preferredWorkEnvironment,
    communicationStyle
  };
}
