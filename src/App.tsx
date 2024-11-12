import { generatePeople } from "./data/mock.people";
import { buildRelationships } from "./data/mock.relationships";
import Genogram from "./Genogram/Genogram";

/** Generate sample people & associate them */
const people = generatePeople();
people.forEach((person) => buildRelationships(person.id));

export default function App() {
  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>Go.js Genogram Example</h1>
      <Genogram people={people} primaryClient={people[0]} />
    </div>
  );
}
