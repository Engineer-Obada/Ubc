import React from 'react';
import IntlMessages from '@crema/utility/IntlMessages';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import {Form} from 'formik';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
// import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';
import AppGridContainer from '@crema/core/AppGridContainer';
import Grid from '@mui/material/Grid';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import {Fonts} from 'shared/constants/AppEnums';
import {alpha} from '@mui/material';
import {useGetDataApi} from '@crema/utility/APIHooks';
import { useDropzone } from 'react-dropzone';
import EditIcon from '@mui/icons-material/Edit';
import {styled} from '@mui/material/styles';

const StyledDivider = styled(Divider)(({theme}) => ({
  marginTop: 20,
  marginBottom: 20,
  [theme.breakpoints.up('xl')]: {
    marginTop: 32,
    marginBottom: 32,
  },
}));

const HeaderWrapper = styled('div')(() => {
  return {
    padding: 20,
    marginLeft: -24,
    marginRight: -24,
    marginTop: -20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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




const AddProductForm = (props) => {
  const {isSubmitting, values, setFieldValue,userImage,setUserImage}= props;
  const [{apiData: categoryList}] = useGetDataApi('/api/category', []);
  const inputLabel = React.useRef(null);

  // const {messages} = useIntl();

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setUserImage(URL.createObjectURL(acceptedFiles[0]));
    },
  });



  return (
    <Form
      style={{
        width: '100%',
      }}
      noValidate
      autoComplete='off'
    >
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
      <div>
        <AppTextField
          sx={{
            width: '100%',
            fontWeight: Fonts.LIGHT,
            marginBottom: 5,
          }}
          variant='outlined'
          label={<IntlMessages id='Product Name' />}       //Product Name
          name='name'
        />

        <Box mb={5}>
          <AppGridContainer spacing={5}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl
                sx={{
                  width: '100%',
                }}
                variant='outlined'
              >
                <InputLabel                                // Ctegory
                  ref={inputLabel}
                  id='assigned-to-select-outlined-label'
                >
                  <IntlMessages id='Category' />
                </InputLabel>
                <Select
                  labelId='assigned-to-select-outlined-label'
                 
                  label={<IntlMessages id='Category' />}
                  onChange={(event) =>{
                    setFieldValue('categorytId', event.target.value)
                  }}
                  sx={{
                    width: '100%',

                  }}
                  
                  
                >
                  {categoryList.map((category) => {
                    return (
                      <MenuItem
                        value={category.id}
                        key={category.id}
                        sx={{
                          cursor: 'pointer',
                          inputVariant: 'outlined',
                        }}
                      >
                        <Box display='flex' alignItems='center'>
                          {category.logo ? (
                            <Avatar
                              sx={{
                                marginRight: 2,
                              }}
                              src={category.logo}
                            />
                          ) : (
                            <Avatar
                              sx={{
                                marginRight: 2,
                              }}
                            >
                              {category.nameCategory.toUpperCase()}
                            </Avatar>
                          )}
                          <span>{category.nameCategory}</span>
                        </Box>
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl
                sx={{
                  width: '100%',
                }}
                variant='outlined'
              >
                <InputLabel                                // Statuss
                  ref={inputLabel}
                  id='assigned-to-select-outlined-label'
                >
                  <IntlMessages id='Status' />
                </InputLabel>
                <Select
                  labelId='assigned-to-select-outlined-label'
                 
                  label={<IntlMessages id='Status' />}
                  onChange={(event) =>{
                    setFieldValue('available', event.target.value)
                  }}
                  sx={{
                    width: '100%',

                  }}
                >
         
                      <MenuItem
                        value={true}
                        key={1}
                        sx={{
                          cursor: 'pointer',
                          inputVariant: 'outlined',
                        }}

                      >
                        <Box display='flex' alignItems='center'>
                        Not Available
                        </Box>
                      </MenuItem>
                      <MenuItem
                        value={false}
                        key={2}
                        sx={{
                          cursor: 'pointer',
                          inputVariant: 'outlined',
                        }}
                      >
                        <Box display='flex' alignItems='center'>
                        Available
                        </Box>
                      </MenuItem>
                 
                </Select>
              </FormControl>
            </Grid>
  
            <Grid item xs={12} sm={6} md={3}>
            <AppTextField
          sx={{
            width: '100%',
            fontWeight: Fonts.LIGHT,
            marginBottom: 5,
          }}
          variant='outlined'
          label={<IntlMessages id='Product Weight' />}       // Product Weight
          name='weight'
        />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
            <AppTextField
          sx={{
            width: '100%',
            fontWeight: Fonts.LIGHT,
            marginBottom: 5,
          }}
          variant='outlined'
          label={<IntlMessages id='Product Price' />} //Product Price
          name='price'
        />
            </Grid>

           
          </AppGridContainer>
        </Box>
{/* 
        <Box mb={5}>
          <AppTextField
            name='description'
            multiline
            sx={{
              width: '100%',
              backgroundColor: 'background.paper',
              color: 'text.primary',
            }}
            rows='6'
            variant='outlined'
            placeholder={messages['common.description']}
          />
        </Box> */}

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

export default AddProductForm;

AddProductForm.defaultProps = {
  isSubmitting: false,
};

AddProductForm.propTypes = {
  isSubmitting: PropTypes.bool,
  values: PropTypes.object.isRequired,
  taskLabels: PropTypes.array,
  setFieldValue: PropTypes.func,
  userImage: PropTypes.string,
  setUserImage: PropTypes.func,
};
