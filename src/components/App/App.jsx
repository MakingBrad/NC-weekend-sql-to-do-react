
import axios from 'axios';
import { useEffect, useState } from 'react';


function App() {
  //I need to pull in the various state management variables/functions for react
  const [todoList, setTodoList] = useState([]);

  // const [newCreatureName, setNewCreatureName] = useState('');
  // const [newCreatureOrigin, setNewCreatureOrigin] = useState('');
  //I think with "useState([])" I am saying something like 'an empty array/function'?
  // a getter and a setter - todolist is the 'getter' and the setTodoList is the 'setter'...
  //below this is the get request from lecture (that I will adjust as I am working)
  //const [creatureList, setCreatureList] = useState([]);

  //I think that useEffect is saying something like, "hey React - when you use the function "fetchCreatures" make sure 
  //make the useEffects function a part of that" - its like a "nested function"...FetchCreatures is being called with 
  //all the tools that React makes available when useEffects is acting on a function
  useEffect(() => {
    fetchTodos();
    console.log("your mama")
  }, [])

  // Get the creatures data from the server and store it in
  // our creatureList React state:
  const fetchTodos = () => {
    axios({
      method: 'GET',
      url: '/api/todo'
      //the '/api/todo' is called out in server.js "express routes", so I put it in the line above
    })
      .then((response) => {
        console.log(response);
        console.log('response.data is:', response.data);

        // Store data (what was 'the creatures' but is now 'tasks') in array in React state:
        //I am commenting it out for now Th oct 10-2:30pm - make it active after you know the call is coming through
        setTodoList(response.data);
      })
      .catch((error) => {
        console.log('Error on get:', error);
      });
  }

  const [newTaskStatus, setNewTaskStatus] = useState(true);
  const [newTaskDescription, setNewTaskDescription] = useState('');

  

  const addNewTask = (event) => {
    event.preventDefault
    const newTask = {
      activetaskstatus: newTaskStatus,
      description: newTaskDescription
    }
    console.log("New task looks like this, before it is axiosed to the DB", newTask)

    axios.post('/api/todo', newTask )
      // newTodo here... the 'packaging of the object' how should I package and then post?

      .then((response) => {
        console.log('Post/addTask Response is:', response)
        // Call fetchCreatures to bring our React app's state back
        // "in sync" with the underlying creatures table:
        fetchTodos();
      })
      .catch((error) => {
        console.log('Error on add:', error);
      });
  }

  const changeStatus = (task) => {
    console.log('testing task', task)
    //put route goes here
   
      axios.put(`/api/todo/${task.id}`)
      .then((response) => {
     console.log (response);
     fetchTodos()
      })
      .catch(function(error){
        console.log(error);
      })
    }

  



  return (
    <div>
      <h1>TO DO APP</h1>
      <h2>Add Task</h2>
      {/* the form for adding a task goes here */}
      {/* <form onSubmit={addNewTask}> */}
        <label htmlFor="desc">Task Description</label>
        <input type="text" id="desc" onChange={(event) => setNewTaskDescription(event.target.value)} />
        <p>{JSON.stringify(newTaskDescription)}</p>
        <label htmlFor="status">Still needs to be done?</label>
        {/* <input type="boolean" id="status" onChange={ (event) => setNewTaskStatus(event.target.value)}/> */}
        {/* <input type="checkbox" id="status" onChange={ (event) => setNewTaskStatus(event.target.value)}/> */}
        <input type="checkbox" id="status" checked={newTaskStatus} onChange={(event) => setNewTaskStatus(event.target.checked)} />
        <p>{JSON.stringify(newTaskStatus)}</p>
        <button onClick={addNewTask}>Add New Task</button>
      {/* </form> */}

      <h2>All Tasks</h2>

      {/* Carlos explained the following to me: the for loop from long ago was written "for task of tasks" - in a function.map, we will write this differently but the same
  basic thing going on... I am getting 'todoList' from the database...  */}
      {/* When using a map function (which may be REact or JS, doesn't matter... (But its JS FYI) they both have this function) it is good to ALWAYS
  use a singular object name, not plural... However, because the variable in the parentheses ---> todoList.map((here) ==>) can be 
  anything - it is a block scope variable like "index" from a while back... you are allowed to call it anything you want... including
  bullshits, but you should only call it bullshit... <chuckle> */}
      <ul>
        {
          todoList.map((task) => (
            <li key={task.id}>
              {task.id} - {JSON.stringify(task.activetaskstatus)} --- {task.description}
              <button onClick={() => changeStatus(task)}>Completed</button>
            </li>
            // I think the button for changing the CSS styling should go here... not sure how to manage that.
          ))
        }
      </ul>



    </div>
  );

}

export default App
