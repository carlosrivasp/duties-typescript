import { createDuty, deleteDuty, getDuties, getDuty, updateDuty } from "../src/repository/duties.db";
import { Duty } from "rest/controllers/duties.controller";

describe('Test duties paths', ()=>{
    it("Should get duties list adding two new entries", async () => {
      const receivedDutiesBeforeCreation: Duty[] = await getDuties();
      const lengthBeforeCreation: number =
        receivedDutiesBeforeCreation.length;

      const firstDutyId: string = await createDuty("First duty");
      await createDuty("Second duty");

      const receivedDutiesAfterCreation: Duty[] = await getDuties();
      const lengthAfterCreation: number = receivedDutiesAfterCreation.length;

      expect(lengthAfterCreation).toBeGreaterThan(lengthBeforeCreation)
      expect(lengthAfterCreation).toEqual(lengthBeforeCreation + 2)

      const newDutyDoesNotExistsBeforeCreationBoolean: boolean = receivedDutiesBeforeCreation.some((el: Duty) => el.id === firstDutyId)
      expect(newDutyDoesNotExistsBeforeCreationBoolean).toBe(false)

      const newDutyDoesExistsAfterCreation: Duty | undefined = receivedDutiesAfterCreation.find((el: Duty) => el.id === firstDutyId)
      expect(newDutyDoesExistsAfterCreation).toBeDefined()
      expect(newDutyDoesExistsAfterCreation!.name).toBe('First duty')
  });
  it("Should get duties list, adding, updating and deleting a duty", async () => {
      const receivedDutiesBeforeCreation: Duty[] = await getDuties();
      const lengthBeforeCreation: number =
        receivedDutiesBeforeCreation.length;

      const firstDutyId: string = await createDuty("Duty 1");

      const receivedDutiesAfterCreation: Duty[] = await getDuties();
      const lengthAfterCreation: number = receivedDutiesAfterCreation.length;

      expect(lengthAfterCreation).toBeGreaterThan(lengthBeforeCreation)
      expect(lengthAfterCreation).toEqual(lengthBeforeCreation + 1)

      const newDutyDoesNotExistsBeforeCreationBoolean: boolean = receivedDutiesBeforeCreation.some((el: Duty) => el.id === firstDutyId)
      expect(newDutyDoesNotExistsBeforeCreationBoolean).toBe(false)

      const newDutyDoesExistsAfterCreation: Duty | undefined = receivedDutiesAfterCreation.find((el: Duty) => el.id === firstDutyId)
      expect(newDutyDoesExistsAfterCreation).toBeDefined()
      expect(newDutyDoesExistsAfterCreation!.name).toBe('Duty 1')

      const newNameDuty: string = "Duty Updated"
      await updateDuty(firstDutyId, newNameDuty)

      const updatedDuty: Duty = await getDuty(firstDutyId)
      expect(updatedDuty.name).toEqual(newNameDuty)

      await deleteDuty(firstDutyId)

      const receivedDutiesAfterDelete: Duty[] = await getDuties();
      const lengthAfterDelete: number = receivedDutiesAfterDelete.length;

      expect(lengthBeforeCreation).toEqual(lengthAfterDelete)
  });
});