export type DeckSlide = {
  id: string;
  title: string;
  body: string;
};

export type SongSection = {
  id: string;
  title: string;
  content: string;
};

export type SopItem = {
  id: string;
  title: string;
  content: string;
};

export type Tagline = {
  primary: string;
  alternatives: string[];
};

export type ManifestoVariant = {
  id: string;
  title: string;
  content: string;
};

export type EventStatus = "lead" | "confirmed" | "completed" | "cancelled";

export type Event = {
  id: string;
  title: string;
  location: string;
  region: "MY" | "MY-SABAH" | "MY-SARAWAK" | "SG" | "BN";
  startDate: string;
  endDate: string;
  status: EventStatus;
  feeNote?: string;
  requirements?: string;
  notes?: string;
};

export type BoothChecklistItem = {
  id: string;
  label: string;
  required: boolean;
  done: boolean;
};

export type BoothChecklist = {
  id: string;
  eventId: string;
  items: BoothChecklistItem[];
  notes?: string;
};

export type HookTemplate = {
  id: string;
  title: string;
  text: string;
  tags: string[];
};

export type ContentPlan = {
  id: string;
  eventId: string;
  date: string;
  hookIds: string[];
  shotList: string[];
  notes?: string;
};

export type PostEventReview = {
  id: string;
  eventId: string;
  salesNote: string;
  crowdNote: string;
  topHook: string;
  issueNote: string;
  nextAction: string;
  tiktokViews: number;
  watchTimeSeconds: number;
  createdAt: string;
};

export type BrandOSData = {
  deck: DeckSlide[];
  song: SongSection[];
  sop: SopItem[];
  tagline: Tagline;
  manifesto: ManifestoVariant[];
  events: Event[];
  boothChecklists: BoothChecklist[];
  hooks: HookTemplate[];
  contentPlans: ContentPlan[];
  postEventReviews: PostEventReview[];
};
