import express from 'express'
import * as controllers from "../controllers/duties.controller"

export function useDutiesRoutes(app: express.Application) {
  app.get('/duty/:id', controllers.getDutyController)
  app.get('/duty', controllers.getDutiesController)
  // para usar el count en el UI, hacer un duties.length
  app.post('/duty', controllers.createDutyController)
  app.put('/duty/:id', controllers.updateDutyController)
  app.delete('/duty/:id', controllers.deleteDutyController)
}
