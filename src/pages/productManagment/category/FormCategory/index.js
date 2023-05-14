import React from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import IntlMessages from '@crema/utility/IntlMessages';
import PropTypes from 'prop-types';
import AddNewCategory from './AddNewCategory';
import AppCard from '@crema/core/AppCard';
import { postDataApi } from '@crema/utility/APIHooks';
import { useInfoViewActionsContext } from '@crema/utility/AppContextProvider/InfoViewContextProvider';

const validationSchema = yup.object({
  nameCategory: yup.string().required(<IntlMessages id='validation.nameRequired' />),

});

const FormCategory = (props) => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const {reCallAPI} = props;


//   const [userImage, setUserImage] = useState(
//     selectContact && selectContact.image
//       ? selectContact.image
//       : '/assets/images/placeholder.jpg',
//   );

//   useEffect(() => {
//     setUserImage(
//       selectContact && selectContact.image
//         ? selectContact.image
//         : '/assets/images/placeholder.jpg',
//     );
//   }, [selectContact]);

  return (
    <AppCard  >
      <Formik
        validateOnChange={true}
        initialValues={{
          nameCategory: '',
          created:'',
        }}
        validationSchema={validationSchema}
        onSubmit={(data, {setSubmitting, resetForm}) => {
          // console.log("data", data);
          setSubmitting(true);
          resetForm();
          const newCategory ={
            id:Math.floor(Math.random()*1000),
            ...data
          }
          postDataApi('/api/category/compose',infoViewActionsContext,
          {
            category:newCategory,
          }).then(() => {
                reCallAPI();
            infoViewActionsContext.showMessage(
                      'category created successfully!',
                    );
                  })
                  .catch((error) => {
                    infoViewActionsContext.fetchError(error.message);
                  });
                  setSubmitting(false);
        
       }
      }    
        //   if (selectContact) {
        //     const newContact = {
        //       id: selectContact.id,
        //       image: userImage,
        //       ...data,
        //     };
        //     putDataApi('/api/contactApp/contact/', infoViewActionsContext, {
        //       contact: newContact,
        //     })
        //       .then(() => {
        //         reCallAPI();
        //         infoViewActionsContext.showMessage(
        //           'Contact updated successfully!',
        //         );
        //       })
        //       .catch((error) => {
        //         infoViewActionsContext.fetchError(error.message);
        //       });
        //     onUpdateContact(newContact);
        //   } else {
        //     const newContact = {
        //       id: Math.floor(Math.random() * 1000),
        //       // accountStatus: false,
        //       // isFrequent: Math.random() > 0.5,
        //       image: userImage,
        //       ...data,
        //     };
        //     postDataApi('/api/contactApp/compose', infoViewActionsContext, {
        //       contact: newContact,
        //     })
        //       .then(() => {
        //         reCallAPI();
        //         infoViewActionsContext.showMessage(
        //           'Contact created successfully!',
        //         );
        //       })
        //       .catch((error) => {
        //         infoViewActionsContext.fetchError(error.message);
        //       });
        //   }
        //   handleAddContactClose();
        //   resetForm();
        //   setSubmitting(false);
        // }}
      >
        {({values, setFieldValue}) => (
          <AddNewCategory
            values={values}
            setFieldValue={setFieldValue}
          />
        )}
      </Formik>
      </AppCard>
  );
};

export default FormCategory;

// FormCategory.defaultProps = {
//   selectContact: null,
// };

FormCategory.propTypes = {
  selectContact: PropTypes.object,
  reCallAPI: PropTypes.func,
};
