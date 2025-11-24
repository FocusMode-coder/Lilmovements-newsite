#!/bin/bash

# Optimized start script for Render - prevents timeouts
echo "🚀 Starting Lily Movements website..."

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

# Start the Next.js server with optimized settings
echo "🌟 Starting Next.js server..."
exec npx next start -p ${PORT:-3000} --keepAliveTimeout 30000 --headersTimeout 35000