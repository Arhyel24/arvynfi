import { NextRequest, NextResponse } from "next/server";

async function sendMessage(chatId: string, text: string): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error sending message to Telegram:", errorData);
      return;
    }

    const data = await response.json();
    console.log("Message sent successfully:", data);
  } catch (error) {
    console.error("Error sending message to Telegram:", error);
  }
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body);
    const { message } = body;

    if (message) {
      const chatId = message.chat.id; // Extract chat ID from the message
      // const userId = message.from.id; // Extract user ID

      // Here, save the chatId to a database
      // Example using MongoDB (you can store it in a database of your choice)
      // await db.collection('users').updateOne(
      //   { userId },
      //   { $set: { chatId, userId } },
      //   { upsert: true }
      // );

      sendMessage(chatId, message.text);

      console.log(`Received message from user with chat ID: ${chatId}`);
    }
    return NextResponse.json({
      message: "Endpoint reached, Request:",
      data: req,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: (error as Error).message,
    });
  }
}
