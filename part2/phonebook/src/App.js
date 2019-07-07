import React, { useState, useEffect } from "react";
import phoneService from "./services/phones";

const deleteAction = (id, setPersons, persons, displayMessage, displayError) => event => {
  event.preventDefault();
  const deleteCandidate = get(id, persons);
  if (
    window.confirm(`Im about to delete ${deleteCandidate.name}, are you sure?`)
  ) {
    phoneService.deletePhone(id)
    .then(_ => {
      setPersons(persons.filter(x => x.id !== id));
      displayMessage(`${deleteCandidate.name} was deleted succesfully!`)
    })
    .catch(_ => {
      displayError(`Failed to delete ${deleteCandidate.name}. Already deleted?`)
      setPersons(persons.filter(x => x.id !== id));
    });
  }
};

const DisplayMessage = ({text, stylingClass}) => {
  if (text === null) {
    return null
  } else {
    return (
      <div className={stylingClass}>
        <em>{text}</em>
      </div>
    )
  }
}

const DisplayNumbers = ({ persons, setPersons, personsFiltered, displayMessage, displayError }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {personsFiltered.map(x => (
          <li key={x.name}>
            {x.name} {x.phone}{" "}
            <button onClick={deleteAction(x.id, setPersons, persons, displayMessage, displayError)}>
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
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

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
        temporaryDisplay(setMessage)(`${newPerson.name} was added to the phonebook!`)
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
            temporaryDisplay(setMessage)(`${newPerson.name} phone was updated to ${newPerson.phone}`)
          }
          )
          .catch(_ => {
            temporaryDisplay(setError)(`${newPerson.name} phone was deleted from server`)
          })
      }
    }
  };

  const temporaryDisplay =  setter => text => {
    setter(text)
    setTimeout(() => {
      setter(null)
    }, 3000)
  }

  const getFiltered = value => {
    const regexp = new RegExp(`.*${value}.*`, "i");
    return persons.filter(x => x.name.match(regexp));
  };

  const isUnique = name => getPerson(name) === undefined;

  const getPerson = name => persons.find(person => person.name === name)

  return (
    <div>
      <h2>Phonebook</h2>
      <DisplayMessage text={error} stylingClass='error'/>
      <DisplayMessage text={message} stylingClass='message'/>
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
        displayMessage={temporaryDisplay(setMessage)}
        displayError={temporaryDisplay(setError)}
      />
    </div>
  );
};
export default App;
