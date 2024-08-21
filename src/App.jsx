import './App.css';
import { useState,useEffect } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';


const App = ()=>{
  const [monsters, setMonsters] = useState([]);
  const [searchString,setSearchString ] = useState("");
  const [filteredMonsters,setFilteredMonsters] = useState(monsters);

  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response)=>response.json())
      .then(data=>setMonsters(data));
  },[]);

  useEffect(()=>{
    const filteredMonsters = monsters.filter((monster)=>monster.name.toLocaleLowerCase().includes(searchString));

    setFilteredMonsters(filteredMonsters);
  },[monsters,searchString]);

  const onSearchChange = event=>{
    const searchString = event.target.value.toLocaleLowerCase();
    setSearchString(searchString)
  }
  
  return (
    <div className='App'>
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox 
        className={"monsters-search-box"} 
        placeholder={"Search Monsters"}
        onChangeHandler={onSearchChange}
      />
      <CardList monsters={filteredMonsters}/>
    </div>
  )
}

export default App;
