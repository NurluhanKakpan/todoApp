import axios from 'axios';
import './App.scss';
import React from 'react'
function App() {
const [description,setDescription] = React.useState('')
const [selectItem,setSelectItem] = React.useState('personal')
const [selectDate,setSelectDate] = React.useState('')
const [activeIndex,setActiveIndex] =React.useState(0) 
const [todos,setTodos] = React.useState([])

const items = [
  {
    name:'All', imgUrl: './img/upcoming.png'
  },
]



const currentDate1 = new Date(selectDate);
const today = new Date()
console.log(currentDate1.toDateString());
console.log(today.toDateString());

function isToday(date){

if (
  
 date.toDateString().substring(8) === today.toDateString().substring(8) ) {
  return true;
}

return false;
}
function isTomorrow(date) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (tomorrow.toDateString() === date.toDateString() ) {
    return true;
  }

  return false;
}

let category;
if(isToday(currentDate1)){
  category = 1
}  
if(isTomorrow(currentDate1)){
  category = 2
}
else{
  category = 0
}

const onSubmit = async () =>( 
  description.length === 0 || selectDate.length === 0 ? 
  alert("You cannot create") : 
  setTodos([{
    description,
    selectItem,
    selectDate,
  },...todos]),
  await
  axios.post('https://642aa98400dfa3b5474b6324.mockapi.io/tasks', 
  {
    description,
    selectItem,
    selectDate,
    category,
    
  }),
 
  setDescription(''),
  setSelectDate(''),
  setSelectItem('personal')
)

const removeFromTodo = async (id) =>  {
 await  axios.delete(`https://642aa98400dfa3b5474b6324.mockapi.io/tasks/${id}`)
  setTodos((prev) =>prev.filter((item) =>item.id!==id))
}

React.useEffect( () =>{
  axios.get(`https://642aa98400dfa3b5474b6324.mockapi.io/task`).then((res) =>setTodos(res.data))
},[])
  return (
    <div className="wrapper">
      <div className='menu'>
          <div className='menu-header' >
            <h2>Menu</h2>
            <div className='search' >
              <img src='./img/search.png' alt='search' width={30} height={30} className='search-icon' />
            <input placeholder='search' type='search'/>
            <img src='./img/trash.png' alt='trash' width={30} height={30} className='trash-icon' />
            </div>
            <div className='tasks'>
              <h3>Tasks</h3>
              {items.map((obj,index) =>(
                  <div key={index} onClick={() =>setActiveIndex(index)} className='listtask' style={{backgroundColor: activeIndex === index ? 'white' : ''    }}  >
                  <img src={obj.imgUrl} alt={obj.name} width={20} height={20}/>
                  <h3>{obj.name}</h3>
                </div>
              ))}
              
            </div>
            <hr/>
            <div className='lists' >
              <h3> Lists </h3>
              <div className='list-items'>
              <div className='list-name' >
                <div className='color' style={{backgroundColor:'red'}}></div>
                <h3>Personal</h3>
              </div>
              </div>
              <div className='list-items'>
              <div className='list-name' >
                <div className='color'style={{backgroundColor:'green'}} ></div>
                <h3>Work</h3>
              </div>
              </div>
              <div className='list-items'>
              <div className='list-name' >
                <div className='color' style={{backgroundColor:'yellow'}} ></div>
                <h3>Other</h3>
              </div>
              </div>
            </div>

          </div>
      </div>
      <div className='todolists'>
        {
          todos.map((obj) =>(
            <div className='todo-items' >
             <h4 className='title'>{obj.description}</h4>
             <div className='todo-date'>
              <img src='./img/calendar.png' alt='schedule' width={30} height={30} />
              <h3>{obj.selectDate}</h3>
              
              </div>     
              <div className={obj.selectItem} ></div>
              <h3 className='selectItem'>{obj.selectItem}</h3>
              <button onClick={() => removeFromTodo(obj.id)} >Delete</button>
        </div>
          ))
        }
      </div>
     <div className='createtask' >
      <h2>Task:</h2>
      <div className='desc'>
      <textarea placeholder='description' value={description} onChange={(event) =>setDescription(event.target.value)}  />
      {description && <img src='./img/trash.png' alt='trash' width={30} height={30} className='trash-icon' onClick={() => setDescription('')} />}
      </div>
      <div className='chslist' >
            <h3>List:</h3>
            <div className='select'>
            <select value={selectItem} onChange={(event) => setSelectItem(event.target.value) } >
            <option value="personal">personal</option>
            <option  value="work">work</option>
            <option value="other">other</option>
            </select>
            </div>
      </div>
      <div className='chsdate' >
        <h3>Date :</h3>
        <input type='date' value={selectDate} onChange={(event) => setSelectDate(event.target.value)} />
      </div>
      <button onClick={() =>onSubmit()}> Create Task </button>
     </div>
    </div>
  );
}

export default App;
