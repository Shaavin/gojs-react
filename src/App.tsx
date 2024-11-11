import "./App.css"; // contains .diagram-component CSS
import { generatePeople } from "./data/mock.people";
import { buildRelationships } from "./data/mock.relationships";
import Genogram from "./Genogram/Genogram";

/** Generate people & associate them */
const people = generatePeople();
people.forEach((person) => buildRelationships(person.id));

export default function App() {
  return (
    <div>
      <Genogram people={people} />
    </div>
  );
}
