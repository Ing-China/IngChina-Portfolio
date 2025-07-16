import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "dummy-key-for-build");

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Send email
    const { data, error } = await resend.emails.send({
      from: "Ing China Portfolio <onboarding@resend.dev>", // Temporary until ingchina.dev is verified
      replyTo: email, // Set reply-to to visitor's email
      to: ["ingchina2004@gmail.com"],
      subject: `Portfolio Contact: ${name}`,
      headers: {
        "X-Entity-ID": "ingchina-portfolio-contact",
        "X-Priority": "3",
        "List-Unsubscribe": "<mailto:contact@ingchina.dev?subject=unsubscribe>",
      },
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <div style="background-color: #f8f9fa; padding: 20px; border-bottom: 3px solid #007bff;">
            <h1 style="color: #333; margin: 0; font-size: 24px;">Portfolio Contact Form</h1>
            <p style="color: #666; margin: 5px 0 0 0;">New message from ingchina.dev</p>
          </div>
          
          <div style="padding: 30px;">
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin-top: 0; font-size: 18px;">Contact Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold; width: 80px;">Name:</td>
                  <td style="padding: 8px 0; color: #333;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Email:</td>
                  <td style="padding: 8px 0; color: #333;">${email}</td>
                </tr>
              </table>
            </div>
            
            <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
              <h2 style="color: #333; margin-top: 0; font-size: 18px;">Message</h2>
              <div style="color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</div>
            </div>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
            <p style="color: #666; margin: 0; font-size: 14px;">
              This message was sent from your portfolio contact form at ingchina.dev
            </p>
            <p style="color: #999; margin: 10px 0 0 0; font-size: 12px;">
              Sent on ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
      text: `
Portfolio Contact Form - New Message

Contact Information:
Name: ${name}
Email: ${email}

Message:
${message}

---
This message was sent from your portfolio contact form at ingchina.dev
Sent on ${new Date().toLocaleString()}
      `,
    });

    if (error) {
      console.error("Email sending failed:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Email sent successfully", id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
