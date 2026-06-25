import glob
from PIL import Image

def crop_all():
    png_files = glob.glob("public/assets/characters/**/*.png", recursive=True)
    for path in png_files:
        try:
            img = Image.open(path)
            bbox = img.getbbox()
            if bbox:
                # Only crop if necessary to save time/writes
                if bbox != (0, 0, img.width, img.height):
                    print(f"Cropping {path} from {img.size} to bbox {bbox}")
                    img = img.crop(bbox)
                    img.save(path)
                else:
                    print(f"Skipping {path}, already tightly cropped.")
        except Exception as e:
            print(f"Error processing {path}: {e}")

if __name__ == "__main__":
    crop_all()
