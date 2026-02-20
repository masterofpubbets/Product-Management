import { Gantt, Willow, WillowDark, Toolbar } from "@svar-ui/react-gantt";
import "@svar-ui/react-gantt/all.css";
import './GanttCss.css'
import { useTheme } from "@mui/material/styles";


const dayStyle = (a) => {
  const day = a.getDay() === 5 || a.getDay() === 6;
  return day ? "sday" : "";
};

const scales = [
  { unit: "year", step: 1, format: "yyyy" },
  { unit: "month", step: 2, format: "MMMM yyy" },
  { unit: "week", step: 1, format: "w" },
  { unit: "day", step: 1, format: "d", css: dayStyle },
];

function isDayOff(date) {
    const d = date.getDay();
    return d === 0 || d === 6;
}
function isHourOff(date) {
    const h = date.getHours();
    return h < 8 || h === 12 || h > 17;
}

function highlightTime(d, u) {
    if (u === "day" && isDayOff(d)) return "wx-weekend";
    if (u === "hour" && (isDayOff(d) || isHourOff(d))) return "wx-weekend";
    return "";
}

export default function CustomeGantt({
  headers,
  tasks,
  links,
  scaleHeight,
  autoScale,
  durationUnit,
  taskTypes,
  zoom
}) {
  const theme = useTheme();

  const init = (api) => {
    console.log('api')
    api.intercept("select-summary", ev => {
    console.log("The id of the selected task:", ev.id);
    // block selection, so there will be no reaction for the event in the component
    // can be used to show a custom info panel for clicking on a task
    return false;
  });
  };


  const renderGantt = () => {
    if (tasks.length > 0) {
      if (theme.palette.mode === "dark") {
        return (
          <WillowDark>
            <Gantt
              columns={headers}
              tasks={tasks}
              links={links}
              scales={scales}
              readonly={false}
              scaleHeight={scaleHeight}
              autoScale={autoScale}
              cellBorders='full'
              durationUnit={durationUnit}
              highlightTime={highlightTime}
              taskTypes={taskTypes}
              zoom={zoom}

            />
          </WillowDark>
        );
      } else {
        return (
          <Willow>
            <Gantt
              columns={headers}
              tasks={tasks}
              links={links}
              scales={scales}
              readonly={false}
              scaleHeight={scaleHeight}
              autoScale={autoScale}
              cellBorders='full'
              durationUnit={durationUnit}
              highlightTime={highlightTime}
              taskTypes={taskTypes}
              zoom={zoom}
            />
          </Willow>
        );
      }
    } else {
      return null;
    }
  };

  return (
    <div className="demo">
      {renderGantt()}
    </div>
  );
}
