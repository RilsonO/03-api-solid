import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to gym', async () => {
    const { gym } = await sut.execute({
      title: 'Javascript Gym',
      description: null,
      phone: null,
      latitude: -16.727083684756867,
      longitude: -43.86792408117556,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
