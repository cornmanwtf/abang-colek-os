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

export type EventPnL = {
  revenue: number;
  cogs: number;
  expenses: {
    fee: number;
    transport: number;
    staff: number;
    misc: number;
  };
};

export type Logistics = {
  travelDistanceKm: number;
  prepDays: number;
  crewCount: number;
  vehicle: "van" | "4x4" | "lorry" | "car";
};

export type EOContact = {
  name: string;
  phone: string;
  company: string;
};

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

  // New Fields
  eoContact?: EOContact;
  logistics?: Logistics;
  pnl?: EventPnL;
  invoices?: Invoice[]; // New
};

export type BoothChecklistItem = {
  id: string;
  label: string;
  required: boolean;
  done: boolean;
  assignedTo?: string; // New: who is doing this?
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

// ERP Models
export type InvoiceItem = {
  description: string;
  qty: number;
  price: number;
};

export type Invoice = {
  id: string;
  number: string;
  eventId: string;
  to: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  status: "DRAFT" | "SENT" | "PAID";
};

// Marketing Models
export type Participant = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  campaignId: string; // link to event or specific campaign
  wonPrize?: string;
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
  invoices: Invoice[];
  participants: Participant[]; // New
};
