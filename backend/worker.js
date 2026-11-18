
const SITE = "https://stanytr7.github.io";

export default {
  async fetch(request) {
    const origin = request.headers.get("Origin");

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": SITE,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (origin && origin !== SITE) {
      return new Response("Origin not allowed", {
        status: 403
      });
    }

    if (request.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    const url = new URL(request.url);

    if (url.pathname === "/health" && request.method === "GET") {
      return new Response(JSON.stringify({
        system: "STARK AI",
        status: "Backend ready",
        ai: "Not connected yet"
      }), { headers });
    }

    if (url.pathname === "/chat" && request.method === "POST") {
      try {
        const body = await request.json();

        if (
          typeof body.message !== "string" ||
          body.message.length === 0 ||
          body.message.length > 2000
        ) {
          return new Response(JSON.stringify({
            error: "Invalid message"
          }), { status: 400, headers });
        }

        return new Response(JSON.stringify({
          reply: "STARK received your message. AI intelligence is coming soon."
        }), { headers });

      } catch {
        return new Response(JSON.stringify({
          error: "Invalid request"
        }), { status: 400, headers });
      }
    }

    return new Response(JSON.stringify({
      system: "STARK AI",
      status: "Online"
    }), { headers });
  }
};
