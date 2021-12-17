import {graphql} from "gatsby";

export const commentFragment = graphql`
    fragment CommentFragment on SheetsEstratti {
        word
        comment
        petitionSlug
        origin
        likes
        petitionLink
        author: userId
        createdAt(fromNow: true)
        splitted
        id
        commentableId
    }
    fragment CommentJsonFragment on CommentsJson {
        id
        sentences
        origin
        user
        commentId
        createdAt(fromNow: true)
        petition {
            slug
            title
        }
    }
`