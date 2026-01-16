import type { BrandOSData } from "../types";

const downloadFile = (filename: string, content: string, mime: string) => {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

export const exportJson = (data: BrandOSData) => {
  const payload = {
    exportedAt: new Date().toISOString(),
    data,
  };
  downloadFile(
    "abang-colek-brand-os.json",
    JSON.stringify(payload, null, 2),
    "application/json"
  );
};

const formatLines = (text: string) =>
  text
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");

export const exportMarkdown = (data: BrandOSData) => {
  const lines: string[] = [];
  lines.push("# Pitch Deck (Slides 1-15)");
  data.deck.forEach((slide, index) => {
    lines.push(`## Slide ${index + 1} - ${slide.title}`);
    lines.push(formatLines(slide.body));
    lines.push("");
  });

  lines.push("# Brand Song");
  data.song.forEach((section) => {
    lines.push(`## ${section.title}`);
    lines.push(formatLines(section.content));
    lines.push("");
  });

  lines.push("# Weekly SOP");
  data.sop.forEach((item) => {
    lines.push(`## ${item.title}`);
    lines.push(formatLines(item.content));
    lines.push("");
  });

  lines.push("# Tagline + Manifesto");
  lines.push("## Tagline");
  lines.push(`Primary: ${data.tagline.primary}`);
  if (data.tagline.alternatives.length > 0) {
    lines.push(`Alternatives: ${data.tagline.alternatives.join(" / ")}`);
  }
  lines.push("");
  data.manifesto.forEach((variant) => {
    lines.push(`## ${variant.title}`);
    lines.push(formatLines(variant.content));
    lines.push("");
  });

  downloadFile("abang-colek-brand-os.md", lines.join("\n"), "text/markdown");
};

const toTitle = (value: string | undefined, fallback: string) =>
  value && value.trim() ? value : fallback;

export const exportEventPack = (data: BrandOSData, eventId: string) => {
  const event = data.events.find((item) => item.id === eventId);
  if (!event) return;

  const checklist = data.boothChecklists.find((item) => item.eventId === eventId);
  const plan = data.contentPlans.find((item) => item.eventId === eventId);
  const review = data.postEventReviews.find((item) => item.eventId === eventId);

  const lines: string[] = [];
  lines.push(`# Event Pack: ${event.title}`);
  lines.push(`Location: ${event.location}`);
  lines.push(`Region: ${event.region}`);
  lines.push(`Status: ${event.status}`);
  lines.push(`Start: ${event.startDate}`);
  lines.push(`End: ${event.endDate}`);
  if (event.feeNote) lines.push(`Fee: ${event.feeNote}`);
  if (event.requirements) lines.push(`Requirements: ${event.requirements}`);
  if (event.notes) lines.push(`Notes: ${event.notes}`);
  lines.push("");

  lines.push("## Booth Checklist");
  if (checklist) {
    checklist.items.forEach((item) => {
      const flag = item.required ? "[REQ]" : "[OPT]";
      const done = item.done ? "DONE" : "TODO";
      lines.push(`- ${flag} ${done} - ${item.label}`);
    });
  } else {
    lines.push("- No checklist yet.");
  }
  lines.push("");

  lines.push("## TikTok Shot List");
  if (plan) {
    plan.shotList.forEach((shot, index) => {
      lines.push(`${index + 1}. ${shot}`);
    });
  } else {
    lines.push("No content plan yet.");
  }
  lines.push("");

  lines.push("## Post-Event Review");
  if (review) {
    lines.push(`Sales: ${review.salesNote}`);
    lines.push(`Crowd: ${review.crowdNote}`);
    lines.push(`Top Hook: ${review.topHook}`);
    lines.push(`Issue: ${review.issueNote}`);
    lines.push(`Next Action: ${review.nextAction}`);
    lines.push(`TikTok Views: ${review.tiktokViews}`);
    lines.push(`Watch Time (s): ${review.watchTimeSeconds}`);
  } else {
    lines.push("No review yet.");
  }

  const filename = `abang-colek-event-pack-${toTitle(event.title, event.id)
    .toLowerCase()
    .replace(/\\s+/g, "-")}.md`;
  downloadFile(filename, lines.join("\n"), "text/markdown");
};

export const exportTikTokPack = (data: BrandOSData, eventId: string) => {
  const event = data.events.find((item) => item.id === eventId);
  if (!event) return;

  const plan = data.contentPlans.find((item) => item.eventId === eventId);
  const hooks = plan
    ? data.hooks.filter((hook) => plan.hookIds.includes(hook.id))
    : [];

  const lines: string[] = [];
  lines.push(`# TikTok Pack: ${event.title}`);
  lines.push(`Location: ${event.location}`);
  lines.push(`Date: ${event.startDate}`);
  lines.push("");

  lines.push("## Hooks");
  if (hooks.length > 0) {
    hooks.forEach((hook, index) => {
      lines.push(`${index + 1}. ${hook.title} - ${hook.text}`);
    });
  } else {
    lines.push("No hooks selected.");
  }
  lines.push("");

  lines.push("## Shot List");
  if (plan && plan.shotList.length > 0) {
    plan.shotList.forEach((shot, index) => {
      lines.push(`${index + 1}. ${shot}`);
    });
  } else {
    lines.push("No shot list yet.");
  }
  lines.push("");

  lines.push("## Caption Suggestions");
  lines.push("1. Street taste, real talk. Abang Colek on the move.");
  lines.push("2. Berani cuba? Tag kawan yang tahan pedas.");
  lines.push("3. Reaction ni tak boleh tipu. #AbangColek");

  const filename = `abang-colek-tiktok-pack-${toTitle(event.title, event.id)
    .toLowerCase()
    .replace(/\\s+/g, "-")}.md`;
  downloadFile(filename, lines.join("\n"), "text/markdown");
};
