import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import InputForm from "./components/inputForm/InputForm";
import NoteCard from "./components/noteCard/NoteCard";

function App() {
  const [notes, setNotes] = useState([]);
  const [isReload, setIsReload] = useState(false);
  console.log(notes);
  useEffect(() => {
    fetch("http://localhost:5000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, [isReload]);
  /*
1. here there will be a function named handleSearch
to handle search by query, and it will be passed as props to header
  */
  const handleSearch = (event) => {
    event.preventDefault();
    const queryText = event.target.searchText.value;
    console.log(queryText);
    if (queryText) {
      fetch(`http://localhost:5000/notes?name=${queryText}`)
        .then((res) => res.json())
        .then((data) => setNotes(data));
    }
  };

  /*2. here there will be a function named handleDelete
to delete a note, and it will be passed as props to NoteCard that will be triggered using delete button.
 */
  const handleDelete = (id) => {
    console.log(id);
    const url = `http://localhost:5000/note/${id}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsReload(!isReload);
      });
  };

  /*
3. there will be a function named handleUpdate
    to update data, and it will be passed as props to NoteCard and 
   later it will be passed to Update modal using props.
 */

  /*
4.  there will be a function named handlePost
to post data to backend, and it will be passed as props to InputFrom.
 */
  const handlePost = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };

    // post to the server
    const url = `http://localhost:5000/note`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsReload(!isReload);
      });
  };

  return (
    <div className="App">
      <Header handleSearch={handleSearch} />
      <InputForm handlePost={handlePost} />
      <div className="row row-cols-1 row-cols-md-3 g-4 m-2">
        {notes.map((note) => (
          <NoteCard
            isReload={isReload}
            setIsReload={setIsReload}
            note={note}
            key={note._id}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
