const res = await fetch('https://kailash2026.com/api/booking', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'PowerShellTest', email: 'kailash2026Lucas@outlook.com', package: 'test', people: '1' })
});
console.log(await res.text());
