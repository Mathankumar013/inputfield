const express =require('express');
const app= express();
const {graphqlHTTP} = require('express-graphql')
const schema = require('./data/queries/userNote')
const cors= require('cors')

app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema:schema,
    graphiql:true
}))
app.listen(4095,()=>{
    console.log("server ready to running port 4095")
})