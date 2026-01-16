# 🌶️ WhatsApp OPS Control System (WOCS)

## Abang Colek Brand OS - Command Center Module

> **\"Rasa Padu, Pedas Menggamit\"** - by Liurleleh House

**Version:** 1.0  
**Status:** Specification  
**Last Updated:** 2026-01-16

---

## 1. Executive Summary

**WOCS** transforms WhatsApp into a complete command center for Abang Colek operations. The founder/admin controls ALL digital operations via WhatsApp messages - no dashboard login required.

### Core Principle

```
WhatsApp Message → Command Parser → Task Engine → Execution → Feedback
```

---

## 2. System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     ADMIN WHATSAPP                              │
│              (Text / Image / Voice / Video)                     │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                  META CLOUD API (Official)                      │
│         graph.facebook.com/v18.0/{phone_id}/messages            │
└─────────────────────────────────────────────────────────────────┘
                              ↓ (Webhook)
┌─────────────────────────────────────────────────────────────────┐
│                    WOCS SERVER (Node.js)                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  Webhook    │  │  Whitelist  │  │   Access    │             │
│  │  Handler    │  │   Guard     │  │   Token     │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    COMMAND PARSER                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Text      │  │   Voice     │  │   Media     │             │
│  │   Parser    │  │   (Whisper) │  │   Handler   │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    TASK ENGINE                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Queue     │  │   Executor  │  │   Scheduler │             │
│  │   (Redis)   │  │   Router    │  │   (Cron)    │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    EXECUTORS                                    │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐       │
│  │ Agent  │ │Landing │ │Web App │ │TikTok  │ │Content │       │
│  │ Tasks  │ │  CMS   │ │ Config │ │  Bot   │ │ Post   │       │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│              FEEDBACK → CLOUD API → WHATSAPP                    │
│         (Status / Error / Confirmation / Screenshot)            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **WhatsApp Client** | **WhatsApp Cloud API (Official)** | FREE for admin commands, 99.9% SLA, no ban risk |
| Queue | Redis + BullMQ | Task queue with priority, retry, backoff |
| Database | PostgreSQL | Tasks, users, chats, audit logs |
| Cache | Redis | Session, rate limiting |
| Voice-to-Text | faster-whisper (FREE) | Local voice note transcription |
| Media Storage | Local / Cloudflare R2 | Images, videos, attachments |
| Agent Panel | React + Vite + Socket.io | Real-time task management |
| Backend API | Node.js (Fastify) | REST + WebSocket |
| Scheduler | node-cron | Scheduled tasks |
| TikTok Automation | Playwright | Semi-automated posting |

### 3.1 Why WhatsApp Cloud API (Official)?

| Criteria | Cloud API (Official) | whatsapp-web.js (Unofficial) |
|----------|----------------------|------------------------------|
| 🔒 **Risk Ban** | **0%** | High |
| ✅ **Verified Badge** | **Ya** | Tidak |
| � **Admin Commands** | **FREE ∞** | FREE |
| 📞 **Voice Notes** | **Ya** | Ya |
| 🚀 **Reliability** | **99.9% SLA** | Unstable |
| 📚 **Support** | **Official Meta** | Community only |
| 🤖 **ToS Compliant** | **100%** | Melanggar |

### 3.2 Cloud API Pricing (Malaysia - July 2025)

| Message Type | Cost | Notes |
|--------------|------|-------|
| **Service (Admin-initiated)** | **FREE ∞** | ✅ Admin hantar command = FREE |
| **Bot Reply (24h window)** | **FREE ∞** | ✅ Semua reply dalam 24h = FREE |
| **Click-to-WA Ad** | **FREE 72h** | ✅ Dari ads = FREE |
| Marketing Template | ~RM 0.40/msg | Broadcast promo |
| Utility Template | ~RM 0.07/msg | Order updates |
| Authentication | ~RM 0.07/msg | OTP |

> **💡 Untuk WOCS (Admin Command Center) = 100% FREE!**
>
> Admin message first → Bot reply dalam 24h → Unlimited FREE messages

### 3.3 Cloud API Setup Requirements

1. **Meta Business Account** (FREE)
2. **Facebook App** with WhatsApp product (FREE)
3. **Phone Number** verified (FREE test number provided)
4. **Webhook Endpoint** for receiving messages
5. **Access Token** from Meta Developer Portal

---

## 4. Command Grammar Specification

### 4.1 Global Rules

| Rule | Description |
|------|-------------|
| Prefix | All commands start with `/` |
| Format | Multiline `key: value` pairs |
| Case | Case-insensitive |
| Attachments | Image/Video/Voice = context data |
| Confirmation | High-risk commands require `CONFIRM TASK-XXX` |

### 4.2 Command Categories

#### 📋 AGENT TASK COMMANDS

```
/agent task
to: ali
type: followup | reply | call | visit | create_ticket
target: 019XXXXXXX
priority: high | normal | low
deadline: 2h | today | tomorrow
note: Customer minta price list
```

```
/agent list
status: pending | done | all
```

```
/agent reassign
task: TASK-1201
to: bob
```

---

#### 🌐 LANDING PAGE COMMANDS

```
/landing create
page: promo-raya
title: Promo Raya Gila!
desc: Diskaun sampai 50%
cta: Order Sekarang
schedule: 2026-01-20 08:00
```

📎 *attach image*

```
/landing edit
page: promo-raya
field: headline | description | cta | image | status
value: Promo Terbesar Tahun Ini 🔥
```

```
/landing publish
page: promo-raya
```

```
/landing unpublish
page: promo-raya
```

```
/landing rollback
page: promo-raya
version: -1
```

```
/landing list
status: draft | published | all
```

---

#### 🖥️ WEB APP CONFIG COMMANDS

```
/app update
app: checkout | catalog | booking
key: max_qty | min_order | feature_flag
value: 5
```

```
/app feature
name: dark_mode | promo_banner | new_menu
action: enable | disable
```

```
/app deploy
branch: main | staging
```

---

#### 🎥 TIKTOK COMMANDS (Semi-Auto)

```
/tiktok post
caption: Pedas ni jujur 🔥 #AbangColek #StreetFood
schedule: now | 2026-01-20 20:00
```

📎 *attach video*

```
/tiktok edit
video_id: 73920123
caption: Jangan lupa follow untuk deal seterusnya 🔥
```

```
/tiktok delete
video_id: 73920123
reason: wrong content
```

```
/tiktok stats
period: today | week | month
```

---

#### 📱 CONTENT COMMANDS

```
/content schedule
platform: tiktok | instagram | all
date: 2026-01-20
slots: 3
type: reaction | behind_scene | promo
```

```
/content caption
type: reaction | promo | event
tone: funny | hype | informative
```

```
/content hashtag
niche: street_food | malaysia | viral
count: 10
```

---

#### 📊 REPORT COMMANDS

```
/report daily
date: today | yesterday | 2026-01-15
```

```
/report event
event_id: EVT-101
```

```
/report sales
period: today | week | month
```

```
/report content
platform: tiktok | all
period: week
```

---

#### ⚙️ SYSTEM COMMANDS

```
/status
```

```
/help
category: agent | landing | tiktok | app | content | report
```

```
/queue
status: pending | running | failed
```

```
/retry
task: TASK-1201
```

```
/cancel
task: TASK-1201
```

---

### 4.3 Voice Command System (FREE - Self-Hosted Whisper)

#### Tech Stack (100% FREE)

| Component | Option | Notes |
|-----------|--------|-------|
| **faster-whisper** | Python | ⭐ Recommended - Fast, CPU-friendly |
| **whisper.cpp** | C++ | Lighter, good for low-spec servers |
| **whisper (original)** | Python | Requires GPU for speed |

#### Hardware Requirements (Minimum)

| Spec | Requirement |
|------|-------------|
| CPU | Intel i5+ / Ryzen 5+ |
| RAM | 8GB minimum (16GB recommended) |
| Storage | 2GB for model files |
| GPU | Optional (speeds up 5-10x) |

**Your PC (i7-4770, 32GB RAM) = ✅ More than enough!**

#### Installation

```bash
# Option 1: faster-whisper (Recommended)
pip install faster-whisper

# Option 2: whisper.cpp (via Python binding)
pip install pywhispercpp

# Option 3: Original OpenAI Whisper
pip install openai-whisper
```

#### Model Selection

| Model | Size | Speed (30s audio) | Accuracy |
|-------|------|-------------------|----------|
| `tiny` | 74MB | ~2s | ⭐⭐ |
| `base` | 142MB | ~3s | ⭐⭐⭐ |
| `small` | 461MB | ~5s | ⭐⭐⭐⭐ |
| `medium` | 1.5GB | ~15s | ⭐⭐⭐⭐⭐ |

**Recommended: `small` model** - Best balance untuk Bahasa Melayu + English

#### Implementation Code

```python
# voice_transcriber.py
from faster_whisper import WhisperModel
import tempfile
import os

class VoiceTranscriber:
    def __init__(self, model_size="small"):
        # Load model once at startup
        self.model = WhisperModel(
            model_size, 
            device="cpu",  # Use "cuda" if GPU available
            compute_type="int8"  # Faster on CPU
        )
    
    async def transcribe(self, audio_buffer: bytes) -> str:
        """
        Transcribe audio buffer to text
        Supports: ogg, opus, wav, mp3
        """
        # Save buffer to temp file
        with tempfile.NamedTemporaryFile(suffix=".ogg", delete=False) as f:
            f.write(audio_buffer)
            temp_path = f.name
        
        try:
            # Transcribe
            segments, info = self.model.transcribe(
                temp_path,
                language="ms",  # Malay, or "en" for English
                task="transcribe"
            )
            
            # Combine segments
            text = " ".join([segment.text for segment in segments])
            return text.strip()
            
        finally:
            # Cleanup
            os.unlink(temp_path)

# Usage
transcriber = VoiceTranscriber("small")
text = await transcriber.transcribe(audio_bytes)
# Result: "landing create promo raya title promo gila"
```

#### Integration with WhatsApp Cloud API (Node.js)

```typescript
// webhook_handler.ts - Receive messages from Cloud API
import { spawn } from 'child_process';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;

// Webhook endpoint to receive messages
app.post('/webhook', async (req, res) => {
  const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  
  if (message?.type === 'audio') {
    const audioId = message.audio.id;
    const text = await transcribeVoiceNote(audioId);
    // Process command...
  }
  
  res.sendStatus(200);
});

async function transcribeVoiceNote(audioId: string): Promise<string> {
  // 1. Get media URL from Cloud API
  const mediaUrl = await getMediaUrl(audioId);
  
  // 2. Download audio file
  const response = await axios.get(mediaUrl, {
    headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` },
    responseType: 'arraybuffer'
  });
  
  // 3. Save to temp file
  const tempPath = path.join('/tmp', `voice_${Date.now()}.ogg`);
  fs.writeFileSync(tempPath, response.data);
  
  // 4. Transcribe with faster-whisper
  return new Promise((resolve, reject) => {
    const python = spawn('python', ['transcribe.py', tempPath]);
    let output = '';
    
    python.stdout.on('data', (data) => output += data.toString());
    python.on('close', (code) => {
      fs.unlinkSync(tempPath);
      code === 0 ? resolve(output.trim()) : reject(new Error('Transcription failed'));
    });
  });
}

async function getMediaUrl(mediaId: string): Promise<string> {
  const response = await axios.get(
    `https://graph.facebook.com/v18.0/${mediaId}`,
    { headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` }}
  );
  return response.data.url;
}

// Send reply back to admin
async function sendReply(to: string, message: string) {
  await axios.post(
    `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`,
    {
      messaging_product: 'whatsapp',
      to: to,
      type: 'text',
      text: { body: message }
    },
    { headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` }}
  );
}
```

#### Voice Command Flow (Complete)

```
🎤 Admin hantar voice note
         ↓
📥 Baileys download audio (ogg/opus)
         ↓
💾 Save to temp file
         ↓
🤖 Bot reply: "🎙️ Memproses audio..."
         ↓
� faster-whisper transcribe (local, FREE)
         ↓
� Result: "landing create promo raya title promo gila diskaun 50 peratus"
         ↓
🔍 Command Parser normalize text
         ↓
🤖 Bot reply: "🗣️ Dikesan:
        /landing create
        page: promo-raya
        title: Promo Gila
        desc: Diskaun 50%
        
        Reply YA untuk teruskan
        Reply BATAL untuk cancel"
         ↓
👤 Admin: "YA"
         ↓
✅ Task created: TASK-1205
```

#### Voice Command Tips untuk Admin

Untuk accuracy lebih baik, cakap dengan pattern ini:

| ❌ Avoid | ✅ Better |
|----------|-----------|
| "Buat landing promo tu" | "Landing create page promo raya title Promo Raya" |
| "Post kat TikTok" | "TikTok post caption pedas gila hashtag abang colek" |
| "Suruh Ali follow up" | "Agent task to Ali type follow up target 019 xxx" |

#### Language Support

| Language | Code | Accuracy |
|----------|------|----------|
| Malay (BM) | `ms` | ⭐⭐⭐⭐ |
| English | `en` | ⭐⭐⭐⭐⭐ |
| Mixed (Rojak) | auto | ⭐⭐⭐ |

#### Cost Summary

| Component | Cost |
|-----------|------|
| Whisper Model | FREE (open-source) |
| Processing | FREE (local CPU) |
| Storage | ~500MB for model |
| API Calls | $0 |

**Total: RM 0 / bulan** 🎉

---

## 5. Database Schema

### 5.1 Core Tables

```sql
-- Users & Roles
CREATE TABLE users (
  id UUID PRIMARY KEY,
  name VARCHAR(100),
  role ENUM('admin', 'agent', 'viewer'),
  wa_number VARCHAR(20) UNIQUE,
  status ENUM('active', 'inactive'),
  created_at TIMESTAMP
);

-- WhatsApp Sessions
CREATE TABLE wa_sessions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  session_data JSONB,
  last_active TIMESTAMP,
  status ENUM('connected', 'disconnected', 'banned')
);

-- Tasks
CREATE TABLE tasks (
  id VARCHAR(20) PRIMARY KEY, -- TASK-XXXX
  type VARCHAR(50), -- agent_task, landing_create, tiktok_post
  command_raw TEXT,
  payload JSONB,
  status ENUM('pending', 'awaiting_approval', 'running', 'done', 'failed', 'cancelled', 'rolled_back'),
  priority ENUM('high', 'normal', 'low') DEFAULT 'normal',
  requested_by UUID REFERENCES users(id),
  assigned_to UUID REFERENCES users(id),
  scheduled_at TIMESTAMP,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  error_message TEXT,
  retry_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Task Logs (Audit Trail)
CREATE TABLE task_logs (
  id UUID PRIMARY KEY,
  task_id VARCHAR(20) REFERENCES tasks(id),
  action VARCHAR(50), -- created, approved, started, completed, failed, retried
  actor_id UUID REFERENCES users(id),
  details JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Attachments
CREATE TABLE attachments (
  id UUID PRIMARY KEY,
  task_id VARCHAR(20) REFERENCES tasks(id),
  type ENUM('image', 'video', 'audio', 'document'),
  original_name VARCHAR(255),
  storage_url TEXT,
  mime_type VARCHAR(100),
  size_bytes BIGINT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Landing Page Versions
CREATE TABLE landing_versions (
  id UUID PRIMARY KEY,
  page_slug VARCHAR(100),
  version INT,
  content JSONB,
  status ENUM('draft', 'published', 'archived'),
  published_at TIMESTAMP,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- App Config
CREATE TABLE app_configs (
  id UUID PRIMARY KEY,
  app_name VARCHAR(50),
  config_key VARCHAR(100),
  config_value JSONB,
  updated_by UUID REFERENCES users(id),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(app_name, config_key)
);

-- Customer Chats
CREATE TABLE chats (
  id UUID PRIMARY KEY,
  wa_chat_id VARCHAR(50) UNIQUE,
  customer_name VARCHAR(100),
  customer_number VARCHAR(20),
  assigned_agent UUID REFERENCES users(id),
  status ENUM('open', 'pending', 'closed'),
  last_message_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Chat Messages
CREATE TABLE messages (
  id UUID PRIMARY KEY,
  chat_id UUID REFERENCES chats(id),
  sender_type ENUM('customer', 'agent', 'bot'),
  sender_id UUID,
  content TEXT,
  media_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 6. Task Engine Specification

### 6.1 Task Lifecycle

```
┌─────────┐    ┌──────────────────┐    ┌─────────┐
│ PENDING │───▶│ AWAITING_APPROVAL│───▶│ RUNNING │
└─────────┘    └──────────────────┘    └─────────┘
                      │                     │
                      ▼                     ▼
               ┌──────────┐         ┌──────────────┐
               │ CANCELLED│         │ DONE / FAILED│
               └──────────┘         └──────────────┘
                                          │
                                          ▼
                                   ┌─────────────┐
                                   │ ROLLED_BACK │
                                   └─────────────┘
```

### 6.2 Task Engine Pseudo-Code

```typescript
// Message Handler
async function onWhatsAppMessage(msg: WAMessage) {
  // 1. Validate sender
  const user = await validateWhitelist(msg.from);
  if (!user) return sendReply(msg, "❌ Unauthorized");
  
  // 2. Parse command
  const command = await parseCommand(msg);
  if (!command.valid) return sendReply(msg, `❌ ${command.error}`);
  
  // 3. Create task
  const task = await createTask({
    type: command.type,
    payload: command.payload,
    attachments: msg.attachments,
    requestedBy: user.id,
    priority: command.priority || 'normal'
  });
  
  // 4. Check if approval needed
  if (requiresApproval(task.type)) {
    await updateTaskStatus(task.id, 'awaiting_approval');
    await notifyAgents(task);
    return sendReply(msg, `⏳ Task ${task.id} awaiting approval`);
  }
  
  // 5. Enqueue for execution
  await taskQueue.add(task.id, { priority: task.priority });
  return sendReply(msg, `✅ Task ${task.id} created\nStatus: Pending`);
}

// Task Worker
async function processTask(taskId: string) {
  const task = await getTask(taskId);
  
  try {
    await updateTaskStatus(taskId, 'running');
    await logTaskAction(taskId, 'started');
    
    // Route to executor
    const result = await executeTask(task);
    
    await updateTaskStatus(taskId, 'done', result);
    await logTaskAction(taskId, 'completed', result);
    await notifyAdmin(task, 'completed', result);
    
  } catch (error) {
    await updateTaskStatus(taskId, 'failed', error.message);
    await logTaskAction(taskId, 'failed', error);
    await notifyAdmin(task, 'failed', error);
    
    // Auto-retry logic
    if (task.retryCount < 3) {
      await scheduleRetry(taskId, task.retryCount + 1);
    }
  }
}

// Executor Router
async function executeTask(task: Task) {
  const executors = {
    'agent_task': AgentExecutor,
    'landing_create': LandingExecutor,
    'landing_edit': LandingExecutor,
    'app_update': AppConfigExecutor,
    'tiktok_post': TikTokExecutor,
    'tiktok_edit': TikTokExecutor,
    'content_schedule': ContentExecutor,
    'report_generate': ReportExecutor,
  };
  
  const executor = executors[task.type];
  if (!executor) throw new Error(`Unknown task type: ${task.type}`);
  
  return executor.execute(task);
}
```

---

## 7. Executor Specifications

### 7.1 Landing Page Executor (AUTO)

```typescript
class LandingExecutor {
  async execute(task: Task) {
    switch (task.type) {
      case 'landing_create':
        // 1. Upload attachments to S3
        const imageUrl = await uploadToS3(task.attachments[0]);
        
        // 2. Create version
        const version = await createLandingVersion({
          pageSlug: task.payload.page,
          content: {
            title: task.payload.title,
            description: task.payload.desc,
            cta: task.payload.cta,
            image: imageUrl
          },
          status: task.payload.schedule ? 'draft' : 'published'
        });
        
        // 3. Schedule if needed
        if (task.payload.schedule) {
          await schedulePublish(version.id, task.payload.schedule);
        }
        
        // 4. Clear CDN cache
        await invalidateCDNCache(`/landing/${task.payload.page}`);
        
        return { versionId: version.id, url: `/landing/${task.payload.page}` };
        
      case 'landing_edit':
        // Similar with field-specific update
        break;
        
      case 'landing_rollback':
        // Restore previous version
        break;
    }
  }
}
```

### 7.2 TikTok Executor (SEMI-AUTO)

```typescript
class TikTokExecutor {
  async execute(task: Task) {
    // TikTok requires manual/semi-auto due to no official API
    
    switch (task.type) {
      case 'tiktok_post':
        // 1. Store content for agent
        const content = {
          video: task.attachments[0],
          caption: task.payload.caption,
          scheduledFor: task.payload.schedule
        };
        
        // 2. Create sub-task for agent
        const agentTask = await createTask({
          type: 'agent_tiktok_post',
          payload: content,
          assignedTo: await getAvailableAgent()
        });
        
        // 3. Wait for agent completion
        // Agent will use Playwright/Android to post
        
        return { agentTaskId: agentTask.id, status: 'waiting_agent' };
        
      case 'tiktok_edit':
        // Edit requires API or automation
        // For now, create agent task
        break;
    }
  }
}
```

### 7.3 Agent Executor (HUMAN)

```typescript
class AgentExecutor {
  async execute(task: Task) {
    // 1. Assign to agent
    const agent = task.assignedTo || await findBestAgent(task);
    await assignTaskToAgent(task.id, agent.id);
    
    // 2. Notify via WebSocket
    await notifyAgentPanel(agent.id, task);
    
    // 3. Notify via WhatsApp
    await sendWhatsApp(agent.waNumber, 
      `📋 New Task: ${task.id}\nType: ${task.type}\nPriority: ${task.priority}`
    );
    
    // Agent will complete manually via panel
    return { status: 'assigned', agent: agent.name };
  }
}
```

---

## 8. Agent Panel Specification

### 8.1 Pages

| Page | Purpose |
|------|---------|
| `/login` | WhatsApp QR authentication |
| `/inbox` | Task inbox with filters |
| `/task/:id` | Task detail & execution |
| `/chats` | Customer chat list |
| `/chat/:id` | Chat view with quick replies |
| `/logs` | Audit log viewer |

### 8.2 Features

- ✅ Real-time task updates (Socket.io)
- ✅ Task locking (one agent per task)
- ✅ Quick reply templates
- ✅ Task timer (SLA tracking)
- ✅ Approval workflow
- ✅ Bulk actions
- ✅ Mobile responsive

### 8.3 UI Components

```
┌────────────────────────────────────────────────────────┐
│  AGENT PANEL                        Ali 🟢   Logout    │
├────────────────────────────────────────────────────────┤
│  [Inbox] [Chats] [Logs]                    🔍 Search   │
├────────────────────────────────────────────────────────┤
│                                                        │
│  TASK INBOX                          Filter: All ▼     │
│  ┌──────────────────────────────────────────────────┐  │
│  │ 🔴 TASK-1201 | TikTok Post | HIGH | 2m ago       │  │
│  │ 🟡 TASK-1200 | Landing Edit | NORMAL | 15m ago   │  │
│  │ 🟢 TASK-1199 | Agent Follow-up | LOW | 1h ago    │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  ──────────────────────────────────────────────────── │
│                                                        │
│  TASK DETAIL: TASK-1201                               │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Type: TikTok Post                                │  │
│  │ Caption: Pedas ni jujur 🔥                       │  │
│  │ Video: [Preview]                                 │  │
│  │ Status: AWAITING_APPROVAL                        │  │
│  │                                                  │  │
│  │ [✅ APPROVE] [❌ REJECT] [✏️ EDIT]              │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
└────────────────────────────────────────────────────────┘
```

---

## 9. Security & Anti-Ban Measures

### 9.1 WhatsApp Safety

| Measure | Implementation |
|---------|----------------|
| Whitelist | Only registered admin numbers can send commands |
| Rate Limit | Max 20 commands/minute per user |
| Send Delay | Random 3-15 second delay between outgoing messages |
| Single Session | One device per number |
| Stable IP | Fixed VPS IP, no VPN rotation |
| No Broadcast | Never bulk send to multiple numbers |
| Human Patterns | Vary message timing and format |

### 9.2 System Security

| Measure | Implementation |
|---------|----------------|
| Authentication | JWT with refresh tokens |
| Role-Based Access | Admin > Agent > Viewer |
| Audit Trail | Log all actions with actor, timestamp, details |
| Encryption | TLS everywhere, encrypt sensitive data at rest |
| Backup | Daily database backup, 30-day retention |
| Rate Limiting | API rate limits per user |

### 9.3 High-Risk Task Approval

Tasks requiring confirmation:

- `tiktok_post`
- `tiktok_delete`
- `landing_publish` (production)
- `app_deploy`
- `agent_task` with `priority: high`

---

## 10. Feedback Messages

### 10.1 Status Templates

```
✅ TASK-1201 created
Type: Landing Create
Page: promo-raya
Status: Pending
ETA: ~2 minutes
```

```
⏳ TASK-1201 awaiting approval
Assigned to: Ali
Reply: CONFIRM TASK-1201 to approve
```

```
🔄 TASK-1201 running
Started: 2 seconds ago
```

```
✅ TASK-1201 completed
Duration: 45s
Result: Landing page published
URL: https://abangcolek.my/promo-raya
```

```
❌ TASK-1201 failed
Error: Image upload failed
Retry: /retry TASK-1201
```

---

## 11. Advanced Features

### 11.1 Scheduled Tasks

```
/schedule
task: /landing publish page: promo-raya
at: 2026-01-20 08:00
repeat: once | daily | weekly
```

### 11.2 Task Templates

```
/template create
name: event_prep
commands:
- /landing create page: {event_name}
- /content schedule date: {event_date} slots: 5
- /agent task to: ali type: prep_checklist
```

```
/template run
name: event_prep
event_name: raya-bazaar
event_date: 2026-01-20
```

### 11.3 Conditional Logic

```
/if
condition: sales > 1000
then: /report generate type: achievement
else: /agent task to: ali type: review_strategy
```

### 11.4 Batch Commands

```
/batch
- /landing publish page: promo-1
- /landing publish page: promo-2
- /tiktok post caption: Double promo! 🔥
```

### 11.5 Rollback & Undo

```
/undo
task: TASK-1201
```

```
/rollback
type: landing
page: promo-raya
to: -1
```

### 11.6 Analytics Integration

```
/analytics
metric: conversion | traffic | engagement
period: 24h | 7d | 30d
compare: previous
```

---

## 12. Implementation Roadmap

### Phase 1: Core (Week 1-2)

- [ ] Baileys WhatsApp bot setup
- [ ] Command parser (text only)
- [ ] PostgreSQL schema
- [ ] Basic task queue (Redis)
- [ ] Admin whitelist

### Phase 2: Task Engine (Week 3-4)

- [ ] Task CRUD API
- [ ] Status transitions
- [ ] Audit logging
- [ ] WhatsApp feedback messages

### Phase 3: Agent Panel (Week 5-6)

- [ ] React app scaffold
- [ ] Task inbox
- [ ] Real-time updates
- [ ] Approval workflow

### Phase 4: Executors (Week 7-8)

- [ ] Landing page executor
- [ ] App config executor
- [ ] Agent task executor

### Phase 5: Advanced (Week 9-10)

- [ ] Voice command (Whisper)
- [ ] TikTok semi-auto
- [ ] Templates & scheduling
- [ ] Reports

### Phase 6: Hardening (Week 11-12)

- [ ] Security audit
- [ ] Performance optimization
- [ ] Documentation
- [ ] Training

---

## 14. Free Hosting Stack (RM 0/bulan)

### 14.1 Recommended FREE Stack

| Component | Platform | Free Tier |
|-----------|----------|-----------|
| **Webhook Server** | Vercel | ✅ 100GB bandwidth, 100k invocations |
| **Database** | Supabase | ✅ 500MB, 50k rows |
| **Redis/Queue** | Upstash | ✅ 10k commands/day |
| **Voice Processing** | Your PC | ✅ faster-whisper local |
| **Tunnel** | Cloudflare Tunnel / ngrok | ✅ Free tier available |

### 14.2 Architecture (100% FREE)

```text
WhatsApp Cloud API (FREE for service messages)
       ↓ (webhook POST)
Vercel Serverless Function (FREE)
       ↓
Supabase PostgreSQL (FREE)
       ↓
Upstash Redis Queue (FREE)
       ↓ (for voice notes)
Your PC via Cloudflare Tunnel
       ↓
faster-whisper (FREE, local)
```

### 14.3 Free Hosting Options Comparison

| Platform | Type | Sleep? | Limit | Best For |
|----------|------|--------|-------|----------|
| **Vercel** | Serverless | No | 10s timeout | ⭐ Webhooks |
| **Render** | Container | Yes (15min) | 750h/month | Light use |
| **Railway** | Container | No | $5 credit | Persistent |
| **Fly.io** | VM | No | $5 credit | Persistent |
| **Netlify** | Serverless | No | 125k/month | Webhooks |

### 14.4 Setup Guide

1. **Vercel** (Webhook Handler)

   ```bash
   npm i -g vercel
   vercel login
   vercel deploy
   ```

2. **Supabase** (Database)
   - Create project at supabase.com
   - Run migration SQL from Section 5
   - Get connection string

3. **Upstash** (Redis Queue)
   - Create database at upstash.com
   - Get REST API credentials

4. **Cloudflare Tunnel** (Voice Processing)

   ```bash
   # On your PC
   cloudflared tunnel create wocs
   cloudflared tunnel run wocs
   ```

### 14.5 Total Monthly Cost

| Item | Cost |
|------|------|
| WhatsApp Cloud API | **RM 0** (admin-initiated) |
| Vercel Hosting | **RM 0** |
| Supabase Database | **RM 0** |
| Upstash Redis | **RM 0** |
| faster-whisper | **RM 0** |
| **TOTAL** | **RM 0/bulan** 🎉 |

---

## 15. Migration to Scale

When ready for production scale:

1. Apply for WhatsApp Business API via BSP
2. Migrate to template messages
3. Keep same command grammar
4. Add verified badge
5. Enable high-volume messaging
6. Move to paid hosting (Railway/Fly.io)

**Estimated timeline**: When monthly chat volume exceeds 1,000 or business requires SLA

---

## 16. Success Metrics

| Metric | Target |
|--------|--------|
| Command success rate | > 95% |
| Task completion time | < 2 minutes |
| Agent response time | < 5 minutes |
| System uptime | > 99% |
| WhatsApp session stability | > 7 days |
