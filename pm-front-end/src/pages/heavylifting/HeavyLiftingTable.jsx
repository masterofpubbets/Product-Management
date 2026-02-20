import PropTypes from "prop-types";
import { useState, useEffect } from "react";
// @mui
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
// components
import HorizontalNonLinearStepper from "src/components/stepper/HorizontalNonLinearStepper";
import HeavyLiftingDetails from "src/sections/overview/app/app-heavy-lifting";
// ----------------------------------------------------------------------
import { useEquipment } from "src/hooks/useEquipment";
import { useViewerFunction } from "src/autodesk/useViewerFunctions";



export default function HeavyLiftingTable({ years, ...other }) {
  const { hl, hlVersion } = useEquipment();
  const [seriesData, setSeriesData] = useState([]);
  const [year, setYear] = useState("");
  const [months, setMonths] = useState([]);
  const [details, setDetails] = useState([]);
  const [chk, setChk] = useState(false);
  const [summary, setSummary] = useState({Weight: 0, Height: 0});
  const {init, searchAndIsolate, clearDBSets, unIsolate, clearThemingColors} = useViewerFunction();

  const cmbChange = (event) => {
    setYear(event.target.value);
    renderMonths(event.target.value);
  };

  const handleCheckBox = (event) => {
    setChk(event.target.checked);
  };

  let w = 0
  let h = 0

  const handleStepOnClick = (step) => {
    let detMin = [];
    hl.filter((item) => item.YearMonthDate === step).map((a) => {
      detMin.push({
        Category: a.Category,
        CraneType: a.CraneType,
        Equipment: a.Equipment,
        Start: a.Start,
        StartDate: a.StartDate,
        Weight: a.Weight,
        Height: a.Height
      })
      w = w + a.Weight
      h = h + a.Height;
    });

    setSummary({Weight: w, Height: h})

    setDetails(detMin);
    renderEquipment(detMin);
  };

  const renderEquipment = (detMin) => {
    let prevEq = [];
    if (detMin.length > 0) {
      const detMinSorted = []
        .concat(...detMin)
        .sort((a, b) => (a.StartDate > b.StartDate ? 1 : -1));
      const startDate = detMinSorted[0].StartDate;

      hl.filter((e) => e.StartDate < startDate).map((a) => {
        prevEq.push({Equipment: a.Equipment});
      });
    }

    clearDBSets();
    unIsolate();
    clearThemingColors();

    if (chk) {
      prevEq.map((eq) => {
      searchAndIsolate(eq.Equipment, 0, 255, 0, 1);
    });
    }

    detMin.map((eq) => {
      searchAndIsolate(eq.Equipment, 255, 0, 0, 1);
    });
  };

  const renderMonths = (year) => {
    let filterMonths = [];
    const allMonths = hl.filter((item) => item.Year === year);
    let item = undefined;
    allMonths.map((eq) => {
      item = filterMonths.find((e) => e === eq.YearMonthDate);
      if (item === undefined) {
        filterMonths.push(eq.YearMonthDate);
      }
    });
    setMonths(filterMonths);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let hlList = [];
        let item = undefined;
        hl.map((eq) => {
          item = hlList.find((e) => e === eq.Year);
          if (item === undefined) {
            hlList.push(eq.Year);
          }
        });

        setSeriesData(hlList);
        if (hlList.length > 0) {
          setYear(hlList[0]);
          renderMonths(hlList[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts or updates

    // Cleanup function (optional) to handle unsubscriptions or resource cleanup
    return () => {
      // Cleanup logic here, if needed
    };
  }, [hlVersion]);

  return (
    <>
      <Card {...other}>
        <CardHeader
          title={"Heavy Lifting Storyboard"}
          subheader={"Total Weight: " + summary.Weight + " Ton"}
          action={
            <>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={chk}
                      onChange={handleCheckBox}
                      color="secondary"
                    />
                  }
                  label="Cummlative"
                />

                <FormControlLabel
                  control={
                    <Select
                      value={year}
                      onChange={cmbChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      {seriesData.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  }
                  label="Year"
                />
              </FormGroup>
            </>
          }
        />
      </Card>

      <Box sx={{ marginTop: 2 }}>
        <HorizontalNonLinearStepper
          steps={months}
          handleStepOnClick={handleStepOnClick}
        ></HorizontalNonLinearStepper>
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <HeavyLiftingDetails
          title=""
          tableData={details}
          tableLabels={[
            { id: "Category", label: "Category" },
            { id: "CraneType", label: "Crane Type" },
            { id: "Equipment", label: "Equipment" },
            { id: "Start", label: "Start" },
            { id: "Weight", label: "Weight" },
            { id: "Height", label: "Height" },
            { id: "" },
          ]}
          showButton={false}
        />
      </Box>
    </>
  );
}

HeavyLiftingTable.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
