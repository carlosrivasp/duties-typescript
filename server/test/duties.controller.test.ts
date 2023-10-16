import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Request, Response } from "express";
import { Duty } from 'rest/controllers/duties.controller';
import * as dutiesRequest from './duties.requests.data';

describe('Tests for the API', () => {

  let client: AxiosInstance;

  beforeAll(async () => {
    client = axios.create({
      baseURL: 'http://localhost:4000',
      timeout: 60000
    })
  })

    it('Should return duty list', async () => {
      const response = await dutiesRequest.getDutiesRequest(axios)
      expect(response.status).toEqual(200)

      const duties: Duty[] = response.data
      expect(duties).toBeDefined()
    });

    it('Should create a new duty', async () => {
      const response = await dutiesRequest.createDutyRequest(axios, { name: 'New duty' })  
      expect(response.status).toEqual(200)
      expect(response.data).toBeDefined()
    })

    it('Should get an specific duty', async () => {
      const response = await dutiesRequest.getDutyRequest(axios, '35')
      expect(response.status).toEqual(200)
      const duty: Duty = response.data
      expect(duty).toBeDefined()
    })
  });