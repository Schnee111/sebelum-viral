import sys
import glob
from rembg import remove
from PIL import Image

def process_all_rembg():
    # The source files are all the .jpg files in the artifacts directory
    # We will map them to their corresponding destinations
    
    mapping = {
        "nala_sprite_1782385311852.jpg": "public/assets/characters/nala/nala_neutral.png",
        "nala_curious_1782386540110.jpg": "public/assets/characters/nala/nala_curious.png",
        "nala_determined_1782386571888.jpg": "public/assets/characters/nala/nala_determined.png",
        "nala_shocked_1782386550069.jpg": "public/assets/characters/nala/nala_shocked.png",
        "nala_worried_1782386560410.jpg": "public/assets/characters/nala/nala_worried.png",
        "aldi_sprite_1782385505161.jpg": "public/assets/characters/aldi/aldi_neutral.png",
        "aldi_confused_1782389627657.jpg": "public/assets/characters/aldi/aldi_confused.png",
        "aldi_defensive_1782389641336.jpg": "public/assets/characters/aldi/aldi_defensive.png",
        "lala_sprite_1782385516385.jpg": "public/assets/characters/lala/lala_neutral.png",
        "rendra_sprite_1782385527446.jpg": "public/assets/characters/rendra/rendra_neutral.png"
    }
    
    artifact_dir = r"C:\Users\Daffa\.gemini\antigravity-cli\brain\49d8819e-2b27-490f-b6e7-c2571905d5c6"
    
    for src, dest in mapping.items():
        src_path = f"{artifact_dir}\\{src}"
        print(f"Processing rembg: {src_path} -> {dest}")
        try:
            input_image = Image.open(src_path)
            output_image = remove(input_image)
            output_image.save(dest)
            print("Success!")
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    process_all_rembg()
