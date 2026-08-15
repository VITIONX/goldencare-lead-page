import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Send email API route is working.",
  });
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY is missing.");

      return NextResponse.json(
        {
          success: false,
          error: "RESEND_API_KEY is missing.",
        },
        { status: 500 }
      );
    }

    const data = await request.json();

    const {
      firstName,
      lastName,
      streetAddress,
      city,
      state,
      zipCode,
      email,
      phone,
      age,
      gender,
      spouseGender,
      bestContactTime,
    } = data;

    const resend = new Resend(apiKey);

    const { data: emailData, error } =
      await resend.emails.send({
        from: "Golden Care Financial <onboarding@resend.dev>",
        to: ["ahmedsakib857@gmail.com"],
        subject: `New Quote Request - ${firstName || ""} ${
          lastName || ""
        }`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; color: #142333;">

            <h2 style="color: #123f68;">
              New Long-Term Care Quote Request
            </h2>

            <p>
              A new quote request has been submitted through the
              Golden Care Financial website.
            </p>

            <hr />

            <h3>Personal Information</h3>

            <p>
              <strong>First Name:</strong>
              ${firstName || "N/A"}
            </p>

            <p>
              <strong>Last Name:</strong>
              ${lastName || "N/A"}
            </p>

            <p>
              <strong>Age:</strong>
              ${age || "N/A"}
            </p>

            <p>
              <strong>Gender:</strong>
              ${gender || "N/A"}
            </p>

            <p>
              <strong>Spouse's Gender:</strong>
              ${spouseGender || "N/A"}
            </p>

            <hr />

            <h3>Address</h3>

            <p>
              <strong>Street Address:</strong>
              ${streetAddress || "N/A"}
            </p>

            <p>
              <strong>City:</strong>
              ${city || "N/A"}
            </p>

            <p>
              <strong>State:</strong>
              ${state || "N/A"}
            </p>

            <p>
              <strong>Zip Code:</strong>
              ${zipCode || "N/A"}
            </p>

            <hr />

            <h3>Contact Information</h3>

            <p>
              <strong>Email:</strong>
              ${email || "N/A"}
            </p>

            <p>
              <strong>Phone:</strong>
              ${phone || "N/A"}
            </p>

            <p>
              <strong>Best Contact Time:</strong>
              ${bestContactTime || "N/A"}
            </p>

            <hr />

            <p style="font-size: 13px; color: #666;">
              This lead was submitted through the Golden Care Financial website.
            </p>

          </div>
        `,
      });

    if (error) {
      console.error("RESEND ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          error: error.message || "Failed to send email.",
        },
        { status: 500 }
      );
    }

    console.log("EMAIL SENT:", emailData);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully.",
    });
  } catch (error) {
    console.error("SERVER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      },
      { status: 500 }
    );
  }
}