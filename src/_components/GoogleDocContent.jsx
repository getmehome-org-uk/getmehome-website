import React from 'react'
import useSWR from 'swr'
import { getContent } from '../_content/getContent';


function GoogleDocContent ({ id }) {
    const { data, error } = useSWR(id, getContent)

    //console.log('<Content', { id, data });

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>
    return <div className="content-from-google-docs" dangerouslySetInnerHTML={{__html:data}}></div>
}


export { GoogleDocContent }