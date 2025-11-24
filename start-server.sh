#!/bin/bash

echo "🚀 Starting Lily Movements Website with Anti-Sleep System..."

# Set production environment
export NODE_ENV=production

# Ensure Prisma client is ready
echo "📦 Ensuring Prisma client is ready..."
npx prisma generate --silent

# Pre-warm the application
echo "🔥 Pre-warming application..."
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.\$connect().then(() => {
  console.log('✅ Database connection established');
  prisma.\$disconnect();
}).catch((e) => {
  console.log('⚠️  Database connection warning:', e.message);
});
"

# Make sure keep-alive script is executable
chmod +x keep-alive.sh

# Start the Next.js application
echo "📱 Starting Next.js application..."
npm start &
APP_PID=$!

# Wait a moment for the app to start
sleep 10

# Start the anti-sleep system in the background
echo "🛡️ Starting Anti-Sleep System..."
./keep-alive.sh &
KEEPALIVE_PID=$!

echo "✅ Both systems started successfully!"
echo "📱 Next.js App PID: $APP_PID"
echo "🛡️ Keep-Alive PID: $KEEPALIVE_PID"

# Wait for the main application
wait $APP_PID