import glob
from PIL import Image

def crop_to_square():
    png_files = glob.glob("public/assets/characters/**/*.png", recursive=True)
    for path in png_files:
        try:
            img = Image.open(path)
            width, height = img.size
            
            # If it's the tall aspect ratio (e.g., 848 x 1264)
            if height > width:
                print(f"Cropping {path} from {width}x{height} to {width}x{width} (half-body)")
                
                # Crop the bottom off so it becomes a square (like aldi_confused)
                # left, top, right, bottom
                box = (0, 0, width, width)
                img = img.crop(box)
                img.save(path)
            else:
                print(f"Skipping {path}, already aspect ratio <= 1 ({width}x{height})")
        except Exception as e:
            print(f"Error processing {path}: {e}")

if __name__ == "__main__":
    crop_to_square()
