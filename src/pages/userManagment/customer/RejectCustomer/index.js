import React from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import IntlMessages from '@crema/utility/IntlMessages';
import PropTypes from 'prop-types';
import AppDialog from '@crema/core/AppDialog';
// import {useAuthUser} from '@crema/utility/AuthHooks';/**/***************** */ */
import {postDataApi} from '@crema/utility/APIHooks';
import {useInfoViewActionsContext} from '@crema/utility/AppContextProvider/InfoViewContextProvider';
import RejectCunstomerForm from './RejectCunstomerForm';

const api = 'api'
const validationSchema = yup.object({
  reason: yup.string().required(<IntlMessages id='Reason of Reject is required!' />),
  
});

const RejectCustomer = ({
  isRejectOpen,
  onCloseRejectCustomer,
  reCallAPI,
  customerSelectedReject
}) => {
  // const {user} = useAuthUser();
  const infoViewActionsContext = useInfoViewActionsContext();

 

  return (
    <AppDialog
      dividers
      maxWidth='md'
      open={isRejectOpen}
      onClose={() => onCloseRejectCustomer()}
      title={<IntlMessages id='Reject Customer' />}
    >
      <Formik
        validateOnChange={true}
        initialValues={{
          reason:customerSelectedReject ? customerSelectedReject.reason :'',
        
        }}
        validationSchema={validationSchema}
        onSubmit={(data, {setSubmitting, resetForm}) => {
          setSubmitting(true);
          const NewCustomer = {
            id: customerSelectedReject.id,
            ...data,
          };
          postDataApi(`/${api}/customer/reject`, infoViewActionsContext, 
             NewCustomer,
          )
            .then(() => {
              reCallAPI();
              infoViewActionsContext.showMessage(
                'New Customer has been Rejected successfully!',
              );
            })
            .catch((error) => {
              infoViewActionsContext.fetchError(error.message);
            });

            onCloseRejectCustomer();
          resetForm();
          setSubmitting(false);
        }}
      
      >
        {({isSubmitting, values, setFieldValue}) => (
          <RejectCunstomerForm
            isSubmitting={isSubmitting}
            values={values}
            setFieldValue={setFieldValue}
            reCallAPI={reCallAPI}
          />
        )}
      </Formik>
      
    </AppDialog>
  );
};

export default RejectCustomer;

RejectCustomer.propTypes = {
  isRejectOpen: PropTypes.bool.isRequired,
  onCloseRejectCustomer: PropTypes.func.isRequired,
  reCallAPI: PropTypes.func,
  customerSelectedReject: PropTypes.object,
};
