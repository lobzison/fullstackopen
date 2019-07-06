import React, { useState, useEffect } from "react";
import phoneService from "./services/phones";

const deleteAction = (id, setPersons, persons) => event => {
  event.preventDefault();
  if (
    window.confirm(`Im about to delete ${get(id, persons).name}, are you sure?`)
  ) {
    phoneService.deletePhone(id).then(_ => {
      setPersons(persons.filter(x => x.id !== id));
    });
  }
};

const DisplayNumbers = ({ persons, setPersons, personsFiltered }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {personsFiltered.map(x => (
          <li key={x.name}>
            {x.name} {x.phone}{" "}
            <button onClick={deleteAction(x.id, setPersons, persons)}>
              delete
            </button>
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

const PersonForm = ({
  newName,
  setNewName,
  newPhone,
  setNewPhone,
  addToPersons
}) => {
  return (
    <form>
      <div>
        <StateInput name="name" state={newName} changeState={setNewName} />
        <StateInput name="phone" state={newPhone} changeState={setNewPhone} />
      </div>
      <div>
        <button type="submit" onClick={event => addToPersons(event)}>
          add
        </button>
      </div>
    </form>
  );
};

const StateInput = ({ name, state, changeState }) => {
  return (
    <div>
      {name} :{""}
      <input
        value={state}
        onChange={event => changeState(event.target.value)}
      />
    </div>
  );
};

const get = (id, persons) => {
  const temp = persons.filter(x => x.id === id)[0];
  return temp;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    phoneService.getAll().then(allPhones => {
      setPersons(allPhones);
    });
  }, []);

  const addToPersons = event => {
    event.preventDefault();
    const newPerson = { name: newName, phone: newPhone };
    if (isUnique(newName)) {
      phoneService.createNew(newPerson).then(newEnty => {
        setPersons(persons.concat(newEnty));
        setNewName("");
        setNewPhone("");
      });
    } else {
      // window.alert(`${newName} already exists in phonebook`);
      if (window.confirm(`${newPerson.name} already exists in the phone book. Replace?`)) {
        const oldPerson = getPerson(newName)
        phoneService.update(oldPerson.id, newPerson)
          .then(newEnty => {
            setPersons(persons.filter(x => x.id !== oldPerson.id).concat(newEnty))
            setNewName("");
            setNewPhone("");
          }
          )
      }
    }
  };

  const getFiltered = value => {
    const regexp = new RegExp(`.*${value}.*`, "i");
    return persons.filter(x => x.name.match(regexp));
  };

  const isUnique = name => getPerson(name) === undefined;

  const getPerson = name => persons.find(person => person.name === name)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterChanged={setFilter} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newPhone={newPhone}
        setNewPhone={setNewPhone}
        addToPersons={addToPersons}
      />
      <DisplayNumbers
        personsFiltered={getFiltered(filter)}
        setPersons={setPersons}
        persons={persons}
      />
    </div>
  );
};
export default App;
