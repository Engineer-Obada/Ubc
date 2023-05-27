import React from 'react';
import { Box, Button, Zoom } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import IntlMessages from '@crema/utility/IntlMessages';
import PropTypes from 'prop-types';
import {Fonts} from 'shared/constants/AppEnums';
import AppCard from '@crema/core/AppCard';
import { useInfoViewActionsContext } from '@crema/utility/AppContextProvider/InfoViewContextProvider';
import AppScrollbar from '@crema/core/AppScrollbar';
import AddNewEmployee from '../AddEmployee';
import EmployeesTable from './EmployeesTable/EmployeeTable';
import { postDataApi } from '@crema/utility/APIHooks';

const Employees = (props) => {
  
  const {
        employeesTableData,
         onCloseAddEmployee,
         onOpenAddEmployee,
         isAddEmployeeOpen,
         employeeSlected,
         onOpenEditEmployee,
         onChangeStatus,
         reCallAPI
        } = props;

  const infoViewActionsContext = useInfoViewActionsContext();


  const onDeleteEmployee = (productId)=>{
    const selectId = productId;
    postDataApi(`http://192.168.43.197:8080/api/employee/delete/${selectId}`,infoViewActionsContext
    ).then(()=>{
      reCallAPI();
      infoViewActionsContext.showMessage('Employee Deleted Successfully');
    }).catch((error) => {
      infoViewActionsContext.fetchError(error.message);
    });
  }



  return (
    <AppScrollbar>

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
            <IntlMessages id='Employees' />
          </Box>
       
          <Box sx={{px: {xs: 4, md: 5}, pt: {xs: 4, md: 5}, pb: 2.5}}>
        <Zoom in style={{transitionDelay: '300ms'}}>
          <Button
            variant='outlined'
            color='primary'
            sx={{
              padding: '8px 28px',
              borderRadius: 30,
              '& .MuiSvgIcon-root': {
                fontSize: 26,
              },
            }}
            startIcon={<AddIcon />}
            onClick={onOpenAddEmployee}
          >
            <IntlMessages id='Add new Employee' />
          </Button>
        </Zoom>
      </Box>
      <AddNewEmployee
         employeeSlected={employeeSlected}
         isAddEmployeeOpen={isAddEmployeeOpen}
         onCloseAddEmployee={onCloseAddEmployee}
         reCallAPI={reCallAPI}
      />
   
        </Box>
        
      }
  
    >
      <EmployeesTable
      onChangeStatus={onChangeStatus}
      onOpenEditEmployee={onOpenEditEmployee}
      employeeSlected={employeeSlected}
      onOpenAddEmployee={onOpenAddEmployee} 
      employeesTableData={employeesTableData}
      onDeleteEmployee={onDeleteEmployee}
      />
    </AppCard>
    </AppScrollbar>

  );
};

export default Employees;

// categoryTableData.defaultProps = {
//   categoryTableData: [],
// };

Employees.propTypes = {
  employeesTableData: PropTypes.array,
  reCallAPI: PropTypes.func,
  onCloseAddEmployee: PropTypes.func,
  onChangeStatus: PropTypes.func,
  onOpenAddEmployee: PropTypes.func,
  isAddEmployeeOpen: PropTypes.bool,
  onOpenEditEmployee: PropTypes.func,
  employeeSlected: PropTypes.object
};
