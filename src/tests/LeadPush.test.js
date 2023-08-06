const { faker } = require('@faker-js/faker');
const axios = require('axios');
require('dotenv').config();

async function pushLeadRequest() {
  const requstBody = {
    ip: '1.1.1.1',
    first_name: faker.person.firstName('female'),
    last_name: faker.person.lastName('female'),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    password: faker.internet.password(),
    affiliate_id: 8, 
    offerId: 6, 
  };
  const headers = {
    'Authorization': process.env.TOKEN,
    'Content-Type': 'application/json',
  };

  let config = {
    method: 'post',
    url: process.env.API_URL,
    headers,
    data: requstBody
  };
  
  const response = await axios.request(config);
  return response.data;
}


test('successfull Lead Push', async () => { 
  const response = await pushLeadRequest();

  // expected result
  expect(response).toHaveProperty('lead_uuid'); 
  expect(typeof response.lead_uuid).toEqual('string'); 

  expect(response).toHaveProperty('auto_login_url'); 
  expect(typeof response.auto_login_url).toEqual('string'); 

  expect(response).toHaveProperty('advertiser_uuid'); 
  expect(typeof response.advertiser_uuid).toEqual('string'); 

  expect(response).toHaveProperty('advertiser_name'); 
  expect(typeof response.advertiser_name).toEqual('string'); 

});