import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
// @mui
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
//
// components
import { useSettingsContext } from "src/components/settings";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
import OkrContainer from "src/layouts/PM/Okr/OkrContainer";
import EmptyContent from "src/components/empty-content";
import {paths} from "src/routes/paths";
import Iconify from "src/components/iconify";
// Hooks
import { useOkr } from "src/hooks/useOkr";


export default function Okr({withSelect, onInitiativeSelect}) {
  const settings = useSettingsContext();
  const navigate = useNavigate();
  const [snakeMessage, setSnakeMessage] = useState('Objective has been added.');
  const [openSnake, setOpenSnake] = useState(false);
  const [objData, setObjData] = useState([]);
  const [keysData, setKeysData] = useState([]);
  const [initiativesData, setInitiativesData] = useState([]);
  const [featureData, setFeatureData] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const { objectives, keyResults, initiatives, features, objectivesEmpty, summary, delObj } = useOkr();



  useEffect(() => {
    if (summary.details.length) {
      setSummaryData(summary.details);
    }
  }, [summary.version]);

  useEffect(() => {
    if(objectives.details.length){
      setObjData(objectives.details)
    }
  }, [objectives.version]);

  useEffect(() => {
    if(keyResults.details.length){
      setKeysData(keyResults.details)
    }
  }, [keyResults.version]);

  useEffect(() => {
    if(initiatives.details.length){
      setInitiativesData(initiatives.details)
    }
  }, [initiatives.version]);

  useEffect(() => {
    if(features.details.length){
      setFeatureData(features.details)
    }
  }, [features.version]);

  const handleOnDeleteObj = (id) => {
    delObj(id).then(

    )
  };

  const handleOnEditObj = (id) => {
    navigate(`${paths.okr.objective.new}/${id}`);
  };

  const handleAddNew = () => {
    navigate(paths.okr.objective.new);
  };

  const handleAddNewKeyResult = (id) => {
    navigate(`${paths.okr.keyResult.new}/${id}`);
  };

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Okrs"
          links={[{ name: 'Map', href: paths.stakeholder.root }]}
          action={
            withSelect === undefined && (
              <Stack direction="row" spacing={2}>
                <Button
                  component={null}
                  onClick={() => navigate('/okr/statuslist')}
                  variant="contained"
                  startIcon={<Iconify icon="fluent-mdl2:task-list" />}
                >
                  Status List
                </Button>

                <Button
                  component={null}
                  onClick={handleAddNew}
                  variant="contained"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                >
                  New
                </Button>
              </Stack>
            )
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        {objectivesEmpty && <EmptyContent />}

        {!objectivesEmpty && (
          <OkrContainer
            objectives={objData}
            keyResults={keysData}
            initiatives={initiativesData}
            withSelect={withSelect}
            onInitiativeSelect={onInitiativeSelect}
            features={featureData}
            summary={summaryData}
            onDeleteObj={handleOnDeleteObj}
            onEditObj={handleOnEditObj}
            onAddKeyResult={handleAddNewKeyResult}
          />
        )}
      </Container>

      <Snackbar
        open={openSnake}
        autoHideDuration={2000}
        onClose={() => setOpenSnake(false)}
        message={snakeMessage}
      />
    </>
  );
}
