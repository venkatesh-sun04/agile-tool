import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Droppable } from 'react-beautiful-dnd';
import { intersection } from 'lodash';

import { IssueStatusCopy } from 'shared/constants/issues';

import Issue from './Issue';
import { List, Title, IssuesCount, Issues } from './Styles';
// import getReorderedListIssues from './list.utils';

// D:\Repos\jira_clone\client\src\Project\Board\Lists\lists.utils.js
const propTypes = {
  status: PropTypes.string.isRequired,
  project: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  currentUserId: PropTypes.number,
};

const defaultProps = {
  currentUserId: null,
};

const ProjectBoardList = ({ status, project, filters, currentUserId }) => {
  const filteredIssues = filterIssues(project.issues, filters, currentUserId);
  const filteredListIssues11 = getSortedListIssues(filteredIssues, status);
  const filteredListIssues = getReorderedListIssues(filteredListIssues11);

  const allListIssues = getSortedListIssues(project.issues, status);
  return (
    <Droppable key={status} droppableId={status}>
      {provided => (
        <List>
          <Title>
            {`${IssueStatusCopy[status]} `}
            <IssuesCount>{formatIssuesCount(allListIssues, filteredListIssues)}</IssuesCount>
          </Title>
          <Issues
            {...provided.droppableProps}
            ref={provided.innerRef}
            data-testid={`board-list:${status}`}
          >
            {filteredListIssues.map((issue, index) => (
              <Issue key={issue.id} projectUsers={project.users} issue={issue} index={index} />
            ))}
            {provided.placeholder}
          </Issues>
        </List>
      )}
    </Droppable>
  );
};

const filterIssues = (projectIssues, filters, currentUserId) => {
  const { searchTerm, userIds, myOnly, recent } = filters;
  let issues = projectIssues;

  if (searchTerm) {
    issues = issues.filter(issue => issue.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  if (userIds.length > 0) {
    issues = issues.filter(issue => intersection(issue.userIds, userIds).length > 0);
  }
  if (myOnly && currentUserId) {
    issues = issues.filter(issue => issue.userIds.includes(currentUserId));
  }
  if (recent) {
    issues = issues.filter(issue => moment(issue.updatedAt).isAfter(moment().subtract(3, 'days')));
  }
  return issues;
};


const getSortedListIssues = (issues, status) =>
  issues.filter(issue => issue.status === status).sort((a, b) => a.listPosition - b.listPosition);

  const getReorderedListIssues = (data) => {
    data.map((e) => {
      // debugger;
        if(e.type === "story")
            e.type_no = 1;
        else if (e.type  == "bug")
            e.type_no = 2;
            else if (e.type  == "task")
            e.type_no = 3;
    });
    // debugger;

    return data.sort((a,b) => (a.type_no) - (b.type_no));
    }
  
    const formatIssuesCount = (allListIssues, filteredListIssues) => {
  if (allListIssues.length !== filteredListIssues.length) {
    return `${filteredListIssues.length} of ${allListIssues.length}`;
  }
  return allListIssues.length;
};

ProjectBoardList.propTypes = propTypes;
ProjectBoardList.defaultProps = defaultProps;

export default ProjectBoardList;
