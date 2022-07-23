const AWS = require("aws-sdk") //access to DynamoDB

const fetchToDo = async (event) => {

  const dynamodb = new AWS.DynamoDB.DocumentClient()
  const { id } = event.pathParameters

  let todo 

  try {
    const result = await dynamodb.get({
      TableName: "TodoTable",
      Key: { id } 
    }).promise()
    todo = result.Item
    
  }
  catch (error) {
    console.log(error)
  }

  return {
    statusCode: 200,
    body: JSON.stringify(todo)//What is sent via the body for each request
      
  };
};

module.exports = {
  handler: fetchToDo
}
