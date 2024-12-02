import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text, image } = await req.json();

    // Validate inputs
    if (!text && !image) {
      return NextResponse.json(
        { error: "Please provide either text or an image for processing." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenAI API key is missing in environment variables." },
        { status: 500 }
      );
    }

    // Prepare Base64-encoded image with the required prefix
    const base64Image = image?.startsWith("data:image")
      ? image
      : `data:image/jpeg;base64,${image}`;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };

    // Build payload for OpenAI API
    const payload = {
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            ...(text ? [{ type: "text", text }] : []),
            ...(image
              ? [
                  {
                    type: "image_url",
                    image_url: {
                      url: base64Image,
                    },
                  },
                ]
              : []),
          ],
        },
      ],
      max_tokens: 300,
    };

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenAI API Error:", error);
      return NextResponse.json(
        { error: "Error communicating with OpenAI API", details: error },
        { status: response.status }
      );
    }

    const result = await response.json();
    const reply = result.choices[0]?.message?.content;

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Error processing request:", error.message);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
