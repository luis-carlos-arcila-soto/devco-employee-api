# devco-employees
This repository contains an API of employees for testing purposes.

## Structure
Project structure:

* **.github/workflows**: Github pipeline.
* **src**: Contains all project files.
* **src/aws-services**: Contains the AWS api. 
* **src/services**: Contains dynamodb CRUD. 
* **src/handler**: Main file of the project.
* **package.json**: npm dependencies.
* **serverless.yml**: config file for aws services.
* **tsconfig.json**: typescript configurations.

## Solution
This solution contains a serverless API that uses API Gateway Amazon service to create, deploy and mantaint it. To implement the API presented, the NodeJS language was used, in addition, the AWS SDK framework and the DynamoDB database engine, both offered by Amazon.
