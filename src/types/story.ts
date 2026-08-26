export interface RecipientInfo {
  name: string;
  nickname?: string;
  birthDate: {
    day: number;
    month: number;
    year: number;
  };
}

export interface MemoryItem {
  id: string;
  image: string;
  dateText?: string;
  title: string;
  caption: string;
  accentColor?: string;
}

export interface FragmentItem {
  id: string;
  type: 'matcha' | 'flower' | 'coffee' | 'music' | 'sunset' | 'book';
  title: string;
  caption: string;
  image: string;
  details?: string;
}

export interface StoryMilestone {
  id: string;
  chapter: string;
  title: string;
  quote: string;
}

export interface StoryConfig {
  recipient: RecipientInfo;
  intro: {
    mysteriousPrompt: string;
    touchPrompt: string;
    arrivedMessage: string;
  };
  memories: MemoryItem[];
  fragments: FragmentItem[];
  storyPath: StoryMilestone[];
  wishes: string[];
  candle: {
    instruction: string;
    buttonText: string;
    promptAfterBlow?: string;
  };
  explosion: {
    title: string;
    subtitle: string;
  };
  secretEnding: {
    triggerText: string;
    letterTitle: string;
    letterContent: string[];
    closing: string;
    signature: string;
    secretPhoto?: string;
    giftPrompt?: string;
    giftUrl?: string;
  };
  finalMessage: {
    lines: string[];
  };
}
