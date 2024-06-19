/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const dotenv = require('dotenv');
const { generateApi } = require('swagger-typescript-api');

dotenv.config({
  path: path.resolve(process.cwd(), './.env'),
});

generateApi({
  name: 'Api.ts',
  output: path.resolve(process.cwd(), './src/api'),
  url: `${process.env.REACT_APP_API_HOST}/v3/api-docs`,
  httpClientType: 'axios',
  extractEnums: true,
  unwrapResponseData: true,
}).catch(console.error);
