import {useState, useEffect} from 'react';
import { Chart } from "react-google-charts";

const initData2 = [
  ["Element", "Density", { role: "style" }],
  ["Copper", 8.94, "#b87333"], // RGB value
  ["Silver", 10.49, "silver"], // English color name
  ["Gold", 19.3, "gold"],
  ["Platinum", 21.45, "color: #e5e4e2"], // CSS-style declaration
];

const initData = [
  ["Element", "Density", { role: "style" }],
  ["Copper", 0, "#b87333"], // RGB value
];

const options = {
  width: '100%',
  height: '100%',
  title: 'Toppings I Like On My Pizza',
  colors: ['white', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
  is3D: true,
  backgroundColor: 'yellow',
  color: 'white'
};

export default function CustomChart({title, data, is3D, bg, densityColor}) {
  const [chartData, setChartData] = useState([
                                               ["Element", "Density", { role: "style" }],
                                               ...data
                                             ]);
  const [chartOptions, setChartOptions] = useState([]);

  useEffect(() => {
    setChartData([
                   ["Element", "Density", { role: "style" }],
                   ...data
                 ])
  }, [data]);

  useEffect(() => {
    setChartOptions({
                      width: '100%',
                      height: '100%',
                      title: title,
                      colors: [densityColor, 'white', 'white', 'white', 'white'],
                      is3D: is3D,
                      backgroundColor: bg,
                      color: 'white'
                    })

  }, [title, bg, densityColor])


  return (
    <div style={{ width: '100%', height: '70vh' }}>
      {data.length > 0 &&
       <Chart chartType="ColumnChart" width="100%" height="100%" data={chartData} options={chartOptions}/>
      }
    </div>
  );
}
