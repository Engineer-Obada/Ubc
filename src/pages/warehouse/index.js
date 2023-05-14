import React from 'react';
import ContactListing from './ContactListing';
import AppsContainer from '@crema/core/AppsContainer';
import {useGetDataApi} from '@crema/utility/APIHooks';
const warhouse = () => {
  const [{apiData, loading}, {setQueryParams, setData, reCallAPI}] =
    useGetDataApi('/api/warehouse/list', {}, {}, false);
  return (
    <AppsContainer
      title={"Warhouse"}
    >
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

export default warhouse;
