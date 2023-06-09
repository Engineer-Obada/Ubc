import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import AddNewBoard from './AddNewBoard';
import IntlMessages from '@crema/utility/IntlMessages';
import Box from '@mui/material/Box';
import AppGridContainer from '@crema/core/AppGridContainer';
import BoardItem from './BoardItem';
import AddBoardButton from './AddBoardButton';
import {Fonts} from 'shared/constants/AppEnums';
import AppInfoView from '@crema/core/AppInfoView';
import {Zoom} from '@mui/material';
import {useInfoViewActionsContext} from '@crema/utility/AppContextProvider/InfoViewContextProvider';
import {postDataApi, putDataApi, useGetDataApi} from '@crema/utility/APIHooks';

const BoardList = () => {
  const navigate = useNavigate();

  const infoViewActionsContext = useInfoViewActionsContext();

  const [{apiData: boardList}, {setData}] = useGetDataApi(
    '/api/scrumboard/board/list',
    [],
  );

  const [isAddBoardOpen, setAddBoardOpen] = useState(false);

  const [selectedBoard, setSelectedBoard] = useState(null);

  const onCloseAddBoardModal = () => {
    setAddBoardOpen(false);
  };

  const onAddButtonClick = () => {
    setSelectedBoard(null);
    setAddBoardOpen(true);
  };

  const onEditButtonClick = (board) => {
    setSelectedBoard(board);
    setAddBoardOpen(true);
  };

  const onAddBoard = (name) => {
    if (selectedBoard) {
      const board = {...selectedBoard, name};
      putDataApi('/api/scrumboard/edit/board', infoViewActionsContext, {
        board,
      })
        .then(() => {
          infoViewActionsContext.showMessage('Board Edited Successfully!');
        })
        .catch((error) => {
          infoViewActionsContext.fetchError(error.message);
        });
    } else {
      postDataApi('/api/scrumboard/add/board', infoViewActionsContext, {
        board: {name},
      })
        .then((data) => {
          setData(data);
          infoViewActionsContext.showMessage('Board Added Successfully!');
        })
        .catch((error) => {
          infoViewActionsContext.fetchError(error.message);
        });
    }
  };

  const onViewBoardDetail = (board) => {
    navigate(`/apps/scrum-board/${board.id}`);
  };

  return (
    <>
      <Zoom direction='up' in mountOnEnter unmountOnExit>
        <Box
          sx={{
            pt: 4,
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
          }}
        >
          <Box
            component='h2'
            sx={{
              my: {xs: 5, sm: 5, xl: 8},
              color: 'text.primary',
              fontWeight: Fonts.BOLD,
              textAlign: 'center',
              fontSize: 16,
            }}
          >
            <IntlMessages id='scrumboard.scrumboardApp' />
          </Box>
          <AppGridContainer
            sx={{
              justifyContent: 'center',
            }}
          >
            {boardList && boardList.length > 0
              ? boardList.map((board) => {
                  return (
                    <BoardItem
                      key={board.id}
                      board={board}
                      onEditButtonClick={onEditButtonClick}
                      onViewBoardDetail={onViewBoardDetail}
                    />
                  );
                })
              : null}
            <AddBoardButton onAddButtonClick={onAddButtonClick} />
          </AppGridContainer>
        </Box>
      </Zoom>

      {isAddBoardOpen ? (
        <AddNewBoard
          isAddBoardOpen={isAddBoardOpen}
          onCloseAddBoardModal={onCloseAddBoardModal}
          onAddBoard={onAddBoard}
          selectedBoard={selectedBoard}
        />
      ) : null}
      <AppInfoView />
    </>
  );
};

export default BoardList;
