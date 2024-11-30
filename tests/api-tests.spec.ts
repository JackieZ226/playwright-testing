import {test, expect} from '@playwright/test'

test('API Testing', async ({ request }) => {
    //get response from API endpoint
    const response = await request.get('https://automationexercise.com/api/productsList');
    //expect 200 status OK
    expect(response.status()).toBe(200);
    //get the response in JSON format
    const responseBody = await response.json();
    //logic or checking of received JSON
    await expect(responseBody).toHaveProperty("products");
  });

  test("POST To All Products List", async({request})=>{
    const response = await request.post('https://automationexercise.com/api/productsList');
    await expect(response.status()).toBe(200);

    const responseBody = await response.json();
    //responsebody.xyz is a way to access a specific parameter then .toBe allows us to check it
    //wonder how to check arrays? length? array parameters? array of JSONs?
    await expect(responseBody.responseCode).toBe(405);
    await expect(responseBody.message).toBe('This request method is not supported.');
  });

  test("Get All Brands List", async({request}) => {
    const response = await request.get("https://automationexercise.com/api/brandsList");
    await expect(response.status()).toBe(200);

    const responseBody = await response.json();
    // console.log(responseBody);
    //good to know the response headers using below
    // console.log(response.headers());
    await expect(responseBody.responseCode).toBe(200);
  });

  test("PUT To All Brands List", async({request})=>{
    const response = await request.put("https://automationexercise.com/api/brandsList");
    await expect(response.status()).toBe(200);

    const responseBody = await response.json();
    // console.log(responseBody);
    await expect(responseBody.responseCode).toBe(405);
    await expect(responseBody.message).toBe('This request method is not supported.');
  });

  test("POST to Search Product", async({request})=>{
    const response = await request.post('https://automationexercise.com/api/searchProduct');
    await expect(response.status()).toBe(200);

    const responseBody = await response.json();
    await expect(responseBody.responseCode).toBe(400);
    await expect(responseBody.message).toBe('Bad request, search_product parameter is missing in POST request.');
  });

  test("POST To Search Product without search_product parameter", async({request})=>{
    const response = await request.post("https://automationexercise.com/api/searchProduct");
    await expect(response.status()).toBe(200);

    const responseBody = await response.json();
    await expect(responseBody.responseCode).toBe(400);
    await expect(responseBody.message).toBe("Bad request, search_product parameter is missing in POST request.");
  });

  test("POST to Verify Login with valid details", async({request}) => {
    const response = await request.post("https://automationexercise.com/api/verifyLogin", {
      data: {
        email: "admin@adminadmin.com",
        password: "12345"
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });
    await expect(response.status()).toBe(200);
    // getting a responseCode 400 with message 'Bad request, email or password parameter is missing in POST request', API documentation is unclear if it should be JSON or how it should be received
    // const responseBody = await response.json();
    // console.log(responseBody);
    // console.log(response.headers());
  });

  test("POST to Verify Login without email parameter", async({request})=>{
    const response = await request.post("https://automationexercise.com/api/verifyLogin",{
      data: {
        password: "12345"
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });
    await expect(response.status()).toBe(200);

    const responseBody = await response.json();
    await expect(responseBody.responseCode).toBe(400);
  });

  test("DELETE to Verify Login", async({request})=>{
    const response = await request.delete("https://automationexercise.com/api/verifyLogin");
    await expect(response.status()).toBe(200);

    const responseBody = await response.json();
    await expect(responseBody.responseCode).toBe(405);
  });

  test("POST to Verify Login with invalid details", async({request})=>{
    const response = await request.post("https://automationexercise.com/api/verifyLogin",{
      data: {
        email: 'incorrectEmail@email.com',
        password: 'incorrectpassword'
      },
      headers: {
        'Content-Type':'application/json'
      }
    });
    await expect(response.status()).toBe(200);

    //same issue getting a bad reponseCode and message email or password parameter is missing when I'm sending a json with email and password, is json not the correct format?
    // const responseBody = await response.json();
  });

  test("POST to Create/Register User Account", async({request})=>{
    const response = await request.post("https://automationexercise.com/api/createAccount",{
      data:{
        name: "123124135",
        email: "agra@awgo.com",
        password: "12345",
        title: "Mr",
        birth_date:"2",
        birth_month:"May",
        birth_year:"1999",
        firstname:"admin",
        lastname:"admin",
        company:"examplecompany",
        address1:"1234143",
        address2:"54151",
        country:"United States",
        zipcode:"1341",
        state:"1235",
        city:"54124",
        mobile_number:"123143"
      },
      headers:{
        'Content-Type':"application/json"
      }
    })
    await expect(response.status()).toBe(200);

    const responseBody = await response.json();
    //Bad request, name parameter is missing in POST request. why? Sent email to the host of site for format the API endpoint is expecting
    // console.log(responseBody);
  });

  test("DELETE METHOD To Delete User Account", async({request})=>{
    const response = await request.delete("https://automationexercise.com/api/deleteAccount",{
      data:{
        email: "admin@adminadmin",
        password:"12345",
      },
      headers:{
        "Content-Type":"application/json"
      }
    });
    await expect(response.status()).toBe(200);

    // const responseBody = await response.json();
    // console.log(responseBody);
  });

  test("PUT METHOD to Update User Account", async({request})=>{
    const response = await request.put("https://automationexercise.com/api/updateAccount",{
      data:{
        name: "123124135",
        email: "agra@awgo.com",
        password: "12345",
        title: "Mr",
        birth_date:"2",
        birth_month:"May",
        birth_year:"1999",
        firstname:"admin",
        lastname:"admin",
        company:"examplecompany",
        address1:"1234143",
        address2:"54151",
        country:"United States",
        zipcode:"1341",
        state:"1235",
        city:"54124",
        mobile_number:"123143444"
      },
      headers:{
        'Content-Type':"application/json"
      }
    })
    await expect(response.status()).toBe(200);

    const responseBody = await response.json();
    //Bad request, email parameter is missing in PUT request. why? Sent email to the host of site for format the API endpoint is expecting
    // console.log(responseBody);
  });

  test("GET user account detail by email", async({request})=>{
    const response = await request.get("https://automationexercise.com/api/getUserDetailByEmail", {
      data:{
        email:"admin@adminadmin"
      },
      headers:{
        "Content-Type":"application/json"
      }
    });
    await expect(response.status()).toBe(200);

    const responseBody = await response.json()
    // console.log(responseBody);
  });