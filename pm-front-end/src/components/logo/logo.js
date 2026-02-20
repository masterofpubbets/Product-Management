import {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// @mui
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
// routes
import { RouterLink } from 'src/routes/components';
import logoPng from 'src/assets/illustrations/pm-agile.jpg'
// ----------------------------------------------------------------------
import { useProduct} from "src/hooks/useProducts";

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const {selectedProduct} = useProduct();
  const [productLogo, setProductLogo] = useState('');

  useEffect(() => {
    if(selectedProduct.details !== null){
      setProductLogo(selectedProduct.details.logo)
    } else {
      setProductLogo('')
    }
  }, [selectedProduct.version])

  // OR using local (public folder)
  // -------------------------------------------------------
   const logo = (
     <Box
       component="img"
       src={productLogo === '' ? logoPng : productLogo}
       sx={{ width: 70, height: 50, cursor: 'pointer', ...sx }}
     />
   );


  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
