import { faker } from "@faker-js/faker";
import {
  PersonRelationships,
  Relationship,
  RelationshipStatus,
  RelationshipType,
  RelationshipTypeOptions,
} from "./types";
import {
  MAX_INTERPERSONAL_RELATIONSHIP_TYPES,
  MAX_PERSONAL_RELATIONSHIPS,
  NUM_PEOPLE,
} from "./constants";
import takeN from "../utils/takeN";

export function generateRandomRelationship(): Relationship {
  return {
    status: takeN(Object.values(RelationshipStatus), 1)[0],
    strength: faker.number.int({ min: 1, max: 100 }),
    types: takeN(RelationshipTypeOptions as unknown as RelationshipType[], {
      min: 1,
      max: MAX_INTERPERSONAL_RELATIONSHIP_TYPES,
    }),
  };
}

export function buildRelationships(id: number): PersonRelationships {
  const otherPeople = Array.from({ length: NUM_PEOPLE })
    .map((_, i) => i)
    .filter((i) => i !== id && i !== 0); // 0 is reserved for the client
  const numRelationships = faker.number.int({
    min: 1,
    max: MAX_PERSONAL_RELATIONSHIPS,
  });
  const sampleRelatedPeople = takeN(otherPeople, numRelationships);

  return new Map(
    sampleRelatedPeople.map((id: number) => [id, generateRandomRelationship()])
  );
}
