import React, { useState } from "react";

const DisplayNumbers = ({ persons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map(x => (
          <li key={x.name}>
            {x.name} {x.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Filter = ({ filter, filterChanged }) => {
  return (
    <form>
      <div>
        filter shown with:{""}
        <input
          value={filter}
          onChange={event => filterChanged(event.target.value)}
        />
      </div>
    </form>
  );
};

const PersonForm = ({newName, setNewName, newPhone, setNewPhone, addToPersons}) => {
  return (
    <form>
      <div>
        <StateInput name="name" state={newName} changeState={setNewName}/>
        <StateInput name="phone" state={newPhone} changeState={setNewPhone}/>
      </div>
      <div>
        <button type="submit" onClick={event => addToPersons(event)}>
          add
        </button>
      </div>
    </form>
  );
};

const StateInput = ({name, state, changeState}) => {
  return (
    <div>
    {name} :{""}
    <input
      value={state}
      onChange={event => changeState(event.target.value)}
    />
  </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: "Arto Hellas",
      phone: "040-1234567"
    },
    {
      name: "Ben Swanson",
      phone: "040-1234567"
    }
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

  const addToPersons = event => {
    event.preventDefault();
    if (isUnique(newName)) {
      const newPerson = { name: newName, phone: newPhone }
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewPhone("");
    } else {
      window.alert(`${newName} already exists in phonebook`);
    }
  };

  const getFiltered = value => {
    const regexp = new RegExp(`.*${value}.*`, "i");
    console.log(`current`, persons, filter)
    return persons.filter(x => x.name.match(regexp))
  }

  const isUnique = name =>
    persons.find(person => person.name === name) === undefined;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterChanged={setFilter} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} setNewName={setNewName} newPhone={newPhone} setNewPhone={setNewPhone} addToPersons={addToPersons}/>
      <DisplayNumbers persons={getFiltered(filter)} />
    </div>
  );
};
export default App;
