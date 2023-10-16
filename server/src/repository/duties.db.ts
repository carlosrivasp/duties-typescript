import { QueryResult } from "pg";
import { pool } from "../db";
import { Duty } from '../rest/controllers/duties.controller'

export async function getDuties(): Promise<Duty[]> {
  try {
     const allDuties: QueryResult<Duty> = await pool.query("SELECT * FROM duties");
     return allDuties.rows
  } catch (error: any) {
    throw new Error(error)
  }
 }

 export async function getDuty(id: string): Promise<Duty> {
  try {
    const queryResult: QueryResult<Duty> = await pool.query("SELECT * FROM duties WHERE id = $1", [id]);
    const dutiesFound: number = queryResult.rowCount

    if (dutiesFound > 1) {
      throw new Error(`More than one duty found ${queryResult.rowCount}`)
    } else if (dutiesFound === 0) {
      throw new Error(`No duty found for id ${id}`)
    }

    return queryResult.rows[0]
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function createDuty(name: string): Promise<string> {
  try {
    const createdDutyID: QueryResult = await pool.query("INSERT INTO duties (name) VALUES ($1) RETURNING id",[name]);
    return createdDutyID.rows[0].id
  } catch (error:any) {
    throw new Error(error)
  }  
}

export async function updateDuty(id: string, name: string): Promise<string> {
  try {
    const updatedDuty: QueryResult = await pool.query("UPDATE duties SET name = $1 WHERE id = $2 RETURNING id",[name, id]);
    return updatedDuty.rows[0].id
  } catch (error:any) {
    throw new Error(error)
  }
}

export async function deleteDuty(id: string): Promise<void> {
  try {
    await pool.query("DELETE FROM duties WHERE id = $1", [id]);
  } catch (error: any) {
    throw new Error(error)
  }
}