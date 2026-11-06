async function check() {
  const res = await fetch('https://dansiamamulets.com/fb.html?ts=' + Date.now());
  const text = await res.text();
  console.log('Live fb.html length:', text.length);
  const ids = ['turtle', 'rahu', 'tigertakrut', 'garuda', 'biagae'];
  ids.forEach(id => {
    console.log(`Checking data-id="${id}":`, text.includes(`data-id="${id}"`));
  });
  const cardCount = (text.match(/class="card"/g) || []).length;
  console.log('Total live cards:', cardCount);
}

check();
