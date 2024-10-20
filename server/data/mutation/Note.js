const graphql = require('graphql')
const { GraphQLString,GraphQLID,GraphQLObjectType}= graphql

const userNote= require('../model/db')
const userNoteType= require('../type/userNoteType')
const { where } = require('sequelize')

const RootMutation = new GraphQLObjectType({
    name:'addNotes',
    fields:{
        noteList:{
            type:userNoteType,
            args:{
                id:{type:GraphQLID},
                note:{ type:GraphQLString}
            },
            async resolve(parent,args){
                let update = await userNote.findByPk(args.id)
                if(update){
                    await userNote.update({
                        note: args.note || update.note
                    },{
                        where: {id:args.id}
                    })
                    return update;
                }else{
                    return await userNote.create({
                        note:args.note
                    })
                }
            }
        }
    }
})

module.exports= RootMutation;