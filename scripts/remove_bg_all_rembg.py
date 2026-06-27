import sys
import glob
from rembg import remove
from PIL import Image

def process_all_rembg():
    # The source files are all the .jpg files in the artifacts directory
    # We will map them to their corresponding destinations
    
    mapping = {
        "bintang_neutral_1782564681179.jpg": "public/assets/characters/bintang/bintang_neutral.png",
        "busalma_neutral_1782564692098.jpg": "public/assets/characters/busalma/busalma_neutral.png"
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
