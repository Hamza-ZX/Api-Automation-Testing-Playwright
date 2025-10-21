const { test, expect } = require("@playwright/test");
const { request } = require("http");

const random = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

var token;

test.describe('Eccomerce Store', async () =>{

    test('GET Store Products', async ({page}) => {

        var response = await page.request.get("https://api.escuelajs.co/api/v1/products")
        await expect(response.status()).toBe(200)
        var data = await response.json()
        console.log(data)
    })

    test('Get Users',async ({page}) => {
        var response = await page.request.get("https://api.escuelajs.co/api/v1/users")
        expect(await response.status()).toBe(200)
        console.log(await response.json())
    })

    test('Login', async ({page}) => {
        var response = await page.request.post("https://api.escuelajs.co/api/v1/auth/login", {
            data:{

                "email": "john@mail.com",
                "password": "changeme"
            },
            headers:{
                "Content-Type": "application/json"
            }
        });

        console.log(await response.status())
    
    })
  
})

test.describe("Fetching and Plugging JWT", async ()=> {

test('Login', async ({page}) => {

    const response = await page.request.post("https://dummyjson.com/auth/login", {

        data:{
            username: 'emilys',
            password: 'emilyspass',
        },
        headers:{
            'Content-Type': "application/json"
        }
    })

    console.log(response.status())
    expect(response.status()).toBe(200)
    var body = await response.json()
    token = await body.accessToken
   
})

test('Get User', async ({page}) =>{

    var response = await page.request.get("https://dummyjson.com/auth/me", {

        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    console.log(await response.status())
})

})

test.describe('Testing Random API', async () => {

    test('Get Pokemons', async ({page}) => {
       var response =  await page.request.get("https://pokeapi.co/api/v2/pokemon/ditto/")
       expect(await response.status()).toBe(200)
       console.log(await response.json())
       

    })

    test('Earthquake GET API with Query Params', async ({page}) =>{
        var response = await page.request.get("https://earthquake.usgs.gov/fdsnws/event/1/", {
            params:{

                format: "geojson",
                starttime: "2020-01-01",
                endtime: "2020-01-02"
            }

        })
          expect(await response.status()).toBe(200)
    })

})

test.describe('Books API', async () => {

    test('Books Status', async ({page}) => {
        var response = await page.request.get("https://simple-books-api.click/status", {
            
            headers:{
                "Content-Type": 'application/json'
            }
        })

        expect(await response.status()).toBe(200)
        console.log(await response.json())
    })

    test('Get Books', async ({page}) => {

        var response = await page.request.get("https://simple-books-api.click/books")
        console.log(await response.json())
        expect(await response.status()).toBe(200)
    })

    test('Get Single Book', async ({page}) => {
        var id = 2;
        var response = await page.request.get(`https://simple-books-api.click/books/${id}`)
        console.log(await response.json())
        expect(await response.status()).toBe(200)
    })

    test('Get Books with Query Param', async ({page}) =>{

        var types = ['fiction', 'non-fiction']
        var limit = 3;
        var response = await page.request.get("https://simple-books-api.click/books", {

            params:{
                "type": `${types[0]}`,
                "limit": `${limit}`
            }
        })

        console.log(await response.json())
        var body = await response.json()
        expect(await body.length).toBe(limit)
        expect(await response.status()).toBe(200)
    })

    test('Login Auth - Already Registered', async ({page}) => {


        var response = await page.request.post("https://simple-books-api.click/api-clients", {
            
            data:{

                "clientName": "Postman",
                "clientEmail": "valentin@example.com"
            }
        })

        expect(await response.status()).toBe(409)
        
    })

     test.only('Login Auth', async ({page}) => {


        var response = await page.request.post("https://simple-books-api.click/api-clients", {
            
            data:{

                "clientName": random(),
                "clientEmail": random() + "@gmail.com"
            }
        })

        var body = await response.json()
        token = body.accessToken;
        console.log(token)
        expect(await response.status()).toBe(201)
        
    })

    test.only('Post Order', async ({page}) => {

        var response = await page.request.post("https://simple-books-api.click/api-clients/orders", {

            data:{

                "bookId": 2,
                "customerName": random()
            },

           headers:{

            "Authorization": "Invalid token value"
             
           }
          
        })
        expect(await response.status()).toBe(404)
    })
})
