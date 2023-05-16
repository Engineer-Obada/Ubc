import React, {useEffect, useState} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import IntlMessages from '@crema/utility/IntlMessages';
import AddProductForm from './AddProductForm';
import PropTypes from 'prop-types';
import AppDialog from '@crema/core/AppDialog';
// import {useAuthUser} from '@crema/utility/AuthHooks';/**/***************** */ */
import {postDataApi} from '@crema/utility/APIHooks';
import {useInfoViewActionsContext} from '@crema/utility/AppContextProvider/InfoViewContextProvider';

const validationSchema = yup.object({
  name: yup.string().required(<IntlMessages id='validation.titleRequired' />),
});

const AddNewProduct = ({
  isAddTaskOpen,
  onCloseAddTask,
  // reCallAPI,
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
      open={isAddTaskOpen}
      onClose={() => onCloseAddTask()}
      title={<IntlMessages id='Add New Product' />}
    >
      <Formik
        validateOnChange={true}
        initialValues={{
          name: '',
          categorytId: '',
          quantity: 0,
          weight: 0,
          price: 0.0,
          description:'',
        
        }}
        validationSchema={validationSchema}
        onSubmit={(data, {setSubmitting, resetForm}) => {
          setSubmitting(true);
          const NewProduct = {
            id: Math.floor(Math.random() * 1000000),
            image: '/assets/images/dummy2.jpg',
            ...data,
          };
          console.log('NewProduct:***********', NewProduct);
          postDataApi('/api/todoApp/compose', infoViewActionsContext, {
            task: NewProduct,
          })
            .then(() => {
              // reCallAPI();
              infoViewActionsContext.showMessage(
                'New Task has been created successfully!',
              );
            })
            .catch((error) => {
              infoViewActionsContext.fetchError(error.message);
            });

          onCloseAddTask();
          resetForm();
          setSubmitting(false);
        }}
      >
        {({isSubmitting, values, setFieldValue}) => (
          <AddProductForm
            isSubmitting={isSubmitting}
            values={values}
            setFieldValue={setFieldValue}
            // reCallAPI={reCallAPI}
            userImage={userImage}
            setUserImage={setUserImage}
          />
        )}
      </Formik>
    </AppDialog>
  );
};

export default AddNewProduct;

AddNewProduct.propTypes = {
  isAddTaskOpen: PropTypes.bool.isRequired,
  onCloseAddTask: PropTypes.func.isRequired,
  reCallAPI: PropTypes.func,
  selectedDate: PropTypes.string,
};
