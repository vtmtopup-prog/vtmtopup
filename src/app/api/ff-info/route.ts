import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Outer try/catch to catch any unexpected exceptions
  try {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get("uid")?.trim();

    // 1. Validate UID presence
    if (!uid) {
      return NextResponse.json(
        { status: false, message: "UID is required." },
        { status: 400 }
      );
    }

    // 2. Validate UID format (numeric FreeFire UID)
    if (!/^\d{5,16}$/.test(uid)) {
      return NextResponse.json(
        { status: false, message: "Invalid UID format. Please provide a valid 5-16 digit numeric ID." },
        { status: 400 }
      );
    }

    // 3. Environment Variable Check: Ensure FF_API_KEY is configured
    const apiKey = process.env.FF_API_KEY?.trim();
    if (!apiKey) {
      console.error("[FF_INFO_API] Configuration Error: 'FF_API_KEY' is not set in environment (.env.local)!");
      return NextResponse.json(
        {
          status: false,
          message: "API key is not configured on the server. Please check .env.local.",
        },
        { status: 500 }
      );
    }

    // 4. Construct request to Team Nano FreeFire ID Info endpoint
    const targetUrl = new URL("https://api.teamnano.top/api/ff-info");
    targetUrl.searchParams.set("api", apiKey);
    targetUrl.searchParams.set("uid", uid);

    let response: Response;

    // 5. Fetch wrapped in try/catch with configurable 8-second timeout
    try {
      response = await fetch(targetUrl.toString(), {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
        signal: AbortSignal.timeout(8000), // 8-second timeout to prevent server hanging
      });
    } catch (fetchError: any) {
      console.error("[FF_INFO_API] Fetch Error:", fetchError);

      // Handle timeout error specifically
      if (
        fetchError?.name === "TimeoutError" ||
        fetchError?.name === "AbortError" ||
        fetchError?.code === 20
      ) {
        return NextResponse.json(
          {
            status: false,
            message: "API request timed out. Please try again later.",
          },
          { status: 504 }
        );
      }

      // Handle any other network or connection failure
      return NextResponse.json(
        {
          status: false,
          message: "Failed to connect to the external API.",
        },
        { status: 502 }
      );
    }

    // 6. Parse external response
    const responseText = await response.text();
    let data: any = null;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = null;
    }

    // 7. Handle JSON returned by Team Nano
    if (data && typeof data === "object") {
      if (data.status === true) {
        return NextResponse.json(data, { status: 200 });
      } else {
        const httpStatus =
          response.status >= 400 && response.status < 600 ? response.status : 400;
        return NextResponse.json(
          {
            status: false,
            message: data.message || "Invalid UID or API Key Limit Reached.",
          },
          { status: httpStatus }
        );
      }
    }

    // 8. If response is not OK or unexpected format
    if (!response.ok) {
      console.error(`[FF_INFO_API] Upstream returned status ${response.status}:`, responseText);
      return NextResponse.json(
        {
          status: false,
          message: "Failed to connect to the external API.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        status: false,
        message: "Unexpected response format from external API.",
      },
      { status: 502 }
    );
  } catch (unexpectedError: any) {
    console.error("[FF_INFO_API] Unexpected Error:", unexpectedError);
    return NextResponse.json(
      {
        status: false,
        message: "An unexpected error occurred on the server.",
      },
      { status: 500 }
    );
  }
}
