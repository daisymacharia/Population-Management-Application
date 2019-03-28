## Population Management System

Population management system is a system that contains a list of locations and the total number of residents in each location.

### Development

This application was developed using the following:

- NodeJs
- Express
- Mongodb

### Tools and Modules Required

The following are required to enable you run this locally

- [NodeJs](https://nodejs.org/en) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- Express - fast node.js network app framework
- [Mongodb](https://docs.mongodb.com/)- A NoSQL database
- [Postman](https://www.getpostman.com/) - To test APi's

### Features!

- Creation of locations and sublocations
- A user is able to fetch locations and sublocations
- Locations and sublocations can be updated or deleted
- Calculation of total population

### Installation

---

```sh
$ git clone https://github.com/daisymacharia/Population-Management-Application.git
$ cd Population-Management-Application
```

- create a .env file example below

```
DB_URL = mongodb://localhost:27017/dev_population_mgt
TEST_DATABASE_URL = mongodb://localhost:27017/test_population_mgt
```

- run `yarn install`

- run `yarn run dev`

- run `yarn run test` to test

### Endpoints

| EndPoint                                    | Functionality                                      |
| ------------------------------------------- | -------------------------------------------------- |
| POST /api/location/                         | Create a new location.                             |
| GET /api/location                           | Get all locations.                                 |
| GET /api/location/:locationId               | Get a single location                              |
| PUT /api/location/:locationId               | Update a location                                  |
| DELETE /api/location/:locationId            | Delete a specific location                         |
| POST /api/location/:locationId/sub          | Create a new sub location.                         |
| GET /api/location/:locationId/sub           | Get all sub locations for a given parent location. |
| GET /api/location/:locationId/sub/:subId    | Get a single sub location                          |
| PUT /api/location/:locationId/sub/:subId    | Updates a single sub location                      |
| DELETE /api/location/:locationId/sub/:subId | Delete a specific location                         |
