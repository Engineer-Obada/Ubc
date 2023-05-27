import React from 'react';
import IntlMessages from '@crema/utility/IntlMessages';
import Box from '@mui/material/Box';
import {Form} from 'formik';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import { Fonts } from 'shared/constants/AppEnums';

const StyledDivider = styled(Divider)(({theme}) => ({
  marginTop: 20,
  marginBottom: 20,
  [theme.breakpoints.up('xl')]: {
    marginTop: 32,
    marginBottom: 32,
  },
}));



const RejectCunstomerForm = (props) => {
  const {isSubmitting}= props;

  return (
    <Form
      style={{
        width: '100%',
      }}
      noValidate
      autoComplete='off'
    >
        
      <div>
      
        <Box >
            <AppTextField
            sx={{
              width: '100%',
              fontWeight: Fonts.LIGHT,
              marginBottom: 5,
              marginTop:10,
            }}
            variant='outlined'
            name='reason'
            // placeholder='Enter a reason' 
        />
        </Box>

        <StyledDivider />
      </div>
      <div style={{textAlign: 'right'}}>
        <Button
          sx={{
            position: 'relative',
            minWidth: 100,
          }}
          color='primary'
          variant='outlined'
          disabled={isSubmitting}
          type='submit'
        >
          <IntlMessages id='common.save' />
        </Button>
      </div>
    </Form>
  );
};

export default RejectCunstomerForm;

RejectCunstomerForm.defaultProps = {
  isSubmitting: false,
};

RejectCunstomerForm.propTypes = {
  isSubmitting: PropTypes.bool,
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func,
};
