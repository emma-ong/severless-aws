const { v4 } = require("uuid") //versions created different types of id
const AWS = require("aws-sdk") //access to DynamoDB
const middy = require("@middy/core")
const httpJsonBodyParser = require("@middy/http-json-body-parser")

const updateToDo = async (event) => {

  //Creates table
    //need to set always permissions to allow functions to add into DynamoDB
  const dynamodb = new AWS.DynamoDB.DocumentClient()

  //Defines record variables to be placed in table 
  const { completed } = event.body
  const { id } = event.pathParameters

  await dynamodb.update({
    TableName: "TodoTable",
    Key: { id },
    UpdateExpression: "set completed = :completed",//expressions include set, remove, add delete
    ExpressionAttributeValues: {
      ":completed" : completed//:completed is arbitrary could be :c or :comp etc 
    },
    ReturnValues: "ALL_NEW" //return all objects that have been modified 
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify({
      msg: "Todo Updated"
    })//What is sent via the body for each request
      
  };
};

module.exports = {
  handler: middy(updateToDo).use(httpJsonBodyParser())
}
