#!/bin/bash

# Video Compression and Optimization Script for Lily Movements
echo "🎬 Starting video compression and optimization..."

# Check if ffmpeg is available
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ FFmpeg not found. Installing via Homebrew..."
    if command -v brew &> /dev/null; then
        brew install ffmpeg
    else
        echo "⚠️  Please install FFmpeg manually: https://ffmpeg.org/download.html"
        exit 1
    fi
fi

# Create optimized video directory
mkdir -p public/assets/optimized

# Video compression settings optimized for web
BACKGROUND_SETTINGS="-c:v libx264 -crf 28 -preset medium -c:a aac -b:a 128k -movflags +faststart -vf scale=1920:1080"
CLASS_SETTINGS="-c:v libx264 -crf 30 -preset medium -c:a aac -b:a 96k -movflags +faststart -vf scale=720:1280"
TESTIMONIAL_SETTINGS="-c:v libx264 -crf 32 -preset medium -c:a aac -b:a 96k -movflags +faststart -vf scale=720:1280"

echo "📹 Compressing background videos..."
# Compress background videos (landscape orientation)
if [ -f "public/assets/LM-BACKNATURE.mp4" ]; then
    echo "  → Optimizing LM-BACKNATURE.mp4..."
    ffmpeg -i "public/assets/LM-BACKNATURE.mp4" $BACKGROUND_SETTINGS "public/assets/optimized/LM-BACKNATURE-opt.mp4" -y
fi

if [ -f "public/assets/LM-BACKWHITE.mp4" ]; then
    echo "  → Optimizing LM-BACKWHITE.mp4..."
    ffmpeg -i "public/assets/LM-BACKWHITE.mp4" $BACKGROUND_SETTINGS "public/assets/optimized/LM-BACKWHITE-opt.mp4" -y
fi

echo "🩰 Compressing class videos..."
# Compress class videos (portrait orientation)
for video in "Lily_dancing1.mp4" "Lily_dancing2.mp4" "LM_recap1.mp4" "LM_recap2.mp4"; do
    if [ -f "public/assets/$video" ]; then
        echo "  → Optimizing $video..."
        output_name="${video%.*}-opt.mp4"
        ffmpeg -i "public/assets/$video" $CLASS_SETTINGS "public/assets/optimized/$output_name" -y
    fi
done

echo "🎙️ Compressing testimonial videos..."
# Compress testimonial videos
for video in "testimonio 1.mp4" "testimonio 2.mp4" "testimonio 3.mp4" "testimonio 4.mp4"; do
    if [ -f "public/assets/$video" ]; then
        echo "  → Optimizing $video..."
        output_name="${video%.*}-opt.mp4"
        ffmpeg -i "public/assets/$video" $TESTIMONIAL_SETTINGS "public/assets/optimized/$output_name" -y
    fi
done

echo "📖 Compressing story videos..."
# Compress story videos
for video in "howgotstarted.mp4" "Lilinteview.mp4"; do
    if [ -f "public/assets/$video" ]; then
        echo "  → Optimizing $video..."
        output_name="${video%.*}-opt.mp4"
        ffmpeg -i "public/assets/$video" $CLASS_SETTINGS "public/assets/optimized/$output_name" -y
    fi
done

echo "📊 Generating video statistics..."
echo ""
echo "=== COMPRESSION RESULTS ==="
original_size=0
optimized_size=0

for original in public/assets/*.mp4; do
    if [ -f "$original" ]; then
        size=$(stat -f%z "$original" 2>/dev/null || stat -c%s "$original" 2>/dev/null)
        original_size=$((original_size + size))
    fi
done

for optimized in public/assets/optimized/*.mp4; do
    if [ -f "$optimized" ]; then
        size=$(stat -f%z "$optimized" 2>/dev/null || stat -c%s "$optimized" 2>/dev/null)
        optimized_size=$((optimized_size + size))
    fi
done

if [ $original_size -gt 0 ]; then
    reduction=$((100 - (optimized_size * 100 / original_size)))
    echo "📈 Original total size: $(($original_size / 1024 / 1024)) MB"
    echo "📉 Optimized total size: $(($optimized_size / 1024 / 1024)) MB"
    echo "🎯 Size reduction: ${reduction}%"
else
    echo "⚠️  No original videos found for comparison"
fi

echo ""
echo "✅ Video optimization complete!"
echo "📝 Next steps:"
echo "   1. Test the optimized videos in your browser"
echo "   2. If quality is good, replace originals with optimized versions"
echo "   3. Update video paths in your code to use optimized versions"
echo ""
echo "📂 Optimized videos are in: public/assets/optimized/"