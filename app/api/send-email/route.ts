import { NextResponse } from "next/server";
import { Resend } from "resend";

const GOOGLE_SHEET_WEBHOOK =
  "https://script.google.com/macros/s/AKfycbx_sJwOPqhzzesc6TmsFZQOmJnPNl2fAZufpXBvtrf14zwpQGgCd1kKa354D5dXUG8/exec";

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

    /*
     * ========================================================
     * SAVE LEAD TO GOOGLE SHEET
     * ========================================================
     */

    try {
      const sheetResponse = await fetch(
        GOOGLE_SHEET_WEBHOOK,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: firstName || "",
            lastName: lastName || "",
            streetAddress: streetAddress || "",
            city: city || "",
            state: state || "",
            zipCode: zipCode || "",
            email: email || "",
            phone: phone || "",
            age: age || "",
            gender: gender || "",
            spouseGender: spouseGender || "",
            bestContactTime: bestContactTime || "",
          }),
          redirect: "follow",
        }
      );

      const sheetText = await sheetResponse.text();

      console.log(
        "GOOGLE SHEET STATUS:",
        sheetResponse.status
      );

      console.log(
        "GOOGLE SHEET RESPONSE:",
        sheetText
      );

      if (!sheetResponse.ok) {
        console.error(
          "GOOGLE SHEET ERROR:",
          sheetText
        );
      }
    } catch (sheetError) {
      console.error(
        "GOOGLE SHEET REQUEST ERROR:",
        sheetError
      );
    }

    /*
     * ========================================================
     * SEND EMAIL WITH RESEND
     * ========================================================
     */

    const resend = new Resend(apiKey);

    const { data: emailData, error } =
      await resend.emails.send({
        from:
          "Golden Care Financial <onboarding@resend.dev>",

        to: ["marior@goldencare.com"],

        subject:
          `New Quote Request - ${firstName || ""} ${
            lastName || ""
          }`,

        html: `
          <div
            style="
              font-family: Arial, sans-serif;
              max-width: 700px;
              margin: 0 auto;
              color: #142333;
            "
          >

            <h2 style="color: #123f68;">
              New Long-Term Care Quote Request
            </h2>

            <p>
              A new quote request has been submitted
              through the Golden Care Financial website.
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

            <p
              style="
                font-size: 13px;
                color: #666;
              "
            >
              This lead was submitted through
              the Golden Care Financial website.
            </p>

          </div>
        `,
      });

    /*
     * ========================================================
     * CHECK RESEND ERROR
     * ========================================================
     */

    if (error) {
  console.error("RESEND ERROR:", error);

  return NextResponse.json({
    success: true,
    message: "Lead submitted successfully.",
  });
}

    console.log(
      "EMAIL SENT:",
      emailData
    );

    /*
     * ========================================================
     * SUCCESS
     * ========================================================
     */

    return NextResponse.json({
      success: true,
      message:
        "Lead submitted successfully.",
    });

  } catch (error) {
    console.error(
      "SERVER ERROR:",
      error
    );

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