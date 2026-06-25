import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      process.env[match[1]] = match[2];
    }
  });
}

const API_KEY = process.env.MIMO_API_KEY;
if (!API_KEY) {
  console.error('MIMO_API_KEY not found in .env');
  process.exit(1);
}

const scenesFile = fs.readFileSync(path.join(process.cwd(), 'src/data/chapter-1/scenes.ts'), 'utf-8');
const regex = /{ id: '([^']+)', speaker: '([^']+)', expression: '([^']+)', text: '([^']+)' }/g;

let match;
let dialogues = [];
while ((match = regex.exec(scenesFile)) !== null) {
  dialogues.push({
    id: match[1],
    speaker: match[2],
    text: match[4]
  });
}

console.log(`Found ${dialogues.length} dialog lines. Starting MiMo TTS generation...`);

const audioDir = path.join(process.cwd(), 'public/assets/audio/dialog');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

async function processDialogues() {
  for (const d of dialogues) {
    if (['narrator', 'system'].includes(d.speaker)) {
      continue;
    }

    const outPath = path.join(audioDir, `${d.id}.mp3`);
    
    // Check if we already generated it (maybe you want to overwrite? Let's overwrite for now to get MiMo voices, or just remove existing ones first)
    
    console.log(`Generating [${d.speaker}] ${d.id} using MiMo TTS...`);
    
    try {
      const response = await fetch('https://token-plan-sgp.xiaomimimo.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'User-Agent': 'Antigravity/1.0.0'
        },
        body: JSON.stringify({
          model: 'mimo-v2.5-tts',
          messages: [{ role: 'assistant', content: d.text }],
          audio: { voice: 'mimo_default', format: 'mp3' }
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error(`Failed ${d.id}: HTTP ${response.status} - ${errText}`);
        continue;
      }

      const json = await response.json();
      const audioDataStr = json.choices?.[0]?.message?.audio?.data;
      
      if (!audioDataStr) {
         console.error(`Failed ${d.id}: No audio data in response`);
         continue;
      }
      
      // format is like: data:audio/mp3;base64,.....
      const base64Data = audioDataStr.split(',')[1] || audioDataStr;
      const buffer = Buffer.from(base64Data, 'base64');
      
      fs.writeFileSync(outPath, buffer);
      console.log(`Saved ${d.id}.mp3`);
      
      // small delay to avoid rate limit
      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.error(`Error generating ${d.id}:`, err.message);
    }
  }
  console.log("Done generating all MiMo TTS audio!");
}

processDialogues();
