'use strict';
// Static HTML is complete without JavaScript; controls only narrow the visible data.
const filters = [...document.querySelectorAll('[data-filter]')];
const rows = [...document.querySelectorAll('tr[data-run]')];
function filterRuns() {
  let count = 0;
  for (const row of rows) {
    const visible = filters.every(control => {
      const value = control.value.toLowerCase().trim();
      return !value || (control.dataset.filter === 'search'
        ? row.dataset.search.includes(value)
        : row.dataset[control.dataset.filter] === value);
    });
    row.hidden = !visible;
    count += Number(visible);
  }
  const summary = document.querySelector('#run-count');
  if (summary) summary.textContent = `${count} of ${rows.length} runs`;
  const empty = document.querySelector('#no-results');
  if (empty) empty.hidden = count !== 0;
}
for (const control of filters) {
  control.disabled = false;
  control.addEventListener('input', filterRuns);
  control.addEventListener('change', filterRuns);
}
const cohort = document.querySelector('#cohort');
const metric = document.querySelector('#metric');
function chooseChart() {
  for (const plot of document.querySelectorAll('[data-chart]')) {
    plot.hidden = plot.dataset.cohort !== cohort.value || plot.dataset.metric !== metric.value;
  }
}
if (cohort && metric) {
  cohort.disabled = metric.disabled = false;
  cohort.addEventListener('change', chooseChart);
  metric.addEventListener('change', chooseChart);
  chooseChart();
}
