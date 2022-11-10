// const { response } = require('express');
const request = require('supertest');
const express = require('express');

const server = 'http://localhost:8080/';

// Test following routes

// ---- DB ---- //
//// GET
describe('Receive proper responses from the DB ', () => {
  describe('/GET', () => {
    it('Responds with 200 when accessing user\'s account', async () => {
      const res = await request(server).get('/db/user/h123')
      expect(res.status).toEqual(200);
    })
    it('Responds with 200 when accessing user\'s team', async () => {
      const res = await request(server).get('/db/teaminfo/l7pwxqj1tb9kp3vpljy1ci')
      expect(res.status).toEqual(200);
    })
  });
  describe('/POST', () => {
    it('User should be able to login with proper credentials', () => {
      request(server)
        .post('db/login')
        .send({ username: 'h123', password: '123' })
        .expect(200)
        .expect(true)
    })
    it('People who have incorrect credentials can\'t log in', async () => {
      const res = await request(server).post('/db/login').send({ username: 'h123', password: 'ClearlyIncorrect' });
      expect(res.error)
      expect(res.status).toEqual(400);
    })
    it('No username should return an error', () => {
      return request(server)
      .post('db/login')
      .send({ username: '', password: '123'})
      .then((res) => {
        expect(res.error)
        expect(res.status).toEqual(400)
      });
    })
    it('No password should return an error', async () => {
      const res = await request(server).post('/db/login').send({ username: 'h123', password: ''});
      expect(res.error)
      expect(res.status).toEqual(400)
    })
    // '/team'

    // '/addActivity'
  })
})
//// POST

//// PUT

//// DELETE

// ---- API ---- //
//// GET
  // Participant size