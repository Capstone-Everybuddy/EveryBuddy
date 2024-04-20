export const matchingInfo = {
  language: ['Korean', 'English', 'Chinese', 'Japanese', 'French', 'Spanish'],
  personality: [
    'Calm',
    'Active',
    'Sociable',
    'Friendly',
    'Proactive',
    'Delicate',
    'Considerate',
    'Cooperative',
    'Humorous',
    'Attentive',
  ],
  hobby: [
    'Reading',
    'Exercise',
    'Shopping',
    'Sightseeing/Traveling',
    'Cooking',
    'Movies',
    'Foodie Adventures',
    'Exhibition/Performance Visits',
    'Gaming',
  ],
  wanttodo: [
    'Language Exchange',
    'Sightseeing',
    'School Adaptation',
    'Socializing',
    'Academic Activities',
  ],
  sex: ['female', 'male'],
  major: [
    'Urban Sciences (도시과학대학)',
    'Economics and Political Science (정경대학)',
    'Business (경영대학)',
    'Natural Sciences (자연과학대학)',
    'Engineering (공과대학)',
    'Humanities (인문대학)',
    'Arts and Sports (예술체육대학)',
    'Free Convergence (자유융합대학)',
  ],
  continent: ['Asia'],
};

export type MatchingInfoKeys = keyof typeof matchingInfo;

// 각 선호 항목의 순위를 위한 객체
// 서울메이트와 버디에 따라 달라야함 우선 버디기준으로 (continent 추가)!
export const preferenceOptions = {
  language: 0,
  personality: 0,
  hobby: 0,
  wanttodo: 0,
  sex: 0,
  major: 0,
  continent: 0,
};

export const preferenceOptionsList = {
  language: [] as number[],
  personality: [] as number[],
  hobby: [] as number[],
  wanttodo: [] as number[],
  sex: [] as number[],
  major: [] as number[],
  continent: [] as number[],
};

// language ⇒ 1)Korean, 2)English, 3)Chinese, 4)Japanese, 5)French, 6)Spanish
// personality ⇒ 1)Calm, 2)Active, 3)Sociable, 4)Friendly, 5)Proactive, 6)Delicate, 7)Considerate, 8)Cooperative, 9)Humorous, 10)Attentive
// hobby ⇒ 1)Reading, 2)Exercise, 3)Shopping, 4)Sightseeing/Traveling, 5)Cooking, 6)Movies, 7)Foodie Adventures, 8)Exhibition/Performance Visits, 9)Gaming
// wanttodo ⇒ 1)Language Exchange, 2)Sightseeing, 3)School Adaptation, 4)Socializing, 5)Academic Activities
// sex ⇒ 1) female, 2) male

// major
// Urban Sciences (도시과학대학)
// Economics and Political Science (정경대학)
// Business (경영대학)
// Natural Sciences (자연과학대학)
// Engineering (공과대학)
// Humanities (인문대학)
// Arts and Sports (예술체육대학)
// Free Convergence (자유융합대학)
