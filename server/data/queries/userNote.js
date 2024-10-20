const graphql = require('graphql')
const { GraphQLID,GraphQLObjectType,GraphQLList,GraphQLSchema}= graphql

const userNote= require('../model/db')
const userNoteType= require('../type/userNoteType')
const RootMutation = require('../mutation/Note')

const RootQuery= new GraphQLObjectType({
    name: 'getNote',
    fields:{
        getNote:{
            type:new GraphQLList(userNoteType),
            args:{
                id:{type:GraphQLID}
            },
            async resolve(parent,args){
                if(args.id){
                    return await userNote.findByPk(args.id)
                }else{
                    return await userNote.findAll()
                }
            }
        }
    }
})

const schema = new GraphQLSchema({
    query:RootQuery,
    mutation:RootMutation
})

module.exports = schema;