const values = [5,8,2,1,15,2,3,5,9,11,10,4,3,14,1,7,10,3,2,13];

const barChart = document.getElementById('bar-chart');

drawBarChart(values);

function drawBarChart(values) {
  values.forEach((value, i) => barChart.append(drawBar(value, ++i)));
  drawScale(values);
}

function drawBar(value, index) {
  const BAR_WIDTH = 30;
  const BAR_GAP = 15;
  const SCALE = 10;

  const bar = document.createElement('div');
  bar.className = 'bar';

  bar.style.cssText = ` width: ${BAR_WIDTH}px;
    height: ${value * SCALE}px;
    background-color: ${getColor(value)};
    margin-right: ${BAR_GAP}px;
  `;

  bar.append(drawMark(index));
  return bar;
}

function drawMark(value) {
  const grade = document.createElement('span');
  grade.innerText = value;
  return grade;
}

function getColor(value) {
  let color = 'green';

  if (value > 5) color = 'yellow';
  if (value > 10) color = 'red';

  return color;
}

function drawScale(values) {
  const max = Math.max(...values);
  let mark = findNearestRoundUp(max);

  const scale = document.createElement('div');
  scale.className = 'scale';
  scale.style.height = barChart.clientHeight + 18 + 'px';

  while (mark >= 0) {
    const span = document.createElement('span');
    span.innerText = mark;
    scale.append(span);
    mark -= 5;
  }

  barChart.append(scale);

  function findNearestRoundUp(value) {
    while (value % 5 !== 0) {
      value++;
    }
    return value;
  }
}
