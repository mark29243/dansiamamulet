const https = require('https');

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (e) => {
      resolve({ url, error: e.message });
    });
  });
}

async function run() {
  console.log('Testing live Vercel deployment...');
  const pageRes = await checkUrl('https://dansiamamulets.com/fb.html');
  console.log('fb.html:', pageRes.status);

  const testImages = [
    'https://dansiamamulets.com/amulets/talisman_sarika_1.jpg',
    'https://dansiamamulets.com/amulets/talisman_namtao_1.jpg',
    'https://dansiamamulets.com/amulets/batch2_khunphaen_1.jpg',
    'https://dansiamamulets.com/amulets/batch2_lpthuat_1.jpg',
    'https://dansiamamulets.com/amulets/somdej_nak_front.jpg',
    'https://dansiamamulets.com/amulets/koon_front.jpg',
    'https://dansiamamulets.com/amulets/turtle_front.jpg',
    'https://dansiamamulets.com/amulets/biagae_front.jpg'
  ];

  for (const imgUrl of testImages) {
    const res = await checkUrl(imgUrl);
    console.log(`${res.status === 200 ? '✅' : '❌'} ${imgUrl} -> HTTP ${res.status}`);
  }
}

run();
