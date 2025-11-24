#!/bin/bash

echo "Starting deployment process..."

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Run database migrations
echo "Running database migrations..."
npx prisma migrate deploy

# Build the application
echo "Building Next.js application..."
npm run build

echo "Deployment completed successfully!"