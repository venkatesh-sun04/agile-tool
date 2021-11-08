import { FormButton } from 'Project/Board/IssueDetails/Comments/BodyForm/Styles'
import React from 'react'
import { useState } from 'react';
import { Breadcrumbs } from 'shared/components'
import { useHistory } from "react-router";
import { Redirect } from "react-router";


const routeIndex = () => {
    let sample = useHistory();
    const [auth,setAuth] = useState(false);
    if(auth){
        return <Redirect to ='/settings' />
    
    }
        return (
        <div>
            <Breadcrumbs items={['Projects', 'singularity 1.0', 'Pages']} />
            <form>
            <FormButton onClick={()=>sample.push('/project/board')}>Kanban Board</FormButton>
            <FormButton onClick={()=>sample.push('/project/settings')}>Project Setting</FormButton>

            {/* <FormButton onClick={()=>setAuth(true)} >Project Setting</FormButton> */}

            </form>
        </div>
    )
}

export default routeIndex
