import { generatePeople } from "./data/mock.people";
import { buildRelationships } from "./data/mock.relationships";
import Genogram from "./Genogram/Genogram";

/** Generate sample people & associate them */
const people = generatePeople();
people.forEach((person) => buildRelationships(person.id));

export default function App() {
  return (
    <div>
      <h1 style={{ marginBottom: -8 }}>Go.js Genogram Example</h1>
      <p style={{ marginBottom: 24 }}>
        Red → client, blue → male, green → female, purple → other
      </p>
      <Genogram people={people} primaryClient={people[0]} />
    </div>
  );
}
