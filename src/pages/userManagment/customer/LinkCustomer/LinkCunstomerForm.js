import React from 'react';
import IntlMessages from '@crema/utility/IntlMessages';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import {Form} from 'formik';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import AppGridContainer from '@crema/core/AppGridContainer';
import Grid from '@mui/material/Grid';
import {useGetDataApi} from '@crema/utility/APIHooks';
import {styled} from '@mui/material/styles';

const StyledDivider = styled(Divider)(({theme}) => ({
  marginTop: 20,
  marginBottom: 20,
  [theme.breakpoints.up('xl')]: {
    marginTop: 32,
    marginBottom: 32,
  },
}));



const LinkCunstomerForm = (props) => {
    const api = 'api';
  const {isSubmitting,  setFieldValue}= props;
  const [{apiData: warehouseList}] = useGetDataApi(`/${api}/warehouse`, []);
  const inputLabel = React.useRef(null);

  return (
    <Form
      style={{
        width: '100%',
      }}
      noValidate
      autoComplete='off'
    >
        
      <div>
      
        <Box mb={5}>
          <AppGridContainer spacing={5}>
            <Grid item xs={12} sm={12} md={12}>
              <FormControl
                sx={{
                  width: '100%',
                }}
                variant='outlined'
              >
                <InputLabel                                // Warhouse
                  ref={inputLabel}
                  id='assigned-to-select-outlined-label'
                >
                  <IntlMessages id='Select Warehouse To Bind With' />
                </InputLabel>
                <Select
                  labelId='assigned-to-select-outlined-label'
                 
                  label={<IntlMessages id='Select Warehouse To Bind With' />}
                  onChange={(event) =>{
                    setFieldValue('warehouseId', event.target.value)
                  }}
                  sx={{
                    width: '100%',

                  }}
                  
                  
                >
                  {warehouseList.data && warehouseList.data.map((warehouse) => {
                    return (
                      <MenuItem
                        value={warehouse.id}
                        key={warehouse.id}
                        sx={{
                          cursor: 'pointer',
                          inputVariant: 'outlined',
                        }}
                        
                      >
                        {warehouse.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>    
          </AppGridContainer>
        </Box>

        <Box mb={5}>
          <AppGridContainer spacing={5}>
            <Grid item xs={12} sm={6} md={12}>
              <FormControl
                sx={{
                  width: '100%',
                }}
                variant='outlined'
              >
                <InputLabel                                // Pyment
                  ref={inputLabel}
                  id='assigned-to-select-outlined-label'
                >
                  <IntlMessages id='Select Payment Method' />
                </InputLabel>
                <Select
                  labelId='assigned-to-select-outlined-label'
                 
                  label={<IntlMessages id='Select Payment Method' />}
                  onChange={(event) =>{
                    setFieldValue('paymentMethod', event.target.value)
                  }}
                  sx={{
                    width: '100%',

                  }}
                >
         
                      <MenuItem
                        value={'Cash'}
                        key={1}
                        sx={{
                          cursor: 'pointer',
                          inputVariant: 'outlined',
                        }}
                      >
                        <Box display='flex' alignItems='center'>
                        Cash
                        </Box>
                      </MenuItem>
                      <MenuItem
                        value={'VISA'}
                        key={2}
                        sx={{
                          cursor: 'pointer',
                          inputVariant: 'outlined',
                        }}
                      >
                        <Box display='flex' alignItems='center'>
                        VISA
                        </Box>
                      </MenuItem>
                 
                </Select>
              </FormControl>
            </Grid>    

          </AppGridContainer>
         
        
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

export default LinkCunstomerForm;

LinkCunstomerForm.defaultProps = {
  isSubmitting: false,
};

LinkCunstomerForm.propTypes = {
  isSubmitting: PropTypes.bool,
  values: PropTypes.object.isRequired,
  taskLabels: PropTypes.array.isRequired,
  setFieldValue: PropTypes.func,
  userImage: PropTypes.string,
  setUserImage: PropTypes.func,
};
