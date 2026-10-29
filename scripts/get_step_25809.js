const fs = require('fs');
const readline = require('readline');

async function extract() {
  const fileStream = fs.createReadStream('C:/Users/mark2/.gemini/antigravity/brain/26fd4403-8c83-4e63-b8a2-d8d9edb4520b/.system_generated/logs/transcript_full.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  for await (const line of rl) {
    if (line.includes('"step_index": 25809') || line.includes('"step_index":25809')) {
      const obj = JSON.parse(line);
      fs.writeFileSync('scripts/roadmap_50_full.md', obj.content, 'utf8');
      console.log('Saved roadmap_50_full.md successfully! Length:', obj.content.length);
      break;
    }
  }
}
extract();
