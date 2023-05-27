import React, {useEffect, useState} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import IntlMessages from '@crema/utility/IntlMessages';
import PropTypes from 'prop-types';
import AppDialog from '@crema/core/AppDialog';
// import {useAuthUser} from '@crema/utility/AuthHooks';/**/***************** */ */
import {postDataApi} from '@crema/utility/APIHooks';
import {useInfoViewActionsContext} from '@crema/utility/AppContextProvider/InfoViewContextProvider';
import LinkCunstomerForm from './LinkCunstomerForm';

const api = 'api'
const validationSchema = yup.object({
  paymentMethod: yup.string().required(<IntlMessages id='Please enter Name!' />),
  warehouseId: yup.string().required(<IntlMessages id='Please enter Category!' />),
  
});

const LinkCustomer = ({
  isLinkOpen,
  onCloseLinkCustomer,
  reCallAPI,
  customerSelected
}) => {
  // const {user} = useAuthUser();
  const infoViewActionsContext = useInfoViewActionsContext();

  
  const [userImage, setUserImage] = useState( '/assets/images/placeholder.jpg');

  useEffect(() => {
    setUserImage( '/assets/images/placeholder.jpg',);
  });

  return (
    <AppDialog
      dividers
      maxWidth='md'
      open={isLinkOpen}
      onClose={() => onCloseLinkCustomer()}
      title={<IntlMessages id='Add As New Customer' />}
    >
      <Formik
        validateOnChange={true}
        initialValues={{
          paymentMethod:customerSelected ? customerSelected.paymentMethod :'',
          warehouseId: customerSelected ? customerSelected.warehouseId :'',
        
        }}
        validationSchema={validationSchema}
        onSubmit={(data, {setSubmitting, resetForm}) => {
          setSubmitting(true);
          const NewCustomer = {
            id: customerSelected.id,
            ...data,
          };
          postDataApi(`/${api}/customer/link`, infoViewActionsContext, 
             NewCustomer,
          )
            .then(() => {
              reCallAPI();
              infoViewActionsContext.showMessage(
                'New Customer has been Linked successfully!',
              );
            })
            .catch((error) => {
              infoViewActionsContext.fetchError(error.message);
            });

          onCloseLinkCustomer();
          resetForm();
          setSubmitting(false);
        }}
      
      >
        {({isSubmitting, values, setFieldValue}) => (
          <LinkCunstomerForm
            isSubmitting={isSubmitting}
            values={values}
            setFieldValue={setFieldValue}
            reCallAPI={reCallAPI}
            userImage={userImage}
            setUserImage={setUserImage}
          />
        )}
      </Formik>
      
    </AppDialog>
  );
};

export default LinkCustomer;

LinkCustomer.propTypes = {
 isLinkOpen: PropTypes.bool.isRequired,
  onCloseLinkCustomer: PropTypes.func.isRequired,
  reCallAPI: PropTypes.func,
  customerSelected: PropTypes.object,
};
