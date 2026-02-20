import PropTypes from "prop-types";
import { useState, useEffect } from "react";
// @mui
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import Button from '@mui/material/Button';
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
// components
import HeavyLiftingDetails from "src/sections/overview/app/app-heavy-lifting";
// ----------------------------------------------------------------------
import { useEquipment } from "src/hooks/useEquipment";
import { useViewerFunction } from "src/autodesk/useViewerFunctions";


export default function ConsProgressTable({ years, ...other }) {
  const { hl, hlVersion, tempProgress, tempProgressVersion } = useEquipment();
  const [seriesData, setSeriesData] = useState([]);
  const [details, setDetails] = useState([]);
  const [chkEq, setChkEq] = useState(false);
  const [chkSt, setChkSt] = useState(false);
  const [chkPip, setChkPip] = useState(false);
  const [chkTray, setChkTray] = useState(false);
  const [summary, setSummary] = useState({ Weight: 0, Height: 0 });
  const {init, searchAndIsolate, clearDBSets, unIsolate, clearThemingColors } = useViewerFunction();

  const handleCheckBoxEq = (event) => {
    setChkEq(event.target.checked);
  };
  const handleCheckBoxSt = (event) => {
    setChkSt(event.target.checked);
  };

  const handleCheckBoxPip = (event) => {
    setChkPip(event.target.checked);
  };

  const handleCheckBoxTray = (event) => {
    setChkTray(event.target.checked);
  };


  const handleStepOnClick = () => {
    let detMin = [];

    if (chkEq) {
      tempProgress
        .filter((item) => item.Discipline === 'Equipment')
        .map((a) => {
          detMin.push({
            Discipline: a.Discipline,
            Tag: a.Tag,
            Status: a.Status,
          });
        });
    }

    if (chkTray) {
      tempProgress
        .filter((item) => item.Discipline === 'Tray')
        .map((a) => {
          detMin.push({
            Discipline: a.Discipline,
            Tag: a.Tag,
            Status: a.Status,
          });
        });
    }

    if (chkPip) {
      tempProgress
        .filter((item) => item.Discipline === 'Piping')
        .map((a) => {
          detMin.push({
            Discipline: a.Discipline,
            Tag: a.Tag,
            Status: a.Status,
          });
        });
    }

    if (chkSt) {
      tempProgress
        .filter((item) => item.Discipline === 'Structure')
        .map((a) => {
          detMin.push({
            Discipline: a.Discipline,
            Tag: a.Tag,
            Status: a.Status,
          });
        });
    }

    // setDetails(detMin);
    renderEquipment(detMin);
  };

  const renderEquipment = (detMin) => {
    clearDBSets();
    unIsolate();
    clearThemingColors();

    console.log(detMin)

    detMin.map((eq) => {
        switch (eq.Status) {
            case 'Erected':
                searchAndIsolate(eq.Tag, 0,255,0,1)
                break;
            case 'On Hold':
                searchAndIsolate(eq.Tag,255,0,0,1)
                break;
            case 'Tested':
                searchAndIsolate(eq.Tag,0,0,255,1)
                break;
            case 'Flushed':
                searchAndIsolate(eq.Tag,46,196,182,1)
                break;
            case 'Reinstated':
                searchAndIsolate(eq.Tag,255,0,110,1)
                break;
            case 'Ongoing':
                searchAndIsolate(eq.Tag,255,190,11,1)
                break;
            case 'Not Started':
                searchAndIsolate(eq.Tag,109,106,117,1)
                break;
            
        }

    });
  };

  return (
    <>
      <Card {...other}>
        <CardHeader
          title={"Progress Summary"}
          subheader={""}
          action={
            <>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={chkEq}
                      onChange={handleCheckBoxEq}
                      color="secondary"
                    />
                  }
                  label="Equipment"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={chkSt}
                      onChange={handleCheckBoxSt}
                      color="secondary"
                    />
                  }
                  label="Structure"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={chkPip}
                      onChange={handleCheckBoxPip}
                      color="secondary"
                    />
                  }
                  label="Piping"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={chkTray}
                      onChange={handleCheckBoxTray}
                      color="secondary"
                    />
                  }
                  label="Tray"
                />

                <Button onClick={handleStepOnClick} variant="text">Get Progress</Button>

              </FormGroup>

              
            </>
          }
        />
      </Card>


    </>
  );
}

ConsProgressTable.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
