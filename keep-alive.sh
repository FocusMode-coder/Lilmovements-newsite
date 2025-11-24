#!/bin/bash

# Anti-Sleep System for Render Free Tier
# This script runs in the background and pings the server every 10 minutes
# to prevent the free tier from going to sleep

echo "🚀 Starting Anti-Sleep System for Render Free Tier..."
echo "📡 Will ping server every 10 minutes to keep it awake"

# Get the base URL from environment or default to localhost
BASE_URL=${RENDER_EXTERNAL_URL:-"https://lilmovements-2222.onrender.com"}

# Function to ping the server
ping_server() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] 🏓 Pinging server at $BASE_URL..."
    
    # Use curl to ping the health endpoint
    response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api/ping" --max-time 30)
    
    if [ "$response" = "200" ]; then
        echo "[$timestamp] ✅ Server is awake (HTTP $response)"
    else
        echo "[$timestamp] ⚠️  Server response: HTTP $response"
        # Try the main page as fallback
        response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/" --max-time 30)
        if [ "$response" = "200" ]; then
            echo "[$timestamp] ✅ Fallback ping successful (HTTP $response)"
        else
            echo "[$timestamp] ❌ Both pings failed (HTTP $response)"
        fi
    fi
}

# Main loop - ping every 10 minutes (600 seconds)
while true; do
    ping_server
    echo "💤 Sleeping for 10 minutes..."
    sleep 600
done