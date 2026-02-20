import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
// @mui
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
//
// components
import { useSettingsContext } from "src/components/settings";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
import StrategyContainer from "src/layouts/PM/Strategy/StrategyDetails/StrategyContainer";
import EmptyContent from "src/components/empty-content";
// Hooks
import {useStrategy} from "src/hooks/useStrategy";
import {useProduct} from "src/hooks/useProducts";
import {paths} from "src/routes/paths";
import Iconify from "src/components/iconify";



export default function Strategy() {
  const settings = useSettingsContext();
  const {strategy, getStrategy} = useStrategy();
  const {selectedProduct} = useProduct();
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
  const [snakeMessage, setSnakeMessage] = useState('Stakeholder has been added.');
  const [openSnake, setOpenSnake] = useState(false);

  useEffect(() => {
    if(strategy.details.length){
      setTableData(strategy.details)
    }
  }, [strategy.version])

  useEffect(() => {
    getStrategy().then()
  }, [])

  // Add New
  const handleAddNew = () => {
    if(selectedProduct.details !== null) {
      if (selectedProduct.details.role === 'admin' || selectedProduct.details.role === 'owner') {
        navigate("/strategy/new");
      } else {
        setSnakeMessage('Permission Denied')
        setOpenSnake(true)
      }
    } else {
      setSnakeMessage('Select product first')
      setOpenSnake(true)
    }


  };


  return(
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Strategy"
          links={[{ name: 'Map', href: paths.stakeholder.root }]}
          action={
            <Button
              component={null}
              onClick={handleAddNew}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        {
          tableData.length === 0 && <EmptyContent />
        }

        {
          tableData.length > 0 && <StrategyContainer data={tableData} />
        }



      </Container>

      <Snackbar
        open={openSnake}
        autoHideDuration={2000}
        onClose={() => setOpenSnake(false)}
        message={snakeMessage}
      />

    </>
  )
}
