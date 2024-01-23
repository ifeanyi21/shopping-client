import {faker} from '@faker-js/faker'

const products = [
    {
        "name": "Soap",
        "productId": "0d32e6f7-ecf1-4cf9-9ed8-573c1a2e04e7",
        "description": "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
        "price": "86.00",
        "image": "https://loremflickr.com/640/480/animals",
        "condition": "Used"
    },
    {
        "name": "Ball",
        "productId": "bf1fccbc-c763-42fb-9e32-292afe2bcdce",
        "description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
        "price": "871.00",
        "image": "https://loremflickr.com/640/480/business",
        "condition": "Used"
    },
    {
        "name": "Computer",
        "productId": "b04e7bf9-c6c1-4ca5-9a67-c1e5b676a459",
        "description": "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
        "price": "886.00",
        "image": "https://loremflickr.com/640/480/food",
        "condition": "Used"
    },
    {
        "name": "Chips",
        "productId": "3be495a7-f603-4780-b1f3-7cf8695226de",
        "description": "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
        "price": "116.00",
        "image": "https://loremflickr.com/640/480/transport",
        "condition": "Used"
    },
    {
        "name": "Sausages",
        "productId": "de843f0f-3cb8-49e9-b123-c44df8a9c088",
        "description": "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
        "price": "168.00",
        "image": "https://loremflickr.com/640/480/transport",
        "condition": "Used"
    },
    {
        "name": "Table",
        "productId": "73a538ff-1a06-41ed-8ab5-5ada43b2c601",
        "description": "The Football Is Good For Training And Recreational Purposes",
        "price": "358.00",
        "image": "https://loremflickr.com/640/480/sports",
        "condition": "Used"
    },
    {
        "name": "Pizza",
        "productId": "c8192ea3-3183-4afe-8a06-21ea12af3159",
        "description": "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
        "price": "173.00",
        "image": "https://loremflickr.com/640/480/food",
        "condition": "Used"
    },
    {
        "name": "Computer",
        "productId": "c7e0c034-400e-453e-bdee-2115ff667ba5",
        "description": "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
        "price": "871.00",
        "image": "https://loremflickr.com/640/480/business",
        "condition": "Used"
    },
    {
        "name": "Shirt",
        "productId": "95b03abb-c11a-4b02-b117-00c56a9d88b4",
        "description": "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
        "price": "423.00",
        "image": "https://loremflickr.com/640/480/nightlife",
        "condition": "Used"
    },
    {
        "name": "Hat",
        "productId": "4ea53299-f62f-4ed8-a952-d125eb706d17",
        "description": "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
        "price": "234.00",
        "image": "https://loremflickr.com/640/480/abstract",
        "condition": "Used"
    },
    {
        "name": "Chicken",
        "productId": "5fc34b4e-aa7c-4a35-9375-ece3d9931310",
        "description": "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
        "price": "668.00",
        "image": "https://loremflickr.com/640/480/technics",
        "condition": "Used"
    },
    {
        "name": "Ball",
        "productId": "998aa84d-4b71-4805-bddf-ad447c5c0f47",
        "description": "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
        "price": "861.00",
        "image": "https://loremflickr.com/640/480/city",
        "condition": "Used"
    },
    {
        "name": "Sausages",
        "productId": "0ad048cf-0b52-42d3-ab30-74c32097f15b",
        "description": "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
        "price": "170.00",
        "image": "https://loremflickr.com/640/480/transport",
        "condition": "Used"
    },
    {
        "name": "Shoes",
        "productId": "0fded5af-76ca-4710-a4a9-4ddf0c206329",
        "description": "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
        "price": "605.00",
        "image": "https://loremflickr.com/640/480/technics",
        "condition": "Used"
    },
    {
        "name": "Pants",
        "productId": "72568041-a97f-4635-843f-9bf6d3c724d3",
        "description": "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
        "price": "787.00",
        "image": "https://loremflickr.com/640/480/business",
        "condition": "Used"
    },
    {
        "name": "Car",
        "productId": "aa549a08-cf1d-4b42-b503-bb889499285b",
        "description": "The Football Is Good For Training And Recreational Purposes",
        "price": "95.00",
        "image": "https://loremflickr.com/640/480/food",
        "condition": "Used"
    },
    {
        "name": "Chair",
        "productId": "1e01eeb5-4939-48d9-84b9-f52510fd49f1",
        "description": "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
        "price": "881.00",
        "image": "https://loremflickr.com/640/480/people",
        "condition": "Used"
    },
    {
        "name": "Sausages",
        "productId": "416a85eb-f239-40be-8148-29d6647f2d76",
        "description": "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
        "price": "855.00",
        "image": "https://loremflickr.com/640/480/sports",
        "condition": "Used"
    },
    {
        "name": "Tuna",
        "productId": "1592b179-1618-4ef7-8801-2c5bb839af8e",
        "description": "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
        "price": "203.00",
        "image": "https://loremflickr.com/640/480/food",
        "condition": "Used"
    },
    {
        "name": "Tuna",
        "productId": "70dbdf06-9bb5-49ae-9938-25e3af06672c",
        "description": "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
        "price": "920.00",
        "image": "https://loremflickr.com/640/480/food",
        "condition": "Used"
    },  {
        "name": "Tuna",
        "productId": "1592b19-1618-4ef7-8801-2c5bb839af8e",
        "description": "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
        "price": "201.00",
        "image": "https://loremflickr.com/640/480/food",
        "condition": "Used"
    },
      {
        "name": "Tuna",
        "productId": "1592b179-168-4ef7-8801-2c5bb839af8e",
        "description": "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
        "price": "103.00",
        "image": "https://loremflickr.com/640/480/food",
        "condition": "Used"
    },
      {
        "name": "Tuna",
        "productId": "1592b179-1618-4ef7-8801-2c5b839af8e",
        "description": "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
        "price": "1003.00",
        "image": "https://loremflickr.com/640/480/food",
        "condition": "Used"
    },
];

function createRandomUser() {
  return {
    name: faker.commerce.product(),
    productId: faker.datatype.uuid(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    image: faker.image.image(),
    condition: "Used" || "New",
  };
}

Array.from({ length: 5 }).forEach(() => {
  products.push(createRandomUser());
});

export default products

