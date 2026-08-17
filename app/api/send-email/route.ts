import { NextResponse } from "next/server";

const GOOGLE_SHEET_WEBHOOK =
  "https://script.google.com/macros/s/AKfycbx_sJwOPqhzzesc6TmsFZQOmJnPNl2fAZufpXBvtrf14zwpQGgCd1kKa354D5dXUG8/exec";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Google Sheet API route is working.",
  });
}

export async function POST(request: Request) {
  try {
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

    const sheetResponse = await fetch(GOOGLE_SHEET_WEBHOOK, {
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
    });

    const sheetText = await sheetResponse.text();

    console.log("GOOGLE SHEET STATUS:", sheetResponse.status);
    console.log("GOOGLE SHEET RESPONSE:", sheetText);

    if (!sheetResponse.ok) {
      console.error("GOOGLE SHEET ERROR:", sheetText);

      return NextResponse.json(
        {
          success: false,
          error: "Failed to save lead to Google Sheet.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Lead submitted successfully.",
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