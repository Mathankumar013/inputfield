const graphql = require('graphql')
const { GraphQLString,GraphQLID,GraphQLObjectType}= graphql

const userNoteType = new GraphQLObjectType({
    name: 'addNote',
    fields:()=>({
        id:{type:GraphQLID},
        note:{type:GraphQLString}
    })
})
module.exports= userNoteType;