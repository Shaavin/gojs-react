import { faker } from "@faker-js/faker";
import { NUM_PEOPLE } from "./constants";
import { GenderOptions, Person } from "./types";
import { buildRelationships } from "./mock.relationships";

export function generatePerson(
  id: number,
  ageRange: { min: number; max: number }
): Person {
  const birthdate = faker.date.birthdate({ mode: "age", ...ageRange });
  const gender = GenderOptions[faker.number.int({ min: 0, max: 2 })];
  return {
    id,
    birthdate,
    deathdate: faker.date.future({
      refDate: birthdate,
      years: faker.number.int({ min: 1, max: 30 }),
    }),
    gender,
    name: `${faker.person.firstName(
      gender === "other" ? undefined : gender
    )} ${faker.person.lastName(gender === "other" ? undefined : gender)}`,
    relationships: buildRelationships(id),
    status: ["king", "queen", "prince", "princess", "civilian"][
      faker.number.int({ min: 0, max: 4 })
    ],
  };
}

export function generateChild(id: number): Person {
  return generatePerson(id, { min: 1, max: 17 });
}

export function generateAdult(id: number): Person {
  return generatePerson(id, { min: 18, max: 65 });
}

export function generatePeople(): Person[] {
  return Array.from({ length: NUM_PEOPLE }, (_, i) =>
    i < NUM_PEOPLE / 2 ? generateChild(i) : generateAdult(i)
  );
}
