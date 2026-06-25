import sys
from PIL import Image

def process_image_floodfill_no_crop(input_path, output_path):
    print(f"Processing flood fill (NO CROP): {input_path} -> {output_path}")
    try:
        img = Image.open(input_path).convert("RGBA")
        width, height = img.size
        
        # We will use flood fill to find contiguous white background pixels
        corners = [(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)]
        visited = set()
        queue = []
        pixels = img.load()
        
        for c in corners:
            r, g, b, a = pixels[c[0], c[1]]
            if r > 230 and g > 230 and b > 230:
                queue.append(c)
                visited.add(c)
        
        while queue:
            x, y = queue.pop(0)
            pixels[x, y] = (255, 255, 255, 0)
            
            for dx, dy in [(-1,0), (1,0), (0,-1), (0,1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height:
                    if (nx, ny) not in visited:
                        r, g, b, a = pixels[nx, ny]
                        if r > 230 and g > 230 and b > 230:
                            visited.add((nx, ny))
                            queue.append((nx, ny))
        
        # NO CROPPING. Preserve original dimensions perfectly.
        img.save(output_path, "PNG")
        print("Success!")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python remove_bg_flood_no_crop.py <input> <output>")
        sys.exit(1)
    process_image_floodfill_no_crop(sys.argv[1], sys.argv[2])
