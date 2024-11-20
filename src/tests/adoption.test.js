import * as chai from 'chai';
import request from 'supertest';
import app from '../app.js';

const { expect } = chai;

describe('Adoption Router', function () {
  this.timeout(10000); // Incrementa el timeout si es necesario
  let userId;
  let petId;

  before(async () => {
    // Crear un usuario de prueba
    const userResponse = await request(app)
      .post('/api/users')
      .send({
        first_name: 'Test',
        last_name: 'User',
        email: 'test@example.com',
        password: '1234',
      });

    expect(userResponse.status).to.equal(201);
    userId = userResponse.body.payload._id;

    // Crear una mascota de prueba
    const petResponse = await request(app)
      .post('/api/pets')
      .send({
        name: 'Test Pet',
        specie: 'Dog',
        birthDate: '2020-01-01',
      });

    expect(petResponse.status).to.equal(200);
    petId = petResponse.body.payload._id;
  });

  after(async () => {
    // Eliminar todas las adopciones creadas
    const adoptionsResponse = await request(app).get('/api/adoptions');
    const adoptions = adoptionsResponse.body.payload;

    for (const adoption of adoptions) {
      await request(app).delete(`/api/adoptions/${adoption._id}`);
    }

    // Eliminar el usuario de prueba
    if (userId) {
      await request(app).delete(`/api/users/${userId}`);
    }

    // Eliminar la mascota de prueba
    if (petId) {
      await request(app).delete(`/api/pets/${petId}`);
    }
  });

  it('should create an adoption', async () => {
    const response = await request(app)
      .post(`/api/adoptions/${userId}/${petId}`)
      .send();

    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal('success');
    expect(response.body.message).to.equal('Pet adopted');
  });

  it('should get all adoptions', async () => {
    const response = await request(app).get('/api/adoptions');

    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal('success');
    expect(response.body.payload).to.be.an('array');
  });

  it('should get a single adoption by ID', async () => {
    const allAdoptions = await request(app).get('/api/adoptions');
    const adoptionId = allAdoptions.body.payload[0]._id;

    const response = await request(app).get(`/api/adoptions/${adoptionId}`);

    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal('success');
    expect(response.body.payload._id).to.equal(adoptionId);
  });
});
