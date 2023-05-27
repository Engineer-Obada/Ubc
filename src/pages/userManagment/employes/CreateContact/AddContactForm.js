import React from 'react';
import {alpha, Box, Button, Select} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import {Field, Form} from 'formik';
import {useDropzone} from 'react-dropzone';
import PropTypes from 'prop-types';
import IntlMessages from '@crema/utility/IntlMessages';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import {Fonts} from 'shared/constants/AppEnums';
import EditIcon from '@mui/icons-material/Edit';
import AppGridContainer from '@crema/core/AppGridContainer';
import Grid from '@mui/material/Grid';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import {styled} from '@mui/material/styles';
import {useGetDataApi} from '@crema/utility/APIHooks';

const HeaderWrapper = styled('div')(({theme}) => {
  return {
    padding: 20,
    marginLeft: -24,
    marginRight: -24,
    marginTop: -20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
    '& .dropzone': {
      outline: 0,
      '&:hover .edit-icon, &:focus .edit-icon': {
        display: 'flex',
      },
    },
  };
});

const AvatarViewWrapper = styled('div')(({theme}) => {
  return {
    position: 'relative',
    cursor: 'pointer',
    '& .edit-icon': {
      position: 'absolute',
      bottom: 0,
      right: 0,
      zIndex: 1,
      border: `solid 2px ${theme.palette.background.paper}`,
      backgroundColor: alpha(theme.palette.primary.main, 0.7),
      color: theme.palette.primary.contrastText,
      borderRadius: '50%',
      width: 26,
      height: 26,
      display: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.4s ease',
      '& .MuiSvgIcon-root': {
        fontSize: 16,
      },
    },
  };
});

const AddContactForm = (props) => {
  const {values, userImage, setUserImage} = props;
  const [{apiData: roleList}] = useGetDataApi(
    '/api/ubc/list',
    [],
  );

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setUserImage(URL.createObjectURL(acceptedFiles[0]));
    },
  });


  return (
    <Form noValidate autoComplete='off'>
      <HeaderWrapper>
        <div {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <label htmlFor='icon-button-file'>
            <AvatarViewWrapper>
              <Avatar ///////////// Dialog after open Add New Employees
                sx={{
                  width: 60,
                  height: 60,
                }}
                src={userImage ? userImage : ''}
              />
              <Box className='edit-icon'>
                <EditIcon />
              </Box>
            </AvatarViewWrapper>
          </label>
        </div>
        {values.name ? (
          <Box component='h4' fontWeight={Fonts.SEMI_BOLD} mt={2}>
            {values.name}
          </Box>
        ) : null}
      </HeaderWrapper>

      <Box
        sx={{
          padding: 5,
          ml: -6,
          mr: -6,
        }}
      >
        <Box
          sx={{
            pb: 5,
            px: 5,
            mx: -5,
            mb: 5,
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box
            component='h6'
            sx={{
              mb: {xs: 4, xl: 6},
              fontSize: 14,
              fontWeight: Fonts.SEMI_BOLD,
            }}
          >
            <IntlMessages id='contactApp.personalDetails' />
          </Box>

          <div>
            <AppTextField
              sx={{
                width: '100%',
                mb: {xs: 4, xl: 6},
              }}
              variant='outlined'
              label={<IntlMessages id='firstName' />} // firstName
              name='firstName'
            />
            <AppTextField
              sx={{
                width: '100%',
                mb: {xs: 4, xl: 6},
              }}
              variant='outlined'
              label={<IntlMessages id='lastName' />} // lastName
              name='lastName'

            />
            <AppTextField
              sx={{
                width: '100%',
                mb: {xs: 4, xl: 6},
              }}
              variant='outlined'
              label={<IntlMessages id='middleName' />} //middleName
              name='middleName'
            />

            <AppTextField
              sx={{
                width: '100%',
                mb: {xs: 4, xl: 6},
              }}
              variant='outlined'
              label={<IntlMessages id='common.email' />} // email
              name='email'
            />

            <AppTextField
              sx={{
                width: '100%',
                mb: {xs: 4, xl: 6},
              }}
              variant='outlined'
              label={<IntlMessages id='Password' />} // password
              name='password'
              type="password"
            />
            <AppTextField
              sx={{
                width: '100%',
                mb: {xs: 4, xl: 6},
              }}
              variant='outlined'
              label={<IntlMessages id='Phone' />} // phone
              name='phoneNum'
              type="number"
            />
            <AppGridContainer spacing={5}>
              <Grid item xs={12} md={6}>
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
                    name='role'
                    label={<IntlMessages id='Select-Role'/>}      //Role
                    labelId='role'
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
                          value={role.value}
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
              <Grid item xs={12} md={6}>
                <FormControl
                  variant='outlined'
                  sx={{
                    width: '100%',
                  }}
                >
                  <InputLabel id='activate'>
                    <IntlMessages id='Select-Activate' />
                  </InputLabel>
                  <Field
                    name='accountStatus'
                    label={<IntlMessages id='Select-Activate' />}      //Activate
                    labelId='activate'
                    as={Select}
                    sx={{
                      width: '100%',
                      mb: {xs: 4, xl: 6},
                    }}
                  >
                        <MenuItem
                          value={"true"}
                          sx={{
                            cursor: 'pointer',
                          }}
                        >
                          true
                        </MenuItem>
                        <MenuItem
                          value={"false"}
                          sx={{
                            cursor: 'pointer',
                          }}
                        >
                          false
                        </MenuItem>
                  
                  </Field>
                </FormControl>
              </Grid>
            </AppGridContainer>
          </div>
        </Box>
      </Box>

      <Box
        sx={{
          pb: 4,
          mx: -1,
          textAlign: 'right',
        }}
      >
        <Button
          sx={{
            position: 'relative',
            minWidth: 100,
          }}
          color='primary'
          variant='outlined'
          type='submit'
        >
          <IntlMessages id='common.save' />
        </Button>
      </Box>
    </Form>
  );
};

export default AddContactForm;

AddContactForm.propTypes = {
  values: PropTypes.object.isRequired,
  userImage: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  setUserImage: PropTypes.func,
  setFieldValue: PropTypes.func,
  handleAddContactClose: PropTypes.func,
    // add new prop type for isActive
    isActive: PropTypes.bool
};
