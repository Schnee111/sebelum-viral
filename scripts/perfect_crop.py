import glob
from PIL import Image

def perfect_crop():
    png_files = glob.glob("public/assets/characters/**/*.png", recursive=True)
    for path in png_files:
        try:
            img = Image.open(path)
            orig_w, orig_h = img.size
            
            # Step 1: Crop bottom to make it 1:1 square if it's tall (e.g. Nala 848x1264 -> 848x848)
            # This makes the scale consistent with Aldi (1024x1024)
            if orig_h > orig_w:
                img = img.crop((0, 0, orig_w, orig_w))
                
            # Step 2: Tight crop left and right transparent padding
            bbox = img.getbbox()
            if bbox:
                left, top, right, bottom = bbox
                # We only crop horizontal to keep the height exactly 1:1 ratio's height (or 1024)
                # so the zoom scale remains identical for all characters!
                img = img.crop((left, 0, right, img.height))
                
            img.save(path)
            print(f"Processed {path}")
        except Exception as e:
            print(f"Error processing {path}: {e}")

if __name__ == "__main__":
    perfect_crop()
