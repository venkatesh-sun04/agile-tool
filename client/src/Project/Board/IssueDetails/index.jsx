import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import api from 'shared/utils/api';
import useApi from 'shared/hooks/api';
import { PageError, CopyLinkButton, Button, AboutTooltip } from 'shared/components';

import Loader from './Loader';
import Type from './Type';
import Delete from './Delete';
import Title from './Title';
import Description from './Description';
import Comments from './Comments';
import Status from './Status';
import AssigneesReporter from './AssigneesReporter';
import Priority from './Priority';
import EstimateTracking from './EstimateTracking';
import Dates from './Dates';
import { formatDateTimeConversational } from 'shared/utils/dateTime';
import { TopActions, TopActionsRight, Content, Left, Right } from './Styles';
import './TableSty.css' ;

const propTypes = {
  issueId: PropTypes.string.isRequired,
  projectUsers: PropTypes.array.isRequired,
  fetchProject: PropTypes.func.isRequired,
  updateLocalProjectIssues: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetails = ({
  issueId,
  projectUsers,
  fetchProject,
  updateLocalProjectIssues,
  modalClose,
}) => {
  const [{ data, error, setLocalData }, fetchIssue] = useApi.get(`/issues/${issueId}`);

  if (!data) return <Loader />;
  if (error) return <PageError />;

  const { issue } = data;

  const updateLocalIssueDetails = fields =>
    setLocalData(currentData => ({ issue: { ...currentData.issue, ...fields } }));

  const updateIssue = updatedFields => {
    api.optimisticUpdate(`/issues/${issueId}`, {
      updatedFields,
      currentFields: issue,
      setLocalData: fields => {
        updateLocalIssueDetails(fields);
        updateLocalProjectIssues(issue.id, fields);
      },
    });
  };
  // console.log(issue);
  // const dataaa = issue.users;
  // const assignees = issue.users.map((e)=>e.name);
  const assignees = issue.users;

    console.log(assignees);

  return (
    <Fragment>
      <TopActions>
        <Type issue={issue} updateIssue={updateIssue} />
        <TopActionsRight>
          <AboutTooltip
            renderLink={linkProps => (
              <Button icon="feedback" variant="empty" {...linkProps}>
                Give feedback
              </Button>
            )}
          />
          <CopyLinkButton variant="empty" />
          <Delete issue={issue} fetchProject={fetchProject} modalClose={modalClose} />
          <Button icon="close" iconSize={24} variant="empty" onClick={modalClose} />
        </TopActionsRight>
      </TopActions>
      <Content>
        <Left>
          <Title issue={issue} updateIssue={updateIssue} />
          <Description issue={issue} updateIssue={updateIssue} />
          <Comments issue={issue} fetchIssue={fetchIssue} />
        </Left>
        <Right>
        
        <table id="customers">
          <thead>
          <tr>
          <th>S.NO</th>
         <th>PROPERTY</th>
         <th>DETAILS</th>
         </tr>
         </thead>
          <tbody>
            <tr>
              <td></td>
              <td>Status</td>
              <td>{issue.status}</td>
            </tr>
              <tr>
              <td></td>
                <td>Assignees</td>
                <td>
                 { assignees.length ===0 ? "No Assignees" : (assignees.map((assignees,index) => 
                  (<ul  key={Math.random()}>
                    <li >{assignees.name} {assignees.email}</li>
                  </ul>)))} 
                </td>
              </tr>
              <tr>
              <td></td>
                <td>ReporterID</td>
                <td>{issue.reporterId}</td>
              </tr>
              <tr>
              <td></td>
                <td>Priority</td>
                <td>{issue.priority}</td>
              </tr>
              <tr>
              <td></td>
                <td>EstimateTracking</td>
                <td>{issue.estimate} Hours</td>
              </tr>
              <tr>
              <td></td>
                <td>CreatedAt</td>
                <td>{formatDateTimeConversational(issue.createdAt)}</td>
              </tr>
              <tr>
              <td></td>
                <td>UpdatedAt</td>
                <td>{formatDateTimeConversational(issue.updatedAt)}</td>
              </tr>
            </tbody>
        </table>
        
          <Status issue={issue} updateIssue={updateIssue} />
          <AssigneesReporter issue={issue} updateIssue={updateIssue} projectUsers={projectUsers} />
          <Priority issue={issue} updateIssue={updateIssue} />
          <EstimateTracking issue={issue} updateIssue={updateIssue} />
          <Dates issue={issue} />
        </Right>
      </Content>
    </Fragment>
  );
};

ProjectBoardIssueDetails.propTypes = propTypes;

export default ProjectBoardIssueDetails;
