import React, { useState } from 'react'
import AppsContainer from '@crema/core/AppsContainer';
import {  putDataApi, useGetDataApi } from '@crema/utility/APIHooks';
import Employees from './Employees';
import { useInfoViewActionsContext } from '@crema/utility/AppContextProvider/InfoViewContextProvider';

export default function employee() {
  // const api = 'api'
  const [isAddEmployeeOpen, setAddEmployeeOpen] = React.useState(false);
  const [{apiData:EmployeeData},{reCallAPI}] = useGetDataApi(`http://192.168.43.197:8080/api/employee`);
  const [employeeSlected, setEmployeeSlected] = useState(null);
  
  const infoViewActionsContext = useInfoViewActionsContext();

  const onOpenAddEmployee = () => {
    setAddEmployeeOpen(true);
  };
  const onOpenEditEmployee = (row)=>{
    setAddEmployeeOpen(true);
    setEmployeeSlected(row)
  }

  const onChangeStatus = (status, contact) => {
    const selectedIdList = [contact.id];
    putDataApi('api/employee/update/accountStatus',infoViewActionsContext, {
      contactIds: selectedIdList,
      status: status,
    }).then(() => {
      reCallAPI();
      infoViewActionsContext.showMessage(
          'Contact Marked as Starred Successfully'
      );
    })
    .catch((error) => {
      infoViewActionsContext.fetchError(error.message);
    });
  }
  

  const onCloseAddEmployee = () => {
    setAddEmployeeOpen(false);
  };
  
  
  return (
     <AppsContainer> 
    <Employees 
    onChangeStatus={onChangeStatus}
    employeeSlected={employeeSlected}
    onCloseAddEmployee={onCloseAddEmployee} 
    onOpenAddEmployee={onOpenAddEmployee}
    onOpenEditEmployee={onOpenEditEmployee}
    isAddEmployeeOpen={isAddEmployeeOpen} 
    employeesTableData={EmployeeData}
    reCallAPI={reCallAPI}
    />
    </AppsContainer>

  )
}
