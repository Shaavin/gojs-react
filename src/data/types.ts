export enum RelationshipStatus {
  POSITIVE = "POSITIVE",
  NEGATIVE = "NEGATIVE",
}

export const RelationshipTypeOptions = [
  "mother",
  "father",
  "sibling",
  "teacher",
  "coach",
  "friend",
] as const;
export type RelationshipType = (typeof RelationshipTypeOptions)[number];

export interface Relationship {
  status: RelationshipStatus;
  strength: number; // Range from 1 to 100
  types: RelationshipType[];
}

export type PersonRelationships = Map<number, Relationship>;

export interface Person {
  id: number;
  birthdate: Date;
  name: string;
  relationships: PersonRelationships;
}
