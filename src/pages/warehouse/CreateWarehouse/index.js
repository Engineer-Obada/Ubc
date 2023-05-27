import React from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import AddWarehouseForm from './AddWarehouseForm';
import AppDialog from '@crema/core/AppDialog';
import {useInfoViewActionsContext} from '@crema/utility/AppContextProvider/InfoViewContextProvider';
import {postDataApi, putDataApi} from '@crema/utility/APIHooks';
import IntlMessages from '@crema/utility/IntlMessages';

const validationSchema = yup.object({
  name: yup.string().required(<IntlMessages id='Please Enter Name' />),
  address: yup.string().required(<IntlMessages id='Please Enter Address' />),
  city: yup.string().required(<IntlMessages id='Please Enter City' />),
  
});

const CreateWarehouse = (props) => {

  const {
    isAddWarhouse,
    handleAddContactClose,
    selectedWarehouse,
    onUpdateContact,
    reCallAPI,
  } = props;

  const api = 'api'
  const infoViewActionsContext = useInfoViewActionsContext();


  return (
    <AppDialog
      fullHeight
      open={isAddWarhouse}
      onClose={() => handleAddContactClose()}
    >
      
      <Formik
        validateOnChange={true}
        initialValues={{
          name: selectedWarehouse ? selectedWarehouse.name : '',
          address: selectedWarehouse ? selectedWarehouse.address : '',
          city: selectedWarehouse ? selectedWarehouse.city : '',
    
        }}
        validationSchema={validationSchema}
        onSubmit={(data, {setSubmitting, resetForm}) => {
          setSubmitting(true);
          if (selectedWarehouse) {
            const newContact = {
              id: selectedWarehouse.id,
              ...data,
            };
            putDataApi(`/${api}/warehouse/update`, infoViewActionsContext, {
              contact: newContact,
            })
              .then(() => {
                reCallAPI();
                infoViewActionsContext.showMessage(
                  'Warehouse updated successfully!',
                );
              })
              .catch((error) => {
                infoViewActionsContext.fetchError(error.message);
              });
            onUpdateContact(newContact);
          } else {
            const newContact = {
              id: Math.floor(Math.random() * 1000),
              ...data,
            };
            postDataApi(`/${api}/warehouse/add`, infoViewActionsContext, {
              contact: newContact,
            })
              .then(() => {
                reCallAPI();
                infoViewActionsContext.showMessage(
                  'Warehouse created successfully!',
                );
              })
              .catch((error) => {
                infoViewActionsContext.fetchError(error.message);
              });
          }
          handleAddContactClose();
          resetForm();
          setSubmitting(false);
        }}
      >
        {({values, setFieldValue}) => (
          <AddWarehouseForm
            values={values}
            setFieldValue={setFieldValue}
            handleAddContactClose={handleAddContactClose}
          />
        )}
      </Formik>
    </AppDialog>
  );
};

export default CreateWarehouse;

CreateWarehouse.defaultProps = {
  selectedWarehouse: null,
};

CreateWarehouse.propTypes = {
  isAddWarhouse: PropTypes.bool.isRequired,
  handleAddContactClose: PropTypes.func.isRequired,
  selectedWarehouse: PropTypes.object,
  onUpdateContact: PropTypes.func,
  reCallAPI: PropTypes.func,
};
