import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get("uid")?.trim();

    // 1. Validate UID presence
    if (!uid) {
      return NextResponse.json(
        { status: false, message: "দয়া করে একটি সঠিক Free Fire Player ID (UID) দিন" },
        { status: 400 }
      );
    }

    // 2. Validate UID format (5-16 digits numeric FreeFire UID)
    if (!/^\d{5,16}$/.test(uid)) {
      return NextResponse.json(
        { status: false, message: "অকার্যকর UID! দয়া করে সঠিক ৫-১৬ সংখ্যার গেম আইডি প্রদান করুন" },
        { status: 400 }
      );
    }

    // 3. Environment Variable Check: Ensure FF_API_KEY is configured
    const apiKey = process.env.FF_API_KEY?.trim();
    if (!apiKey) {
      console.error(
        "[FF_INFO_API] Configuration Error: 'FF_API_KEY' is not set in environment (.env.local)!"
      );
      return NextResponse.json(
        {
          status: false,
          message:
            "সার্ভার কনফিগারেশনে API Key পাওয়া যায়নি। দয়া করে অ্যাডমিনের সাথে যোগাযোগ করুন।",
        },
        { status: 500 }
      );
    }

    // 4. Construct request to Team Nano FreeFire ID Info endpoint
    // Documentation: GET https://api.teamnano.top/api/ff-info?api=YOUR_API_KEY&uid=PLAYER_UID
    const targetUrl = new URL("https://api.teamnano.top/api/ff-info");
    targetUrl.searchParams.set("api", apiKey);
    targetUrl.searchParams.set("uid", uid);

    // 5. Secure server-side fetch with 10s timeout (AbortSignal.timeout)
    const response = await fetch(targetUrl.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    const responseText = await response.text();
    let data: any = null;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = null;
    }

    // 6. Handle JSON response from Team Nano
    if (data && typeof data === "object") {
      if (data.status === true) {
        // Successful response: { status: true, data: { status: true, username: "...", developer: "..." } }
        return NextResponse.json(data, { status: 200 });
      } else {
        // Handled failure from Team Nano: { status: false, message: "..." }
        const httpStatus =
          response.status >= 400 && response.status < 600 ? response.status : 400;
        return NextResponse.json(
          {
            status: false,
            message: data.message || "প্লেয়ার আইডি পাওয়া যায়নি বা API লিমিট শেষ হয়ে গেছে।",
          },
          { status: httpStatus }
        );
      }
    }

    // 7. Non-JSON or upstream network error from external service
    if (!response.ok) {
      console.error(
        `[FF_INFO_API] Team Nano upstream error (HTTP ${response.status}):`,
        responseText
      );
      return NextResponse.json(
        {
          status: false,
          message: "Free Fire সার্ভারের সাথে সংযোগ করতে সমস্যা হচ্ছে। কিছুক্ষণ পর আবার চেষ্টা করুন।",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        status: false,
        message: "সার্ভার থেকে সঠিক তথ্য পাওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
      },
      { status: 502 }
    );
  } catch (error: any) {
    console.error("[FF_INFO_API] Error during player info proxy fetch:", error);

    // Handle fetch timeout gracefully
    if (error?.name === "TimeoutError" || error?.name === "AbortError") {
      return NextResponse.json(
        {
          status: false,
          message: "অনুরোধের সময় শেষ হয়ে গেছে (Request Timeout)। কিছুক্ষণ পর আবার চেষ্টা করুন।",
        },
        { status: 504 }
      );
    }

    return NextResponse.json(
      {
        status: false,
        message:
          error?.message ||
          "সার্ভারে অভ্যন্তরীণ ত্রুটি হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর চেষ্টা করুন।",
      },
      { status: 502 }
    );
  }
}
