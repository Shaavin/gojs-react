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
import shuffleAndTakeN from "../utils/shuffleAndTakeN";

export function generateRandomRelationship(): Relationship {
  return {
    status:
      Object.values(RelationshipStatus)[
        faker.number.int({
          min: 0,
          max: Object.values(RelationshipStatus).length - 1,
        })
      ],
    strength: faker.number.int({ min: 1, max: 100 }),
    types: shuffleAndTakeN(
      RelationshipTypeOptions as unknown as RelationshipType[],
      {
        min: 1,
        max: MAX_INTERPERSONAL_RELATIONSHIP_TYPES,
      }
    ),
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
  const sampleRelatedPeople = shuffleAndTakeN(otherPeople, numRelationships);

  return new Map(
    sampleRelatedPeople.map((id: number) => [id, generateRandomRelationship()])
  );
}
