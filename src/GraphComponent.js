import React from 'react';
import Plot from 'react-plotly.js';

const GraphComponent = ({ plotData }) => {
  const layout = {
    width: 600,
    height: 400,
    title: 'Graph Component',
    xaxis: { title: 'X Axis' },
    yaxis: { title: 'Y Axis' },
    legend: { x: 0, y: 1 },
  };

  return <Plot data={plotData} layout={layout} />;
};

export default GraphComponent;
