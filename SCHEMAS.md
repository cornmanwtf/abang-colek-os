# Data Schemas (Draft)

The schemas below define the core data structures for the Founder Suite.

## TypeScript Interfaces
```ts
export type EventStatus = "lead" | "confirmed" | "completed" | "cancelled";

export type Event = {
  id: string;
  title: string;
  location: string;
  region: "MY" | "MY-SABAH" | "MY-SARAWAK" | "SG" | "BN";
  startDate: string; // ISO
  endDate: string; // ISO
  status: EventStatus;
  feeNote?: string;
  requirements?: string;
  eoContactId?: string;
  notes?: string;
};

export type EOContact = {
  id: string;
  name: string;
  company?: string;
  phone?: string;
  email?: string;
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

export type PrepItem = {
  id: string;
  name: string;
  qty?: string;
  notes?: string;
};

export type PrepList = {
  id: string;
  eventId: string;
  items: PrepItem[];
};

export type TravelPlan = {
  id: string;
  eventId: string;
  transport?: string;
  accommodation?: string;
  departAt?: string; // ISO
  returnAt?: string; // ISO
  notes?: string;
};

export type HookTemplate = {
  id: string;
  title: string;
  text: string;
  tags: string[];
};

export type ScriptTemplate = {
  id: string;
  title: string;
  structure: string;
  cta?: string;
};

export type ContentPlan = {
  id: string;
  eventId: string;
  date: string; // ISO
  hookIds: string[];
  shotList: string[];
  notes?: string;
};

export type Experiment = {
  id: string;
  title: string;
  hypothesis: string;
  metric: string;
  variantA: string;
  variantB: string;
  winner?: "A" | "B";
  notes?: string;
};

export type AuditEvent = {
  id: string;
  actorId: string;
  action: string;
  targetType: string;
  targetId: string;
  timestamp: string; // ISO
};

export type Task = {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
  dueDate?: string; // ISO
  assigneeId?: string;
  relatedEventId?: string;
};
```

## JSON Schema (Example: Event)
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Event",
  "type": "object",
  "required": ["id", "title", "location", "region", "startDate", "endDate", "status"],
  "properties": {
    "id": { "type": "string" },
    "title": { "type": "string" },
    "location": { "type": "string" },
    "region": {
      "type": "string",
      "enum": ["MY", "MY-SABAH", "MY-SARAWAK", "SG", "BN"]
    },
    "startDate": { "type": "string", "format": "date-time" },
    "endDate": { "type": "string", "format": "date-time" },
    "status": {
      "type": "string",
      "enum": ["lead", "confirmed", "completed", "cancelled"]
    },
    "feeNote": { "type": "string" },
    "requirements": { "type": "string" },
    "eoContactId": { "type": "string" },
    "notes": { "type": "string" }
  }
}
```
