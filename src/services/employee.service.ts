import { DynamoDB } from 'aws-sdk';
import { Service } from 'typedi';
import { IEmployee } from '../models/employee.model';

@Service()
export default class EmployeeService {

  constructor() { }

  public async ListEmployees() {
    // Create DynamoDB service object
    var docClient: DynamoDB.DocumentClient = new DynamoDB.DocumentClient();
    // connect to local DB if running offline
    if (process.env.IS_OFFLINE == "true") {
      let options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000'
      }
      docClient = new DynamoDB.DocumentClient(options);
    }

    var params = {
      TableName: process.env.DYNAMO_TABLE
    };

    //var request: HttpResponse = new HttpResponse();

    return docClient.scan(params).promise().then((data) => {
      console.log('Found DynamoDB data');
      return data.Items;
    }).catch(error => {
      console.log(`==>> Error [queryData] [${error.message}]`);
    });
  }

  public async OneEmployee(documentId: number) {
    // Create DynamoDB service object
    var docClient: DynamoDB.DocumentClient = new DynamoDB.DocumentClient();
    // connect to local DB if running offline
    if (process.env.IS_OFFLINE == "true") {
      let options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000'
      }
      docClient = new DynamoDB.DocumentClient(options);
    }

    var params = {
      TableName: process.env.DYNAMO_TABLE,
      Key: { "documentId": +documentId }
    };

    return docClient.get(params).promise().then((data) => {
      console.log('Found DynamoDB data');
      return data.Item;
    }).catch(error => {
      console.log(`==>> Error [queryData] [${error.message}]`);
    });
  }

  public async DeleteEmployee(documentId: number) {
    // Create DynamoDB service object
    var docClient: DynamoDB.DocumentClient = new DynamoDB.DocumentClient();
    // connect to local DB if running offline
    if (process.env.IS_OFFLINE == "true") {
      let options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000'
      }
      docClient = new DynamoDB.DocumentClient(options);
    }

    var params = {
      TableName: process.env.DYNAMO_TABLE,
      Key: { "documentId": +documentId }
    };

    return docClient.delete(params).promise().then((data) => {
      console.log('Deleted DynamoDB data');
      return data;
    }).catch(error => {
      console.log(`==>> Error [queryData] [${error.message}]`);
    });
  }

  public async CreateEmployee(employeeData: IEmployee) {
    // Create DynamoDB service object
    var docClient: DynamoDB.DocumentClient = new DynamoDB.DocumentClient();
    // connect to local DB if running offline
    if (process.env.IS_OFFLINE == "true") {
      let options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000'
      }
      docClient = new DynamoDB.DocumentClient(options);
    }

    console.log("Inserting into Dynamo Table...");

    const params = {
      TableName: process.env.DYNAMO_TABLE,
      Item: {
        "documentId": employeeData.documentId,
        "names": employeeData.names,
        "lastnames": employeeData.lastnames,
        "position": employeeData.position,
        "salary": employeeData.salary,
        "phone": employeeData.phone,
        "address": employeeData.address,
        "client": employeeData.client
      },
    }

    return docClient.put(params).promise().then(() => {
      console.log(`Client with ID [${employeeData.documentId}] inserted`);
      return { message: `Client with ID [${employeeData.documentId}] inserted` };
    }).catch(error => {
      console.log(`==>> Error [insertData] Client with ID [${employeeData.documentId}] [${error.message}]`);
    });
  }

  public async UpdateEmployee(employeeData: IEmployee) {
    // Create DynamoDB service object
    var docClient: DynamoDB.DocumentClient = new DynamoDB.DocumentClient();
    // connect to local DB if running offline
    if (process.env.IS_OFFLINE == "true") {
      let options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000'
      }
      docClient = new DynamoDB.DocumentClient(options);
    }

    console.log("Inserting into Dynamo Table...");

    const documentId = employeeData.documentId;
    const params = {
      TableName: process.env.DYNAMO_TABLE,
      Key: { documentId },
      UpdateExpression: 'set #a = :names, #b = :lastnames, #c = :position, #d = :salary, #e = :phone, #f = :address, #g = :client',
      ExpressionAttributeNames: { '#a': 'names', '#b': 'lastnames', '#c': 'position', '#d': 'salary', '#e': 'phone', '#f': 'address', '#g': 'client' },
      ExpressionAttributeValues: { ':names': employeeData.names, ':lastnames': employeeData.lastnames, ':position': employeeData.position, ':salary': employeeData.salary, 
                                   ':phone': employeeData.phone, ':address': employeeData.address, ':client': employeeData.client },
    };

    return docClient.update(params).promise().then(() => {
      console.log(`Client with ID [${employeeData.documentId}] inserted`);
      return { message: `Client with ID [${employeeData.documentId}] inserted` };
    }).catch(error => {
      console.log(`==>> Error [insertData] Client with ID [${employeeData.documentId}] [${error.message}]`);
    });
  }
}