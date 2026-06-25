import glob
from PIL import Image

def crop_bottom_only():
    png_files = glob.glob("public/assets/characters/**/*.png", recursive=True)
    for path in png_files:
        try:
            img = Image.open(path)
            bbox = img.getbbox()
            if bbox:
                # bbox is (left, upper, right, lower)
                # We want to keep original left, original right, original upper,
                # but crop 'lower' to the bbox lower so the bottom touches perfectly.
                # Actually, to prevent height jumps when changing expressions (like jumping if they lean down),
                # maybe we just crop the bottom to the lowest non-transparent pixel.
                
                # Original dimensions
                orig_w, orig_h = img.size
                _, _, _, lowest_y = bbox
                
                if lowest_y < orig_h:
                    print(f"Cropping BOTTOM of {path} from {orig_h} to {lowest_y}")
                    # Crop (left, top, right, bottom)
                    img = img.crop((0, 0, orig_w, lowest_y))
                    img.save(path)
                else:
                    print(f"Skipping {path}, bottom already touches.")
        except Exception as e:
            print(f"Error processing {path}: {e}")

if __name__ == "__main__":
    crop_bottom_only()
