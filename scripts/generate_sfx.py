import wave
import math
import struct
import os

def generate_beep(filename, freq=440.0, duration=0.1, sample_rate=44100, volume=0.5):
    filepath = os.path.join(os.getcwd(), 'public', 'assets', 'audio', 'sfx', filename)
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    
    with wave.open(filepath, 'w') as f:
        f.setnchannels(1) # mono
        f.setsampwidth(2) # 2 bytes = 16 bit
        f.setframerate(sample_rate)
        
        for i in range(int(duration * sample_rate)):
            # Fade out
            env = 1.0 - (i / (duration * sample_rate))
            value = int(volume * env * 32767.0 * math.sin(2.0 * math.pi * freq * i / sample_rate))
            data = struct.pack('<h', value)
            f.writeframesraw(data)

# Notification: High pitched double beep
generate_beep('sfx_notification.mp3', freq=880.0, duration=0.2) # Not strictly MP3, it's WAV, but modern browsers support WAV. Wait, if it ends in .mp3 but is a WAV, Howler might fail or warn. I should save as .wav and use .wav in code. Or I can use ffmpeg, but I don't know if ffmpeg is available.
# Let's save as .wav
generate_beep('sfx_notification.wav', freq=880.0, duration=0.2)
generate_beep('sfx_click.wav', freq=600.0, duration=0.05)
generate_beep('sfx_evidence_unlock.wav', freq=1200.0, duration=0.5)
generate_beep('sfx_edge_connect.wav', freq=900.0, duration=0.3)
generate_beep('sfx_contradiction.wav', freq=300.0, duration=0.6)
generate_beep('sfx_reflection.wav', freq=500.0, duration=1.0)
print("Placeholder SFX generated (as .wav).")
