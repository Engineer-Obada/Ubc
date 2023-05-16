import React, {useState} from 'react';
import DealsTable from './DealsTable';
import IntlMessages from '@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import {Fonts} from 'shared/constants/AppEnums';
import AppCard from '@crema/core/AppCard';
import AppSelect from '@crema/core/AppSelect';
import { postDataApi } from '@crema/utility/APIHooks';
import { useInfoViewActionsContext } from '@crema/utility/AppContextProvider/InfoViewContextProvider';

const Deals = (props) => {
  const {reCallAPI} = props;
  const {categoryTableData} = props;
  const [tableData, setTableData] = useState(categoryTableData);
  const infoViewActionsContext = useInfoViewActionsContext();

  const handleChange = (value) => {
    if (value === messages['dashboard.allDeals']) {
      setTableData(categoryTableData);
    } else if (value === messages['todo.completed']) {
      setTableData(
        categoryTableData.filter((data) => data.progress === 'Approved'),
      );
    } else {
      setTableData(
        categoryTableData.filter((data) => data.progress === 'Pending'),
      );
    }
  };

  const onDeleteCategory = (categorId)=>{
    const selectId = categorId;
    postDataApi('/api/category/delete',infoViewActionsContext, selectId
    ).then(()=>{
      reCallAPI();
      infoViewActionsContext.showMessage('Category Deleted Successfully');
    }).catch((error) => {
      infoViewActionsContext.fetchError(error.message);
    });
  }


  const {messages} = useIntl();

  return (
    <AppCard
      title={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              mr: {xs: 3, lg: 8},
              fontWeight: Fonts.BOLD,
              fontSize: 16,
            }}
            component='h3'
          >
            <IntlMessages id='Ctegoryes' />
          </Box>
          <AppSelect
            menus={[
              messages['dashboard.allDeals'],
              messages['todo.completed'],
              messages['common.pending'],
            ]}
            defaultValue={messages['dashboard.allDeals']}
            onChange={handleChange}
          />
        </Box>
      }
      contentStyle={{px: 0}}
      action={messages['common.viewAll']}
      sxStyle={{height: 1}}
    >
      <DealsTable categoryTableData={categoryTableData} tableData={tableData} 
      onDeleteCategory={onDeleteCategory}
      />
    </AppCard>
  );
};

export default Deals;

// Deals.defaultProps = {
//   categoryTableData: [],
// };

Deals.propTypes = {
  categoryTableData: PropTypes.array,
  reCallAPI: PropTypes.func,
};
