const { v4 } = require("uuid") //versions created different types of id
const AWS = require("aws-sdk") //access to DynamoDB
const middy = require("@middy/core")
const httpJsonBodyParser = require("@middy/http-json-body-parser")

const addToDo = async (event) => {

  //Creates table
    //need to set always permissions to allow functions to add into DynamoDB
  const dynamodb = new AWS.DynamoDB.DocumentClient()

  //Defines record variables to be placed in table 
  //const { todo } = JSON.parse(event.body) //requires JSON.parse to convert stringified to object 
  const { todo } = event.body //no longer needs JSON.parse due to middy applied @line 40
  const createdAt = new Date().toISOString()
  const id = v4() //invokes a new id when called


  //Defines table record
  const newTodo = {
    id, 
    todo,
    createdAt,
    completed: false
  }

  await dynamodb.put({
    TableName: "TodoTable",
    Item: newTodo
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(newTodo)//What is sent via the body for each request
      
  };
};

module.exports = {
  handler: middy(addToDo).use(httpJsonBodyParser())
}
