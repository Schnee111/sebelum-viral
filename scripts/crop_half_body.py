
import glob
from PIL import Image

def force_half_body():
    png_files = [
        'public/assets/characters/bintang/bintang_neutral.png',
        'public/assets/characters/busalma/busalma_neutral.png'
    ]
    for path in png_files:
        try:
            img = Image.open(path)
            bbox = img.getbbox()
            if bbox:
                left, top, right, bottom = bbox
                w = right - left
                
                # Nala and Aldi have a ratio of ~2.0. So we force the same ratio!
                new_bottom = int(top + (w * 2.0))
                
                if new_bottom > bottom:
                    new_bottom = bottom
                
                print(f'Cropping {path}: Left {left}, Top {top}, Right {right}, Bottom {new_bottom}')
                img = img.crop((left, top, right, new_bottom))
                img.save(path)
                print('Success')
        except Exception as e:
            print(f'Error processing {path}: {e}')

if __name__ == '__main__':
    force_half_body()

