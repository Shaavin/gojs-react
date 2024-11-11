export type Gender = (typeof GenderOptions)[number];
export const GenderOptions = ["male", "female", "other"] as const;

export interface Person {
  id: number;
  birthdate: Date;
  deathdate?: Date;
  gender: Gender;
  name: string;
  relationships: PersonRelationships;
  status: string;
}

export type PersonRelationships = Map<number, Relationship>;

export interface Relationship {
  status: RelationshipStatus;
  strength: number; // Range from 1 to 100
  types: RelationshipType[];
}

export enum RelationshipStatus {
  POSITIVE = "POSITIVE",
  NEGATIVE = "NEGATIVE",
}

export type RelationshipType = (typeof RelationshipTypeOptions)[number];
export const RelationshipTypeOptions = [
  "mother",
  "father",
  "sibling",
  "teacher",
  "coach",
  "friend",
] as const;
