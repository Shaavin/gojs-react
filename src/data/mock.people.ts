import { faker } from "@faker-js/faker";
import { NUM_PEOPLE } from "./constants";
import { Person } from "./types";
import { buildRelationships } from "./mock.relationships";

export function generatePerson(
  id: number,
  ageRange: { min: number; max: number }
): Person {
  return {
    id,
    birthdate: faker.date.birthdate({ mode: "age", ...ageRange }),
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    relationships: buildRelationships(id),
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
