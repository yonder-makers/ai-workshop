import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const response = await fetch("http://127.0.0.1:8000", {
    method: "POST",
    body: await request.formData(),
  });

  return NextResponse.json(await response.json());
}
