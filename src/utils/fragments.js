import {graphql} from "gatsby";

export const commentFragment = graphql`fragment CommentFragment on SheetsEstratti {
    word
    comment
    petitionSlug
    origin
    likes
    petitionLink
    author
    splitted
    id
    commentableId

}`