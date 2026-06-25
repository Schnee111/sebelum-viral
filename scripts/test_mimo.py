import os
from openai import OpenAI
import httpx
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("MIMO_API_KEY")

client = OpenAI(
    api_key=api_key,
    base_url="https://api.xiaomimimo.com/v1",
)

try:
    print("Testing /v1/audio/speech endpoint...")
    response = client.audio.speech.create(
        model="mimo-v2.5-tts",
        voice="alloy", # We will try a default voice, hopefully it works or ignores it
        input="Halo, ini adalah tes sintesis suara dari MiMo API."
    )
    
    with open("mimo_test.mp3", "wb") as f:
        f.write(response.content)
    print("Success! Created mimo_test.mp3")
except Exception as e:
    print("Error with /v1/audio/speech:", e)
    
    print("\nTrying raw HTTP request to /v1/chat/completions as per search results...")
    headers = {
        "api-key": api_key,
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "mimo-v2.5-tts",
        "messages": [
            {"role": "assistant", "content": "Halo, ini adalah tes sintesis suara."}
        ],
        "audio": {
            "voice": "default",
            "format": "mp3"
        }
    }
    res = httpx.post("https://api.xiaomimimo.com/v1/chat/completions", headers=headers, json=payload)
    print("Status:", res.status_code)
    print("Response:", res.text[:500])
