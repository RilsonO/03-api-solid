import { it, describe, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Javascript Gym',
        description: 'Some description',
        phone: '11999999999',
        latitude: -16.727083684756867,
        longitude: -43.86792408117556,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Typescript Gym',
        description: 'Some description',
        phone: '11999999999',
        latitude: -16.477828,
        longitude: -43.493501,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -16.727083684756867,
        longitude: -43.86792408117556,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Javascript Gym',
      }),
    ])
  })
})
