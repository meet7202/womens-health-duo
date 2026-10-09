const AGENT_NAME = "Women's Health Duo A2A Agent";
const AGENT_DESCRIPTION =
  "A minimal A2A-compatible agent for Women's Health Duo that exposes the site’s booking and education guidance in a machine-readable format.";

const AGENT_CARD = {
  name: AGENT_NAME,
  description: AGENT_DESCRIPTION,
  url: "https://womenshealthduo.com",
  provider: {
    organization: "Women's Health Duo",
    url: "https://womenshealthduo.com",
  },
  version: "1.0.0",
  capabilities: {
    streaming: false,
    pushNotifications: false,
    stateTransitionHistory: false,
  },
  defaultInputModes: ["text"],
  defaultOutputModes: ["text"],
  skills: [
    {
      id: "site-overview",
      name: "Site overview",
      description: "General information about the clinic and official website routes.",
      examples: [
        "Who are the doctors?",
        "Where do I find the Learn hub?",
        "How do I book a consultation?",
      ],
    },
    {
      id: "book-consultation",
      name: "Book consultation",
      description: "Guidance for teleconsultation and WhatsApp booking workflows.",
      examples: [
        "I want to book a consultation with Dr. Charmi.",
        "What is the telemedicine intake process?",
      ],
    },
    {
      id: "learn-hub",
      name: "Learn hub",
      description: "Educational resources, videos, topic guides, and website navigation help.",
      examples: [
        "Show me fertility information.",
        "What are the Learn hub filters?",
      ],
    },
  ],
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, POST, OPTIONS",
      "access-control-allow-headers": "content-type, authorization",
    },
  });
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getMessageText(payload: unknown): string {
  if (!isObject(payload)) {
    return "";
  }

  if (typeof payload.message === "string") return payload.message;

  const message = payload.message;
  if (isObject(message)) {
    const parts = message.parts;
    if (Array.isArray(parts)) {
      for (const part of parts) {
        if (isObject(part) && typeof part.text === "string") return part.text;
        if (typeof part === "string") return part;
      }
    }

    if (typeof message.text === "string") return message.text;
  }

  if (typeof payload.prompt === "string") return payload.prompt;
  if (typeof payload.query === "string") return payload.query;
  return "";
}

function buildReply(input: string): string {
  const normalized = input.trim();

  if (!normalized) {
    return "Hello. I can help with Women’s Health Duo site guidance, booking pathways, and Learn hub navigation.";
  }

  const lowered = normalized.toLowerCase();

  if (lowered.includes("book") || lowered.includes("consult") || lowered.includes("appointment")) {
    return "You can book a consultation through the site’s telemedicine flow at https://womenshealthduo.com/book-consultation. The form includes patient intake and mandatory telemedicine consent before WhatsApp handoff.";
  }

  if (lowered.includes("learn") || lowered.includes("video") || lowered.includes("article") || lowered.includes("topic")) {
    return "The Learn hub is at https://womenshealthduo.com/learn and includes filtered topic and doctor views, plus watch pages for educational clips.";
  }

  if (lowered.includes("doctor") || lowered.includes("charmi") || lowered.includes("zalak")) {
    return "Women’s Health Duo includes Dr. Charmi Shah (OB-GYN, IVF, laparoscopy) and Dr. Zalak Shah (women’s health physiotherapy and STOTT Pilates).";
  }

  if (lowered.includes("fertility") || lowered.includes("pcos") || lowered.includes("endometriosis") || lowered.includes("pregnancy")) {
    return "The site covers fertility, pregnancy, PCOS, endometriosis, and related women’s health topics in its Learn content and virtual consultation pathways.";
  }

  return "I can help with Women’s Health Duo service overview, consultation booking guidance, and educational Learn hub navigation. Try asking about booking, doctors, fertility, or pregnancy.";
}

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "access-control-allow-origin": "*",
          "access-control-allow-methods": "GET, POST, OPTIONS",
          "access-control-allow-headers": "content-type, authorization",
        },
      });
    }

    if (url.pathname === "/" || url.pathname === "/a2a" || url.pathname === "/a2a/") {
      if (request.method === "GET") {
        return jsonResponse({
          jsonrpc: "2.0",
          kind: "agent-card",
          ...AGENT_CARD,
        });
      }

      if (request.method === "POST") {
        try {
          const payload = await request.json();
          const input = getMessageText(payload);
          const reply = buildReply(input);

          return jsonResponse({
            jsonrpc: "2.0",
            id: isObject(payload) && typeof payload.id !== "undefined" ? payload.id : "a2a-response",
            result: {
              status: { state: "completed", message: "ok" },
              artifacts: [
                {
                  type: "text",
                  text: reply,
                },
              ],
            },
          });
        } catch {
          return jsonResponse(
            {
              jsonrpc: "2.0",
              error: {
                code: -32700,
                message: "Invalid JSON request",
              },
            },
            400,
          );
        }
      }
    }

    return jsonResponse(
      {
        error: {
          code: 404,
          message: "Not found. Use /a2a for the A2A endpoint.",
        },
      },
      404,
    );
  },
};
