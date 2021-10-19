const input = document.getElementById('name');
const button = document.getElementById('button');
const hideTextResults = document.getElementById('hideTextResults');
const results = document.getElementById('results');
input.addEventListener('change', stateHandle);

function stateHandle() {
  if (document.getElementById('name').value === '') {
    hideTextResults.style.display = 'none';
  } else {
    hideTextResults.style.display = 'block';
    // document.getElementById('results').innerHTML = '';
  }
}
