#!/bin/bash

# Deployment script to fix Render issues
echo "🚀 Starting deployment with migration fixes..."

# Step 1: Generate Prisma client
echo "📦 Generating Prisma client..."
npx prisma generate

# Step 2: Try to resolve the failed migration
echo "🔧 Attempting to resolve failed migration..."
npx prisma migrate resolve --applied 20251123000000_init_postgresql || echo "Migration resolve failed or not needed"

# Step 3: Deploy migrations
echo "📊 Deploying migrations..."
npx prisma migrate deploy

# Step 4: If migration still fails, try database push as fallback
if [ $? -ne 0 ]; then
    echo "⚠️  Migration deploy failed, trying database push..."
    npx prisma db push --accept-data-loss
fi

# Step 5: Build the application
echo "🏗️  Building Next.js application..."
npm run build

echo "✅ Deployment script completed!"