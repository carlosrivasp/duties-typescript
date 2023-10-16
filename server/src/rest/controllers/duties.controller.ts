import { Handler, Request, Response } from "express";
import { pool } from "../../db";
import * as dutiesDb from "../../repository/duties.db"

export interface Duty {
  id: string;
  name: string;
}

export interface DutyInput {
  name: string;
}

export async function getDutiesController(req: Request, res: Response) {
  const result: Duty[] = await dutiesDb.getDuties()
  res.status(200).json(result)
}

export async function getDutyController(req: Request, res: Response) {
  const id: string = req.params.id;
  const duty: Duty = await dutiesDb.getDuty(id)
  res.status(200).json(duty)
}

export async function createDutyController(req: Request, res: Response) {
  const duty: DutyInput = req.body;
  const createdDutyID: string = await dutiesDb.createDuty(duty.name)
  res.status(200).json(createdDutyID)
}

export async function updateDutyController(req: Request, res: Response) {
  const id: string = req.params.id;
  const duty: DutyInput = req.body;
  const updatedDuty: string = await dutiesDb.updateDuty(id, duty.name)
  res.status(200).json(updatedDuty)
}

export async function deleteDutyController(req: Request, res: Response) {
  const id: string = req.params.id;
  await dutiesDb.deleteDuty(id)
  res.status(200).json()
}