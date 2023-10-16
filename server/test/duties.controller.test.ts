import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Request, Response } from "express";
import { Duty, DutyInput } from 'rest/controllers/duties.controller';

export async function getDutiesRequest(axios: AxiosInstance): Promise<AxiosResponse<Duty[]>> {
  return axios.get('/duty')
}

export async function createDutyRequest(axios: AxiosInstance, duty: DutyInput): Promise<AxiosResponse<string>> {
  return axios.post('/duty', {
    name: duty.name
  })
}

export async function getDutyRequest(axios: AxiosInstance, id: string): Promise<AxiosResponse<Duty>> {
  return axios.get(`/duty/${id}`)
}

export async function updateDutyRequest(axios: AxiosInstance, duty: Duty): Promise<AxiosResponse<string>> {
  return axios.put(`/duty/${duty.id}`, {
    name: duty.name,
  });
}

export async function deleteDutyRequest(axios: AxiosInstance, id: string): Promise<AxiosResponse<string>> {
    return axios.delete(`/duty/${id}`);
  }

describe('Tests for the API', () => {

  let client: AxiosInstance;

  beforeAll(async () => {
    client = axios.create({
      baseURL: 'http://localhost:4000'
    })
  })

    it('Should return duty list', async () => {
      const response = await getDutiesRequest(client)
      expect(response.status).toEqual(200)

      const duties: Duty[] = response.data
      expect(duties).toBeDefined()
    });

    it('Should create a new duty', async () => {
      const response = await createDutyRequest(client, { name: 'New duty' })  
      expect(response.status).toEqual(200)
      expect(response.data).toBeDefined()
    })

    it('Should get an specific duty', async () => {
      const response = await getDutyRequest(client, '115')
      expect(response.status).toEqual(200)
      const duty: Duty = response.data
      expect(duty).toBeDefined()
    })

    it('Should update an specific duty', async () => {
      const response = await updateDutyRequest(client, {id:'116', name:'Update Duty'})
      expect(response.status).toEqual(200)
      const id: string = response.data
      expect(id).toBeDefined()
    })

    it('Should delete an specific duty', async () => {
      const response = await deleteDutyRequest(client,'124')
      expect(response.status).toEqual(200)
    })

  });