import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;

export async function POST(req, res) {
  try {
    console.log("Before JSON parse");
    const { email, subject, message } = await req.json();
    console.log("After JSON parse", email, subject, message);

    const data = await resend.emails.send({
      from: 'Vladimir <deyanovva@gmail.com>',
      to: ['deyanovva@gmail.com'],
      subject: 'EMAIL FROM YOUR WEBSITE',
      react: (
        <>
          <h1>{subject}</h1>
          <p>Thank you for contacting me!</p>
          <p>New message submitted:</p>
          <p>{message}</p>
        </>
      ),
    });

    console.log("After sending email", data);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in POST:", error);
    return NextResponse.json({ error: error.message });
  }
}
