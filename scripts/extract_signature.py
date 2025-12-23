#!/usr/bin/env python3
"""
Extract the handwritten signature from the Lil Movements logo.
Uses background color detection, alpha masking, and connected components filtering.
"""

from PIL import Image, ImageFilter
import sys
import os
import math
from collections import defaultdict

def estimate_background_color(img, margin=60):
    """
    Estimate background color by sampling the border region.
    Returns median RGB as (r, g, b).
    """
    width, height = img.size
    pixels = img.load()
    samples = []
    
    # Sample from top and left margins (clean background areas)
    for x in range(0, min(margin * 2, width), 5):
        for y in range(0, min(margin, height), 5):
            if 0 <= x < width and 0 <= y < height:
                r, g, b, _ = pixels[x, y]
                samples.append((r, g, b))
    
    for x in range(0, min(margin, width), 5):
        for y in range(0, min(height, height), 5):
            if 0 <= x < width and 0 <= y < height:
                r, g, b, _ = pixels[x, y]
                samples.append((r, g, b))
    
    if not samples:
        return (255, 255, 255)
    
    r_vals = sorted([s[0] for s in samples])
    g_vals = sorted([s[1] for s in samples])
    b_vals = sorted([s[2] for s in samples])
    
    r_med = r_vals[len(r_vals) // 2]
    g_med = g_vals[len(g_vals) // 2]
    b_med = b_vals[len(b_vals) // 2]
    
    return (r_med, g_med, b_med)

def smoothstep(x):
    """Smooth interpolation function."""
    return x * x * (3 - 2 * x)

def morphological_open(mask, kernel_size=3):
    """Apply morphological opening (erode then dilate)."""
    # Convert binary mask to PIL Image for filtering
    img = Image.new('L', mask.size, 0)
    pixels = img.load()
    mask_pixels = mask.load()
    
    for y in range(mask.size[1]):
        for x in range(mask.size[0]):
            pixels[x, y] = 255 if mask_pixels[x, y] else 0
    
    # Erode then dilate
    for _ in range(kernel_size // 2):
        img = img.filter(ImageFilter.MinFilter(3))
    for _ in range(kernel_size // 2):
        img = img.filter(ImageFilter.MaxFilter(3))
    
    # Convert back to binary mask
    result = Image.new('1', mask.size, 0)
    result_pixels = result.load()
    img_pixels = img.load()
    
    for y in range(mask.size[1]):
        for x in range(mask.size[0]):
            result_pixels[x, y] = img_pixels[x, y] > 127
    
    return result

def find_connected_components(mask):
    """Find connected components in binary mask. Returns list of component info."""
    width, height = mask.size
    pixels = mask.load()
    visited = [[False] * height for _ in range(width)]
    components = []
    
    def flood_fill(start_x, start_y):
        """BFS flood fill to find component."""
        stack = [(start_x, start_y)]
        component_pixels = []
        min_x, min_y = start_x, start_y
        max_x, max_y = start_x, start_y
        
        while stack:
            x, y = stack.pop()
            if x < 0 or x >= width or y < 0 or y >= height:
                continue
            if visited[x][y] or not pixels[x, y]:
                continue
            
            visited[x][y] = True
            component_pixels.append((x, y))
            min_x, max_x = min(min_x, x), max(max_x, x)
            min_y, max_y = min(min_y, y), max(max_y, y)
            
            # Check 8-connected neighbors
            for dx in [-1, 0, 1]:
                for dy in [-1, 0, 1]:
                    if dx != 0 or dy != 0:
                        stack.append((x + dx, y + dy))
        
        return {
            'pixels': component_pixels,
            'bbox': (min_x, min_y, max_x, max_y),
            'area': len(component_pixels)
        }
    
    for x in range(width):
        for y in range(height):
            if pixels[x, y] and not visited[x][y]:
                comp = flood_fill(x, y)
                if comp['area'] > 0:
                    components.append(comp)
    
    return components

def extract_signature(input_path, output_path):
    """
    Extract signature using background distance, binary masking, and component filtering.
    """
    try:
        # Load image
        img = Image.open(input_path).convert("RGBA")
        width, height = img.size
        
        print(f"Original image size: {width}x{height}")
        
        # Focus on TOP-LEFT quadrant where signature lives
        crop_left = 0
        crop_right = int(width * 0.55)
        crop_top = 0
        crop_bottom = int(height * 0.30)
        
        signature_region = img.crop((crop_left, crop_top, crop_right, crop_bottom))
        crop_width, crop_height = signature_region.size
        print(f"Signature search region: {signature_region.size}")
        
        # Estimate background color
        bg_r, bg_g, bg_b = estimate_background_color(signature_region, margin=60)
        print(f"Estimated background color: RGB({bg_r}, {bg_g}, {bg_b})")
        
        # Build initial alpha mask from distance to background
        pixels = signature_region.load()
        alpha_data = Image.new("L", signature_region.size, 0)
        alpha_pixels = alpha_data.load()
        
        t0 = 8.0
        t1 = 40.0
        saturation_cutoff = 25
        
        for y in range(crop_height):
            for x in range(crop_width):
                r, g, b, _ = pixels[x, y]
                
                # Reject colored pixels
                sat = max(r, g, b) - min(r, g, b)
                if sat > saturation_cutoff:
                    continue
                
                # Distance from background
                dist = math.sqrt((r - bg_r)**2 + (g - bg_g)**2 + (b - bg_b)**2)
                
                if dist < t0:
                    alpha = 0
                elif dist > t1:
                    alpha = 255
                else:
                    normalized = (dist - t0) / (t1 - t0)
                    alpha = int(smoothstep(normalized) * 255)
                
                alpha_pixels[x, y] = alpha
        
        print("Initial alpha mask created")
        
        # Convert to binary mask
        binary_mask = Image.new('1', signature_region.size, 0)
        binary_pixels = binary_mask.load()
        
        for y in range(crop_height):
            for x in range(crop_width):
                binary_pixels[x, y] = alpha_pixels[x, y] > 35
        
        print("Binary mask created (threshold: 35)")
        
        # Morphological opening to remove thin edges
        binary_mask = morphological_open(binary_mask, kernel_size=3)
        
        # Additional erosion to kill 1px borders
        temp_img = Image.new('L', binary_mask.size, 0)
        temp_pixels = temp_img.load()
        mask_pixels = binary_mask.load()
        
        for y in range(crop_height):
            for x in range(crop_width):
                temp_pixels[x, y] = 255 if mask_pixels[x, y] else 0
        
        temp_img = temp_img.filter(ImageFilter.MinFilter(3))
        
        for y in range(crop_height):
            for x in range(crop_width):
                mask_pixels[x, y] = temp_pixels[x, y] > 127
        
        print("Morphological opening + erosion applied")
        
        # Find connected components
        components = find_connected_components(binary_mask)
        print(f"Found {len(components)} connected components")
        
        # Filter components: keep only handwriting
        kept_components = []
        for comp in components:
            area = comp['area']
            min_x, min_y, max_x, max_y = comp['bbox']
            bbox_width = max_x - min_x + 1
            bbox_height = max_y - min_y + 1
            
            # Criteria for handwriting
            if area < 200 or area > 200000:
                continue
            if bbox_height > crop_height * 0.55:
                continue
            if bbox_width < crop_width * 0.25:
                continue
            
            # Reject near-full-rectangle (background frame artifact)
            width_ratio = bbox_width / crop_width
            height_ratio = bbox_height / crop_height
            if width_ratio > 0.85 and height_ratio > 0.70:
                print(f"  Rejecting large rectangle artifact: {bbox_width}x{bbox_height}")
                continue
            
            kept_components.append(comp)
        
        print(f"Kept {len(kept_components)} handwriting components")
        
        # Build cleaned binary mask from kept components
        cleaned_mask = Image.new('1', signature_region.size, 0)
        cleaned_pixels = cleaned_mask.load()
        
        for comp in kept_components:
            for x, y in comp['pixels']:
                cleaned_pixels[x, y] = True
        
        # Rebuild alpha from cleaned mask
        alpha_clean = Image.new("L", signature_region.size, 0)
        alpha_clean_pixels = alpha_clean.load()
        
        for y in range(crop_height):
            for x in range(crop_width):
                if cleaned_pixels[x, y]:
                    alpha_clean_pixels[x, y] = 255
        
        # Slight blur for softer edges
        alpha_clean = alpha_clean.filter(ImageFilter.GaussianBlur(radius=0.6))
        
        print("Cleaned alpha channel created")
        
        # Create final RGBA result
        result = Image.new("RGBA", signature_region.size, (0, 0, 0, 0))
        result_pixels = result.load()
        alpha_final_pixels = alpha_clean.load()
        
        for y in range(crop_height):
            for x in range(crop_width):
                alpha = alpha_final_pixels[x, y]
                if alpha > 10:
                    r, g, b, _ = pixels[x, y]
                    result_pixels[x, y] = (r, g, b, alpha)
        
        # Auto-crop with padding
        bbox = result.getbbox()
        if bbox:
            padding = 25
            bbox_padded = (
                max(0, bbox[0] - padding),
                max(0, bbox[1] - padding),
                min(crop_width, bbox[2] + padding),
                min(crop_height, bbox[3] + padding)
            )
            result = result.crop(bbox_padded)
            print(f"Final signature size: {result.size}")
        else:
            print("Warning: No signature detected after filtering")
        
        # Save result
        result.save(output_path, "PNG", optimize=True)
        print(f"✓ Signature extracted to: {output_path}")
        
        size_kb = os.path.getsize(output_path) / 1024
        print(f"  File size: {size_kb:.1f} KB")
        
        return True
        
    except Exception as e:
        print(f"✗ Error: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        return False

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    
    input_path = os.path.join(project_root, "public/assets/Lil Movements (LOGO).png")
    output_path = os.path.join(project_root, "public/assets/lil-signature.png")
    
    if not os.path.exists(input_path):
        print(f"✗ Logo file not found: {input_path}", file=sys.stderr)
        sys.exit(1)
    
    print("=" * 60)
    print("Extracting handwritten signature (strokes only)")
    print("=" * 60)
    success = extract_signature(input_path, output_path)
    
    if success:
        print("\n✓ Extraction complete!")
    else:
        print("\n✗ Extraction failed")
    
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()
