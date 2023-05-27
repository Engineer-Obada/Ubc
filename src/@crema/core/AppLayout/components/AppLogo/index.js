import React from 'react';
import { Box} from '@mui/material';
import imge from '../../../../../assets/logo192.png'

const AppLogo = () => {
  // const {} = useThemeContext();

  return (
    <Box
    sx={{
      height: { sm: 60},
      padding: 2.5,
      display: 'flex',
      flexDirection: 'row',
      cursor: 'pointer',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    className='app-logo'
  >
    <img src={imge} alt="Logo" style={{
       height:'100%',
    }} />
   
    </Box>
  );
};

export default AppLogo;
