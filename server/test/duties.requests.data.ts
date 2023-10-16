import { AxiosInstance, AxiosResponse } from "axios";
import { Duty, DutyInput } from "rest/controllers/duties.controller";

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