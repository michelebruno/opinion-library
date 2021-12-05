import React from "react"
import {graphql} from "gatsby";
import Layout from "../../components/Layout";
import Comment from "../../components/Comment";


export default function Word({data: {entity, comments}}) {

    return <Layout container>
        <h1 className={"text-xl"}>{entity.name}</h1>
        <div className="flex gap-8">
            <div className={"w-1/2"}>
                {comments.nodes.filter(({origin}) => origin === 'nomask').map(
                    ({extracted, author}) => <Comment author={author} nomask>{extracted}</Comment>
                )}
            </div>
            <div className={"w-1/2"}>

                {comments.nodes.filter(({origin}) => origin === 'promask').map(
                    ({extracted, author}) => <Comment author={author} promask>{extracted}</Comment>
                )}
            </div>
        </div>
    </Layout>
}


export const query = graphql`
    query($name: String!) {
        entity: sheetsScatter(name: { eq: $name }) {
            name
            countNomask
        }
        comments: allSheetsEstratti(filter: {word: {eq: $name}}) {
            nodes {
                ...CommentFragment
            }
        }
        related: allSheetsDistribuzione(filter: {word: {eq: $name}}) {
            nodes {
                secondWord
            }
        }
    }
`

