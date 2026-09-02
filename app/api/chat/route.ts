import { NextRequest, NextResponse } from "next/server";

const botResponses = [
  "Thank you for contacting Nexus Support! An advisor will review your query shortly.",
  "Our support team is online 24/7. How can we help with your order or booking slot?",
  "Your message has been received by our live dispatch. Is there anything else you need?",
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ success: false, error: "Message content required" }, { status: 400 });
    }

    const randomReply = botResponses[Math.floor(Math.random() * botResponses.length)];

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      userMessage: message,
      reply: randomReply,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
