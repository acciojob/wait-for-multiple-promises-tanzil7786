//your JS code here. If required.
// Get the table element
const table = document.getElementById('table');

// Create an array of 3 promises
const promises = Array.from({ length: 3 }, () => createRandomPromise());

// Add a row with "Loading..." text
const loadingRow = createTableRow('Loading...', 2);
table.appendChild(loadingRow);

// Wait for all promises to resolve using Promise.all
Promise.all(promises)
  .then(results => {
    // Remove the loading row
    table.removeChild(loadingRow);

    // Populate the table with the resolved values
    results.forEach((result, index) => {
      const row = createTableRow(`Promise ${index + 1}`, result);
      table.appendChild(row);
    });

    // Calculate the total time taken
    const totalTime = results.reduce((sum, result) => sum + result, 0);
    const totalRow = createTableRow('Total', totalTime.toFixed(3));
    table.appendChild(totalRow);
  });

// Helper function to create a random promise that resolves after a random time
function createRandomPromise() {
  const delay = Math.floor(Math.random() * 3000) + 1000; // Random time between 1 and 3 seconds
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(delay / 1000); // Resolve with the time taken in seconds
    }, delay);
  });
}

// Helper function to create a table row with specified text content in columns
function createTableRow(content, colSpan) {
  const row = document.createElement('tr');
  const cell = document.createElement('td');
  cell.textContent = content;
  cell.colSpan = colSpan;
  row.appendChild(cell);
  return row;
}
