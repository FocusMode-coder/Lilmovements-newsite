// This endpoint is used by external uptime monitoring services (like UptimeRobot or BetterStack)
// to ping the app every 5 minutes and keep the Render service warm, preventing it from spinning down.
// Keep this endpoint lightweight - no heavy operations, database calls, or complex logic.

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const timestamp = new Date().toISOString();
  
  console.log(`[${timestamp}] 🏓 Keep-alive ping received from anti-sleep system`);
  
  return NextResponse.json({
    status: 'alive',
    timestamp,
    message: 'Server is awake and running',
    uptime: process.uptime()
  }, { status: 200 });
}

export async function POST(request: NextRequest) {
  return GET(request);
}