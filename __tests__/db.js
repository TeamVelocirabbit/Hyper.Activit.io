//require TeamModel and UserModel from server/db/mongo
const Team = require('../server/db/mongo/TeamModel.js');
const User = require('../server/db/mongo/UserModel.js');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const path = require('path');
const { useResolvedPath } = require('react-router');

require("dotenv").config({
  path: path.resolve(__dirname, "../process.env"),
});
const MONGOURI = process.env.MONGOURI;

/***************************
------Database Testing------
*Preset mongodb testing with jest*
npm install @shelf/jest-mongodb --save-dev
*Make sure to create your jest-mongodb-config.js

DB Structure:
Users:
{
  user_id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  teams: {type: Object, required: true},
}

Users:
[]  Check base properties: data types/length
[]  user_ids expected to be unique - This may fail at some point. TDD example?
[]  Expects DB to increment with entry
[]  C - Creates a user and stores in DB
[]  R - Reads the users that we have in our db
[🦘]  U - We don't have this feature, testing success![]
[] D - Removes and shows no instance of what we removed

Teams:
{
  team_id: { type: String, required: true },
  teamName: { type: String, required: true },
  teamMembers: { type: Array, required: true },
  posts: {
    post_id: { type: Array, required: true },
  },
  teamActivities: [
    {
      activity: { type: String, required: true },
      type: {type: String, required: true },
      price: { type: Number, required: true },
      participants: { type: Number, required: true },
    },
  ]
}

Teams:
[🦘]  Posts - No existence no problem
[]  Check base properties: data types/length
[]  C - Creates a team and stores in DB
[]  R - Reads the teams that we have in our db
[🦘]  U - We don't have this feature, testing success![]
[] D - Removes and shows no instance of what we removed
Team activites:
  [] Check base properties: data types/length
  [] Should increment when adding activities
  [] Should not affect previous instances of activities
  [] Should be able to read activities added in
  [] Should be able to delete and see length decrement

****************************/

// Set up mock DB file or mock DB
// Start clean and clean up after with refreshing/resetting our mock testing DB

// Functionalities needed
// Create
// Read
// Delete


// describe('Team Model Test', () => {

//   beforeAll(async () => {
//     await mongoose.connect(global.__MONGO_URI__, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
//       if (err) {
//         console.error(err);
//         process.exit(1);
//       }
//     });
//   });

//   const user = {
//     user_id: 'Joe',
//     username: 'JoeBalls99',
//     password: '123',
//     teams: {},
//   }

//   it('Creates a user and stores in DB', async () => {
//     const newUser = new User(user);
//     const savedUser = await newUser.save();
//     expect(savedUser.user_id).toBeDefined();

//   })
// });

describe('User insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(MONGOURI, {
      useNewUrlParser: true,
    });
    db = await connection.db('ActivitioTestDB');
  });

  // beforeEach(async () => {
  //   const collections = await mongoose.connection.db.collections();
  //   for (let connection of collections) {
  //     await connection.deleteMany({});
  //   }
  // });

  // beforeEach(async () => {
  //   const users = await MongoClient.db.collections();
  //   for (let key in users) { 
  //     await key.deleteMany({});
  //   }
  // })

// afterEach(async () => {
//   await clear();
// })

// afterAll(async () => {
//   await disconnect();
// })

  afterAll(async () => {
    await connection.close();
    if(db.close) {
      await db.close();
    }
  });
  
  it('should insert a user doc into collection', async () => {
    const users = db.collection('User');
    
    // const newUser = User.create(user); // creating new user through User schema
    const mockUser = {
      user_id: 'tessttt32',
      username: 'JoeyBlue934259',
      password: '1233416',
      teams: {},
    }
    await users.insertOne(mockUser);
    
    const insertedUser = await users.findOne({ user_id: mockUser.user_id });
    expect(insertedUser).toEqual(mockUser);
  });

  it('should equal 2', async () => {
    expect(1).toBe(1)
  })
});