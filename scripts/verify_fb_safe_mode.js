const fs = require('fs');

const html = fs.readFileSync('public/fb.html', 'utf8');

const cards = (html.match(/<div class="card"/g) || []).length;
const copyBtns = (html.match(/<button class="copy-btn"/g) || []).length;
const copyCommentBtns = (html.match(/<button class="copy-comment-btn"/g) || []).length;
const commentBoxes = (html.match(/<div class="comment-preview-box"/g) || []).length;

const captionBlocks = html.match(/<div class="caption-preview"[^>]*>([\s\S]*?)<\/div>/g) || [];
let leakedUrls = 0;
captionBlocks.forEach((block, idx) => {
  if (block.includes('http://') || block.includes('https://')) {
    console.log('Leaked URL in block ' + idx + ': ' + block.slice(0, 100));
    leakedUrls++;
  }
});

console.log('Total Cards in HTML:', cards);
console.log('Total Copy Caption Buttons:', copyBtns);
console.log('Total Copy Comment Buttons:', copyCommentBtns);
console.log('Total Comment Preview Boxes:', commentBoxes);
console.log('Leaked External URLs in Main Captions:', leakedUrls);

if (cards === 18 && copyBtns === 18 && copyCommentBtns === 18 && commentBoxes === 18 && leakedUrls === 0) {
  console.log('✅ VERIFICATION_PASSED: All 18 cards are 100% Safe Mode compliant!');
} else {
  console.error('❌ VERIFICATION_FAILED: Discrepancy found.');
  process.exit(1);
}
