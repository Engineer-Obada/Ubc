import React from 'react';
import IntlMessages from '@crema/utility/IntlMessages';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import {Field, Form} from 'formik';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
// import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';
import AppGridContainer from '@crema/core/AppGridContainer';
import Grid from '@mui/material/Grid';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import {Fonts} from 'shared/constants/AppEnums';
import {styled} from '@mui/material/styles';
import roleList from '../../../../@crema/services/db/apps/contact/roleList'
const StyledDivider = styled(Divider)(({theme}) => ({
  marginTop: 20,
  marginBottom: 20,
  [theme.breakpoints.up('xl')]: {
    marginTop: 32,
    marginBottom: 32,
  },
}));




const AddEmplyeeForm = (props) => {
  const {isSubmitting}= props;

  // const {messages} = useIntl();


  return (
    <Form
      style={{
        width: '100%',
      }}
      noValidate
      autoComplete='off'
    >
        
      <div>
        <AppTextField
          sx={{
            width: '100%',
            fontWeight: Fonts.LIGHT,
            marginBottom: 5,
          }}
          variant='outlined'
          label={<IntlMessages id='First Name' />}       //firstName
          name='firstName'
        />
        <AppTextField
          sx={{
            width: '100%',
            fontWeight: Fonts.LIGHT,
            marginBottom: 5,
          }}
          variant='outlined'
          label={<IntlMessages id='Last Name' />}       //lastName
          name='lastName'
        />
        <AppTextField
          sx={{
            width: '100%',
            fontWeight: Fonts.LIGHT,
            marginBottom: 5,
          }}
          variant='outlined'
          label={<IntlMessages id='Middle Name' />}       //middleName
          name='middleName'
        />
        <AppTextField
          sx={{
            width: '100%',
            fontWeight: Fonts.LIGHT,
            marginBottom: 5,
          }}
          variant='outlined'
          label={<IntlMessages id='Email' />}       //email
          name='email'
          type='email'
        />
        <AppTextField
          sx={{
            width: '100%',
            fontWeight: Fonts.LIGHT,
            marginBottom: 5,
          }}
          variant='outlined'
          label={<IntlMessages id='Password' />}       //password
          name='password'
          type='password'
        />
        <AppTextField
          sx={{
            width: '100%',
            fontWeight: Fonts.LIGHT,
            marginBottom: 5,
          }}
          variant='outlined'
          label={<IntlMessages id='Phone' />}       //phoneNum
          name='phoneNum'
        />

        <Box mb={5}>
          <AppGridContainer spacing={5}>
            <Grid item xs={12} sm={6} md={3}>
            <FormControl
                  variant='outlined'
                  sx={{
                    width: '100%',
                  }}
                >
                  <InputLabel id='role'>
                    <IntlMessages id='Select-Role' />
                  </InputLabel>
                  <Field
                    name='roleId'
                    label={<IntlMessages id='Select-Role'/>}      //Role
                    labelId='roleId'
                    as={Select}
                    sx={{
                      width: '100%',
                      mb: {xs: 4, xl: 6},
                      textAlign:'left',

                    }}
                  >
                    {roleList.map((role) => {
                      return (
                        <MenuItem
                          value={role.id}
                          key={role.id}
                          sx={{
                            cursor: 'pointer',
                          }}
                        >
                          {role.name}
                        </MenuItem>
                      );
                    })}
                  </Field>
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

export default AddEmplyeeForm;

AddEmplyeeForm.defaultProps = {
  isSubmitting: false,
};

AddEmplyeeForm.propTypes = {
  isSubmitting: PropTypes.bool,
  values: PropTypes.object.isRequired,
  taskLabels: PropTypes.array.isRequired,
  setFieldValue: PropTypes.func,

};
