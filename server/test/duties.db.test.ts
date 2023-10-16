import { Duty } from "rest/controllers/duties.controller"
import { createDuty, deleteDuty, getDuties, getDuty, updateDuty } from "../src/repository/duties.db"

describe('Duties Repository Test', ()=>{

    describe("Test getDuties", () => {
      it("Should get all duties", async () => {
        const receivedDuties: Duty[] = await getDuties();
        expect(receivedDuties).toBeDefined();
        expect(receivedDuties.length).toBeGreaterThan(0);
      });
    });

    describe("Test getDuty", () => {
      it("Should get just one duty", async () => {
        const newDuty: string = "Test getDuty"
        const createdDutyID: string = await createDuty(newDuty)

        const receivedDuty: Duty = await getDuty(createdDutyID);
        expect(receivedDuty).toBeDefined();
        expect(receivedDuty.name).toEqual(newDuty)
    });
  });

  describe("Test createDuty", () => {
    it("Should create a new duty", async () => {
      const newCreatedDuty: string = "Test createDuty"
      const createdDutyID: string = await createDuty(newCreatedDuty);
      expect(createdDutyID).toBeDefined();

      const receivedDuty: Duty = await getDuty(createdDutyID)
      expect(receivedDuty).toBeDefined()
      expect(receivedDuty.name).toEqual(newCreatedDuty)
    });
  });

  describe("Test updateDuty", () => {
    it("Should update a duty", async () => {
      const newDuty: string = "Test updateDuty";
      const createdDutyID: string = await createDuty(newDuty);
      expect(createdDutyID).toBeDefined();

      const receivedDuty: Duty = await getDuty(createdDutyID);
      const dutyID: string = receivedDuty.id;
      const newNameDuty: string = "Test UPDATED";
      expect(receivedDuty).toBeDefined()

      const updatedDuty: string = await updateDuty(dutyID, newNameDuty);
      const receivedUpdatedDuty: Duty = await getDuty(updatedDuty);

      expect(updatedDuty).toBeDefined()
      expect(updatedDuty).toEqual(dutyID)
      expect(receivedUpdatedDuty.name).toEqual(newNameDuty)
    });
  });
  
  describe("Test deleteDuty", () => {
    it("Should delete just one duty", async () => {
      const newDuty: string = "Test deleteDuty"
      const createdDutyID: string = await createDuty(newDuty)
      expect(createdDutyID).toBeDefined();

      const receivedDutiesBeforeDelete: Duty[] = await getDuties()
      expect(receivedDutiesBeforeDelete).toBeDefined()
      const lengthBeforeDelete: number = receivedDutiesBeforeDelete.length

      await deleteDuty(createdDutyID)

      const receivedDutiesAfterDelete: Duty[] = await getDuties()
      expect(receivedDutiesAfterDelete).toBeDefined()
      const lengthAfterDelete: number = receivedDutiesAfterDelete.length

      expect(lengthBeforeDelete).toBeGreaterThan(lengthAfterDelete)
      expect(lengthBeforeDelete).toEqual(lengthAfterDelete + 1)
    });
  });
})



  
