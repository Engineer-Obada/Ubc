import React from 'react';
import ListItem from './ListItem/index';
import AppInfoView from '@crema/core/AppInfoView';
import Box from '@mui/material/Box';
import AppList from '@crema/core/AppList';
import {useGetDataApi} from '@crema/utility/APIHooks';

const Flat = () => {
  const [{apiData: usersList}] = useGetDataApi('/api/user/list', []);

  return (
    <Box flex={1}>
      {usersList ? (
        <AppList
          data={usersList}
          renderRow={(user) => {
            return <ListItem user={user} key={user.id} />;
          }}
        />
      ) : null}
      <AppInfoView />
    </Box>
  );
};

export default Flat;
