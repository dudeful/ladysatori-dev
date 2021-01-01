const DDB = require('aws-sdk/clients/dynamodb');
const dynamodb = new DDB({ apiVersion: '2012-08-10' });

//----------------CREATE USER--------------
//
const createUser = async (data) => {
  let params = {
    Item: data.Item,
    ConditionExpression: data.condition,

    ReturnConsumedCapacity: 'TOTAL',
    TableName: data.table,
  };

  //there's a bug here when the function is converted into a promise.
  //the code runs twice and therefore the second time throws an error
  //due to the fact that during the second run the ConditionExpression isn't satisfied,
  //that's why it is not using a promise YET.
  const user = await dynamodb
    .putItem(params, function (err, data) {
      if (err) {
        // console.log(err, err.stack);
        return err;
      } else return data;
    })
    .promise();

  return user;
};

// -----------------GET USER-----------------
//
const getUser = async (data) => {
  let params = {
    Key: data.key,
    TableName: data.table,
  };

  const user = await dynamodb
    .getItem(params, function (err, data) {
      if (err) {
        console.log(err, err.stack);
        return err;
      } else return data;
    })
    .promise();

  return user;
};

// ----------------REQUEST RESET TOKEN--------------
//
const requestResetToken = async (data) => {
  let params = {
    Key: {
      email: {
        S: data.email,
      },
    },

    ConditionExpression: 'attribute_exists(email)',

    ExpressionAttributeValues: {
      ':pToken': { S: data.tokenHash },
      ':pExpires': { N: (Date.now() + 1200000).toString() },
    },

    UpdateExpression: 'SET resetPasswordToken = :pToken, resetPasswordExpires = :pExpires',
    ReturnValues: 'ALL_NEW',
    TableName: data.table,
  };

  dynamodb.updateItem(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      return err;
    } else return data;
  });
};

// -----------------RESET PASSWORD-------------------
//
const resetPassword = (data) => {
  const params = {
    Key: {
      email: {
        S: data.email,
      },
    },

    ExpressionAttributeNames: {
      '#pToken': 'resetPasswordToken',
      '#pExpires': 'resetPasswordExpires',
    },

    ExpressionAttributeValues: {
      ':npw': { S: data.newPassword },
      ':pToken': { S: data.resetPasswordToken },
      ':dn': { N: Date.now().toString() },
      ':updatedAt': { S: new Date(Date.now()).toLocaleString() },
      ':lastPasswordReset': { S: new Date(Date.now()).toLocaleString() },
    },

    ConditionExpression: 'attribute_exists(email) and #pExpires > :dn and #pToken = :pToken',

    UpdateExpression:
      'SET password = :npw, updatedAt = :updatedAt, lastPasswordReset = :lastPasswordReset REMOVE #pExpires, #pToken',
    ReturnValues: 'ALL_NEW',
    TableName: data.table,
  };

  const user = dynamodb.updateItem(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      return err;
    } else return data;
  });

  return user;
};

module.exports = { createUser, getUser, requestResetToken, resetPassword };
