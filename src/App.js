import { scaleBand, scaleLinear, max, min, extent, scaleLog } from "d3";
import { useEffect } from "react";
import { useData } from "./useData";

import AxisBottom from "./AxisBottom";
import AxisLeft from "./AxisLeft";
import { YAxis } from "./YAxis";

const width = 1500;
const height = 600;
const margin = { top: 20, right: 20, bottom: 65, left: 80 };

function App() {
  const data = useData();

  if (!data) {
    return <pre>Loading...</pre>;
  }

  // useEffect(() => {}, []);

  const xValue = (d) => d.region;
  const yFemale = (d) => d.female;
  const yMale = (d) => d.male;

  const xScale = scaleBand()
    .domain(data.map(xValue))
    .range([0, width])
    .paddingOuter(0.1)
    .paddingInner(0.01);

  const yMaleScale = scaleLog()
    .domain(extent(data, yMale))
    .range([height, 0])
    .nice();

  const yFemaleScale = scaleLog()
    .domain(extent(data, yFemale))
    .range([height, 0])
    .nice();

  const Mark = ({
    data,
    xScale,
    yMaleScale,
    yFemaleScale,
    xValue,
    yFemale,
    yMale,
    height,
  }) => {
    return data.map((d, idx) => {
      // console.log(xScale(xValue(d)));
      console.log(yMaleScale(yMale(d)));
      return (
        <g key={idx}>
          <rect
            className="mark-male"
            x={50 + xScale(xValue(d))}
            y={yMaleScale(yMale(d))}
            width={xScale.bandwidth() / 3}
            height={height - 50 - yMaleScale(yMale(d))}
            fill="#688BAB"
          />
          <rect
            className="mark-female"
            x={50 + xScale(xValue(d)) + xScale.bandwidth() / 3}
            y={yFemaleScale(yFemale(d))}
            width={xScale.bandwidth() / 3}
            height={height - 50 - yFemaleScale(yFemale(d))}
            fill="#E25A42"
          />
        </g>
      );
    });
  };

  return (
    <>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom xScale={xScale} height={height} />
          {/* <AxisLeft yMaleScale={yMaleScale} /> */}
          <YAxis yMaleScale={yMaleScale} width={width} />
          <Mark
            data={data}
            xScale={xScale}
            yMaleScale={yMaleScale}
            yFemaleScale={yFemaleScale}
            xValue={xValue}
            yFemale={yFemale}
            yMale={yMale}
            height={height}
          />
        </g>
      </svg>
    </>
  );
}

export default App;
