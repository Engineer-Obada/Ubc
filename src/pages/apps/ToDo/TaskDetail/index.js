import React, {useEffect} from 'react';
import TaskDetailHeader from './TaskDetailHeader';
import TaskDetailBody from './TaskDetailBody';
import {useParams} from 'react-router-dom';
import AppsHeader from '@crema/core/AppsContainer/AppsHeader';
import AppsContent from '@crema/core/AppsContainer/AppsContent';
import {MailDetailSkeleton} from '@crema/core/AppSkeleton/MailDetailSkeleton';
import {useGetDataApi} from '@crema/utility/APIHooks';

const TaskDetail = () => {
  const {id} = useParams();
  const [{apiData: selectedTask}, {setQueryParams, setData}] = useGetDataApi(
    '/api/todoApp/task/',
    undefined,
    {id: id},
    false,
  );

  useEffect(() => {
    setQueryParams({id});
  }, [id]);

  const onUpdateSelectedTask = (data) => {
    setData(data);
  };

  if (!selectedTask) {
    return <MailDetailSkeleton />;
  }
  return (
    <>
      <AppsHeader>
        <TaskDetailHeader
          selectedTask={selectedTask}
          onUpdateSelectedTask={onUpdateSelectedTask}
        />
      </AppsHeader>
      <AppsContent isDetailView>
        <TaskDetailBody
          selectedTask={selectedTask}
          onUpdateSelectedTask={onUpdateSelectedTask}
        />
      </AppsContent>
    </>
  );
};

export default TaskDetail;
