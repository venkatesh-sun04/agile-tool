import React from 'react';
import PropTypes from 'prop-types';
import { xor } from 'lodash';

import {
  Filters,
  SearchInput,
  Avatars,
  AvatarIsActiveBorder,
  StyledAvatar,
  StyledButton,
  ClearAll,
} from './Styles';

const propTypes = {
  projectUsers: PropTypes.array.isRequired,
  defaultFilters: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  mergeFilters: PropTypes.func.isRequired,
};

const ProjectBoardFilters = ({ projectUsers, defaultFilters, filters, mergeFilters }) => {
  const { searchTerm, userIds, myOnly, recent } = filters;
  const areFiltersCleared = !searchTerm && userIds.length === 0 && !myOnly && !recent;
  console.log("React Application");
  // console.log(projectUsers,filters,mergeFilters);
  
  const handleSelectChange = (event) =>{
    console.log(myOnly, recent);
    const value = event.target.value;
    // debugger;
    if(value === "all"){
      mergeFilters(defaultFilters);
    }else if(value === "mine"){
      mergeFilters({ myOnly: true, recent: false });
    }else {
      mergeFilters({ recent: true,  myOnly: false })
    }
    
  }

  const handleSelectUser = (e) =>{
    const userId1 = e.target.value ;
    // console.log(userId1);
    // console.log(typeof parseInt(userId1));
    // console.log(typeof (projectUsers[0].id))
    projectUsers.map((user) =>{
      // console.log(user.id);
      if(parseInt(userId1) === user.id){
        // console.log(userId1);
        mergeFilters({ userIds: xor(userId1, [user.id])})
      }
    })
    // debugger;
    // if(userId1 == projectUsers[0].id){
    //   console.log("success");
    //   mergeFilters({ userIds: xor(userIds, [projectUsers.id]) })
    // }
    
  }
  return (
    <Filters data-testid="board-filters">
      <SearchInput
        icon="search"
        value={searchTerm}
        onChange={value => mergeFilters({ searchTerm: value })}
      />
    
      {/* <Avatars>
        {projectUsers.map(user => (
          <AvatarIsActiveBorder key={user.id} isActive={userIds.includes(user.id)}>
            <StyledAvatar
              avatarUrl={user.avatarUrl}
              name={user.name}
              onClick={() => mergeFilters({ userIds: xor(userIds, [user.id]) })}
            />
          </AvatarIsActiveBorder>
        ))}
      </Avatars> */}
     <select onChange={handleSelectUser}>
      {projectUsers.map( (data,index) => (
      // <select onChange={handleSelectUser}>
      <option  key = {index} value={data.id}  >{data.name}</option>  
      // {/* <option value={projectUsers[0].id}>{projectUsers[0].name}</option>
      // <option value={projectUsers[1].id}>{projectUsers[1].name}</option>
      // <option value={projectUsers[2].id}>{projectUsers[2].name}</option>   */}
      // // </select>
      ))}
      </select>
       {/* <StyledButton
        variant="empty"
        isActive={myOnly}
        onClick={() => mergeFilters({ myOnly: !myOnly })}
      >
        Only My Issues

      </StyledButton>

      <StyledButton
        variant="empty"
        isActive={recent}
        onClick={() => mergeFilters({ recent: !recent })}
      >
        Recently Updated
      </StyledButton>
      {!areFiltersCleared && (
        <ClearAll onClick={() => mergeFilters(defaultFilters)}>Clear all</ClearAll>
      )} */}
       <select onChange={handleSelectChange}>
        <option value="all">All Issues</option>
        <option value="mine"> Only My Issues</option>
        <option value="updated"> Recently Updated</option>
      </select>
    </Filters>
  );
};

ProjectBoardFilters.propTypes = propTypes;

export default ProjectBoardFilters;
