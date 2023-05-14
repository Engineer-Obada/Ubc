import React from 'react';
import {Formik} from 'formik';

import PropTypes from 'prop-types';
import AddContactForm from './AddContactForm';
import AppDialog from '@crema/core/AppDialog';
import {useInfoViewActionsContext} from '@crema/utility/AppContextProvider/InfoViewContextProvider';
import {postDataApi, putDataApi} from '@crema/utility/APIHooks';

// const validationSchema = yup.object({
//   firstName: yup.string().required(<IntlMessages id='validation.nameRequired' />),
//   email: yup
//     .string()
//     .email(<IntlMessages id='validation.emailFormat' />)
//     .required(<IntlMessages id='validation.emailRequired' />),
//   password: yup
//     .string()
//     .required(<IntlMessages id='validation.phoneNumberRequired' />),
// });

const CreateContact = (props) => {
  const {
    isAddContact,
    handleAddContactClose,
    selectContact,
    onUpdateContact,
    reCallAPI,
  } = props;

  const infoViewActionsContext = useInfoViewActionsContext();


  return (
    <AppDialog
      fullHeight
      open={isAddContact}
      onClose={() => handleAddContactClose()}
    >
      
      <Formik
        validateOnChange={true}
        initialValues={{
          name: selectContact ? selectContact.name : '',
          address: selectContact ? selectContact.address : '',
          city: selectContact ? selectContact.city : '',
    
        }}
        // validationSchema={validationSchema}
        onSubmit={(data, {setSubmitting, resetForm}) => {
          // console.log("dataupadta", data);
          setSubmitting(true);
          if (selectContact) {
            const newContact = {
              id: selectContact.id,
              ...data,
            };
            // console.log("newContact",newContact);
            putDataApi('/api/warehouse/contact/', infoViewActionsContext, {
              contact: newContact,
            })
              .then(() => {
                reCallAPI();
                infoViewActionsContext.showMessage(
                  'Contact updated successfully!',
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
            postDataApi('/api/warehouse/compose', infoViewActionsContext, {
              contact: newContact,
            })
              .then(() => {
                reCallAPI();
                infoViewActionsContext.showMessage(
                  'Contact created successfully!',
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
          <AddContactForm
            values={values}
            setFieldValue={setFieldValue}
            handleAddContactClose={handleAddContactClose}
          />
        )}
      </Formik>
    </AppDialog>
  );
};

export default CreateContact;

CreateContact.defaultProps = {
  selectContact: null,
};

CreateContact.propTypes = {
  isAddContact: PropTypes.bool.isRequired,
  handleAddContactClose: PropTypes.func.isRequired,
  selectContact: PropTypes.object,
  onUpdateContact: PropTypes.func,
  reCallAPI: PropTypes.func,
};
