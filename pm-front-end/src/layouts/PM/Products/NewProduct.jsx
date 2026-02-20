import {useState, useEffect} from 'react'

// @mui
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
//
import { useSettingsContext } from 'src/components/settings';
import Iconify from '../../../components/iconify';
import PageTitle from "src/components/PageTitle/PageTitle";
//
import { useImage } from 'src/hooks/useImage';
import {useProduct} from 'src/hooks/useProducts';
import { useUsers} from "src/hooks/useUsers";
import { useGoogleAi } from "src/hooks/useGoogleAi";
import img from 'src/assets/icons/ic_product.svg'


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function NewProduct() {
  const settings = useSettingsContext();
  const [proLogo, setProLogo] = useState(img);
  const { convertImageToBinary, imgError, convertBinary64ToImage, binaryData64 } = useImage();
  const [name, setName] = useState('');
  const [des, setDes] = useState('');
  const [type, setType] = useState('');
  const {user} = useUsers();
  const { productError, productLoading, addNewProduct } = useProduct(user.uuid, user.details.id);
  const [isDefault, setIsDefault] = useState(true);
  const [snakeOpen, setSnakeOpen] = useState(false);
  const [snakeMessage, setSnakeMessage] = useState('')
  const {generateDescription, aiWait} = useGoogleAi();


  const handleGenerateDes = () => {
    if(name !== ''){
      generateDescription(name).then((answer => {
        setDes(answer);
        })
      )
    }
  };

  const handleRemoveLogo = () => {
    setProLogo('');
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      convertImageToBinary(file);
    }
  };

  useEffect(() => {
    //save to db
    if (binaryData64 !== '') {
      const dataBinary = convertBinary64ToImage(binaryData64);
      setProLogo(dataBinary);
    }
  }, [binaryData64]);

  const handleIsDefaultChange = (e) => {
    setIsDefault(e.target.checked);
  };

  const handleSaveBasicInfo = () => {
      const product = {
        uid: user.details.id,
        name: name,
        des: des,
        type: type,
        logo: proLogo,
        role: 'admin',
        default: isDefault,
      }
      addNewProduct(product).then(() => {
        setSnakeMessage('Product has been added')
        setSnakeOpen(true)
      })
  };

  const renderBasicInfo = () => {
    return (
      <Card>
        <CardHeader title="Basic Info" sx={{ marginBottom: '20px' }} />

        <Stack spacing={2.5} sx={{ alignItems: 'center' }}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ width: '95%' }}
          />

          <TextField
            label="Type"
            variant="outlined"
            value={type}
            onChange={(e) => setType(e.target.value)}
            sx={{ width: '95%' }}
          />

          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: '95%'
            }}
          >
            <TextField
              label="Description"
              variant="outlined"
              value={des}
              onChange={(e) => setDes(e.target.value)}
              sx={{ width: '95%' }}
            />
            <LoadingButton
              fullWidth
              size="large"
              variant="contained"
              loading={aiWait}
              onClick={handleGenerateDes}
              sx={{ width: '140px', }}
            >
              Ai. Generate
            </LoadingButton>
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: '95%'
            }}
          >
            <Typography variant="subtitle" gutterBottom sx={{ marginTop: '6px' }}>
              Default
            </Typography>
            <Switch checked={isDefault} onChange={handleIsDefaultChange} />
          </Stack>

          <LoadingButton
            fullWidth
            color="primary"
            size="large"
            variant="contained"
            loading={productLoading}
            onClick={handleSaveBasicInfo}
            sx={{ width: '20%', marginBottom: '10px' }}
          >
            Save
          </LoadingButton>
          {productError !== '' && (
            <>
              <Iconify icon="line-md:alert-twotone" width={20} color="red" />
              <Typography
                variant="caption"
                gutterBottom
                color="error"
                sx={{ width: '100%', marginBottom: '10px', marginTop: '10px', marginLeft: '20px' }}
              >
                {productError}
              </Typography>
            </>
          )}
        </Stack>
      </Card>
    );
  };


  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <PageTitle title={"New Product"} />

        <Grid container spacing={3}>

          <Grid xs={12} md={4} lg={4}>
            <Stack spacing={3}>
              <CardMedia
                component="img"
                alt="product"
                height="350"
                image={proLogo}
                sx={{ alignSelf: 'center', objectFit: 'contain', width: '100%'}}
              />
              <Stack
                direction="row"
                spacing={2}
                variant="contained"
                aria-label="Basic button group"
                sx={{ alignSelf: 'center' }}
              >
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  color="warning"
                >
                  Change
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    multiple
                  />
                </Button>
                <Button color="error" onClick={handleRemoveLogo}>
                  Remove
                </Button>
              </Stack>
            </Stack>
          </Grid>

          <Grid xs={12} md={8} lg={8}>
            {
              renderBasicInfo()
            }
          </Grid>


        </Grid>
      </Container>

      <Box sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={snakeOpen}
          message={snakeMessage}
          key={'top' + 'center'}
        />
      </Box>

    </>
  );
};
