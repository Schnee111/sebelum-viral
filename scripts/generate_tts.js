import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// Load scenes from the data file.
// We will read the ts file directly with regex to avoid compilation issues,
// since we just need id, speaker, and text.

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

console.log(`Found ${dialogues.length} dialog lines.`);

const audioDir = path.join(process.cwd(), 'public/assets/audio/dialog');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

for (const d of dialogues) {
  // If speaker is narrator or system, we might want a specific voice or no voice.
  // The AUDIO_REQUIREMENTS.md says:
  // id-ID-GadisNeural: Nala, Lala, Citra, Bu Sari, Maya
  // id-ID-ArdiNeural: Aldi, Bintang, Rendra, Pak Ardi, Dimas, Reza
  
  if (['narrator', 'system'].includes(d.speaker)) {
    continue; // skip narrator/system for now
  }

  const femaleVoices = ['nala', 'lala', 'citra', 'bu sari', 'maya'];
  const voice = femaleVoices.includes(d.speaker) ? 'id-ID-GadisNeural' : 'id-ID-ArdiNeural';

  const outPath = path.join(audioDir, `${d.id}.mp3`);
  
  if (fs.existsSync(outPath)) {
    continue;
  }

  // Escape quotes in text
  const safeText = d.text.replace(/"/g, '\\"');
  
  console.log(`Generating [${d.speaker}] ${d.id}...`);
  try {
    const cmd = `C:\\Users\\Daffa\\.local\\bin\\uvx.exe edge-tts --voice ${voice} --text "${safeText}" --write-media "${outPath}"`;
    execSync(cmd, { stdio: 'pipe' });
  } catch (err) {
    console.error(`Failed to generate audio for ${d.id}:`, err.message);
  }
}

console.log("Done generating TTS audio.");
