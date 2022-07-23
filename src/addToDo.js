const { v4 } = require("uuid") //versions created different types of id
const AWS = require("aws-sdk") //access to DynamoDB

const addToDo = async (event) => {

  //Creates table
    //need to set always permissions to allow functions to add into DynamoDB
  const dynamodb = new AWS.DynamoDB.DocumentClient()

  //Defines record variables to be placed in table 
  const { todo } = JSON.parse(event.body) //requires JSON.parse to convert stringified to object 
  const createdAt = new Date().toISOString()
  const id = v4() //invokes a new id when called

  console.log("This is an id", id)

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
  handler: addToDo
}
