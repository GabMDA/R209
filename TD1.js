const btn = document.getElementById('myButton');
const resultDiv = document.getElementById('result');

btn.addEventListener('click', async () => {
  const response = await fetch('/api/forecast/beaches/daily/{day}/bbox');
  const data = await response.json();
  resultDiv.textContent = JSON.stringify(data);
});