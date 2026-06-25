import glob
from PIL import Image

def tight_crop_horizontal_and_zoom():
    png_files = glob.glob("public/assets/characters/**/*.png", recursive=True)
    for path in png_files:
        try:
            img = Image.open(path)
            bbox = img.getbbox()
            if bbox:
                left, top, right, bottom = bbox
                
                # Crop left and right to exactly the visible pixels (tight horizontal crop)
                # This prevents the transparent boxes from overlapping in CSS
                new_left = left
                new_right = right
                
                # Crop an additional 15% off the bottom to zoom in more (chest-up)
                orig_w, orig_h = img.size
                
                # Calculate 15% of the original height to chop off the bottom
                # (since they are currently 1:1, this will make them slightly wider than tall)
                chop_amount = int(orig_h * 0.15)
                new_bottom = orig_h - chop_amount
                
                # If the new_bottom is higher than the visible top, don't chop that much
                if new_bottom <= top:
                    new_bottom = bottom
                
                print(f"Cropping {path}: Left {new_left}, Right {new_right}, Bottom {new_bottom}")
                
                img = img.crop((new_left, 0, new_right, new_bottom))
                img.save(path)
                
        except Exception as e:
            print(f"Error processing {path}: {e}")

if __name__ == "__main__":
    tight_crop_horizontal_and_zoom()
