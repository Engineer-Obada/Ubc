import { Box, Button, Zoom } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import IntlMessages from '@crema/utility/IntlMessages';
import AppsContainer from '@crema/core/AppsContainer';
import AddNewProduct from './ToDo/AddNewProduct';

export default function product() {
  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);

  const onOpenAddTask = () => {
    setAddTaskOpen(true);
  };

  const onCloseAddTask = () => {
    setAddTaskOpen(false);
  };
  
  
  return (
     <AppsContainer> 
       <div>
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
            onClick={onOpenAddTask}
          >
            <IntlMessages id='Add new Product' />
          </Button>
        </Zoom>
      </Box>
      <AddNewProduct
        isAddTaskOpen={isAddTaskOpen}
        onCloseAddTask={onCloseAddTask}
        // reCallAPI={reCallAPI}
      />
    </div>
    </AppsContainer>

  )
}
