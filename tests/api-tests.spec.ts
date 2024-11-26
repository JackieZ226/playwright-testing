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
    console.log(responseBody);
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
  })