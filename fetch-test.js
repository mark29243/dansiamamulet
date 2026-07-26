fetch('https://dansiamamulets.com/api/test-db').then(r=>r.text()).then(t=>console.log(t)).catch(e=>console.error(e));
