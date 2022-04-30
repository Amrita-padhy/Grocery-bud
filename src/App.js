import React, { useState,useEffect } from 'react';
import './App.css';
import Alert from './alert';
import List from './list';
const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("")
  const [list, setList] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: ""
  })


  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("hi");
    if (!name) {
      // display alert
      //   setAlert({
      //     show:true,
      // message:"TODO saved succefully",
      // type:"success"
      //   })
      showAlert(true, "danger", "please enter value")
    }
    else if (name && isEditing) {
      // deal with edit
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditId(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value changed');
    }
    else {
      // show alert
      showAlert(true, "success", "Item added to the list")
      const newItem = { id: new Date().getTime().toString(), title: name }
      setList([...list, newItem]);
      setName("")

    }

  }

  const showAlert = (show = false, type = "", message = "") => {
    setAlert({ show: show, type, message })
  }

  // clear list function
  const clearList = () => {
    showAlert(true,"danger","empty list")
    setList([]);
  }
  const deleteHandler = (id) => {
    showAlert(true,"danger","item removerd")
    setList(list.filter((item) => item.id !==id))
    console.log("hi");
    // console.log(todo);
}
  
const editItem = (id) => {
  const specificItem = list.find((item) => item.id === id);
  console.log("hi");
  setIsEditing(true);
  setEditId(id);
  setName(specificItem.title);
};

useEffect(() => {
  localStorage.setItem('list', JSON.stringify(list));
}, [list]);
  return (
    <div className="App">
      <section className='section-center'>
        <form className='grocery-form' onSubmit={submitHandler}>
          {alert.show && <Alert {...alert} removeAlert={showAlert} />}
          <h3>grocery bud</h3>
          <div className="form-control">
            <input onChange={(e) => setName(e.target.value)} type="text" className='grocery' placeholder='e.g-eggs' value={name} />
            <button type='submit' className='submit-btn'>{isEditing ? "edit" : "submit"}</button>

          </div>
        </form>
        <div className="grocery-container">
          <List items={list}
            list={list}
            setList={setList}
            editId={editId}
            setEditId={setEditId}
            showAlert={showAlert}
            deleteHandler={deleteHandler}
            editItem={editItem}
          />
          <button  onClick={clearList} nclassName='clear-btn'>clear items</button>
        </div>
      </section>

    </div>
  );
}

export default App;
