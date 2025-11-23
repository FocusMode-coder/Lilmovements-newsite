import nodemailer from "nodemailer";

const emailConfig = {
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT || "587"),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

const emailFrom = process.env.EMAIL_FROM;
const emailTo = process.env.EMAIL_TO;

export async function POST(request: Request) {
  try {
    const { name, email, message, topic } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ 
        ok: false, 
        error: "Name, email, and message are required." 
      }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Check if email configuration is available
    if (!emailConfig.host || !emailConfig.auth.user || !emailConfig.auth.pass || !emailFrom || !emailTo) {
      console.error("Missing email configuration in environment variables");
      return new Response(JSON.stringify({ 
        ok: false, 
        error: "Email service is temporarily unavailable. Please try again later." 
      }), { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const transporter = nodemailer.createTransport(emailConfig);

    const mailOptions = {
      from: emailFrom,
      to: emailTo,
      subject: `New contact form submission from ${name} - ${topic || 'General'}`,
      text: `Name: ${name}\nEmail: ${email}\nTopic: ${topic || 'General'}\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Topic:</strong> ${topic || 'General'}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ 
      ok: true, 
      message: "Email sent successfully" 
    }), { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ 
      ok: false, 
      error: "Failed to send email. Please try again later." 
    }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}