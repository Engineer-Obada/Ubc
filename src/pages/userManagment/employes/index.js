import React from 'react';
import ContactListing from './ContactListing';
import AppsContainer from '@crema/core/AppsContainer';
import {useGetDataApi} from '@crema/utility/APIHooks';
const employes = () => {
  const [{apiData, loading}, {setQueryParams, setData, reCallAPI}] =
    useGetDataApi('/api/employee', {}, {}, false);
  return (
    <AppsContainer
      title={"Employees"}
    >
      {/* {console.log("apiData",apiData)} */}
      <ContactListing
        apiData={apiData}
        loading={loading}
        setQueryParams={setQueryParams}
        setData={setData}
        reCallAPI={reCallAPI}
      />
    </AppsContainer>
  );
};

export default employes;
