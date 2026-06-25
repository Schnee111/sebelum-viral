import wave
import math
import struct
import os

def generate_blip(filename, frequency, duration_ms, volume=0.3):
    sample_rate = 44100
    num_samples = int(sample_rate * (duration_ms / 1000.0))
    
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    
    with wave.open(filename, 'w') as wav_file:
        wav_file.setnchannels(1)
        wav_file.setsampwidth(2)
        wav_file.setframerate(sample_rate)
        
        for i in range(num_samples):
            # Sine wave
            t = float(i) / sample_rate
            value = math.sin(2.0 * math.pi * frequency * t)
            
            # Simple envelope to prevent clicking (fade in/out)
            attack_samples = int(0.1 * num_samples)
            decay_samples = int(0.2 * num_samples)
            
            envelope = 1.0
            if i < attack_samples:
                envelope = i / attack_samples
            elif i > num_samples - decay_samples:
                envelope = (num_samples - i) / decay_samples
                
            final_val = int(value * envelope * volume * 32767.0)
            
            # Pack as 16-bit short
            wav_file.writeframes(struct.pack('<h', final_val))

if __name__ == "__main__":
    out_dir = "public/assets/audio/sfx"
    
    # Female / High pitch (Nala, Lala)
    generate_blip(f"{out_dir}/blip_high.wav", 880.0, 40) # A5
    
    # Male / Mid pitch (Aldi, Rendra)
    generate_blip(f"{out_dir}/blip_mid.wav", 440.0, 40) # A4
    
    # Narrator / Deep pitch
    generate_blip(f"{out_dir}/blip_deep.wav", 220.0, 40) # A3

    print("Blips generated successfully!")
