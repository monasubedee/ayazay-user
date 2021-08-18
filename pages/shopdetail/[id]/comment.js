import React from 'react';
import UnderMainTanence from '../../../components/undermaintanence/undermaintanence'
import { useRouter } from 'next/router';


const Comment = () => {

    const { query } = useRouter();


    return (
        <div>
            <UnderMainTanence query={query} />
        </div>
    )
}

export default Comment;