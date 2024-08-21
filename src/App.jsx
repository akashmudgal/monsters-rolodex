import './App.css';
import { Component } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

class App extends Component {
  constructor() {
    super();

    this.state = {
      searchString: "",
      monsters: []
    }
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response)=>response.json())
      .then(data=>this.setState({...this.state, monsters: data}));
  }
  
  onSearchChange = event=>{
    const searchString = event.target.value.toLocaleLowerCase();
    this.setState({searchString})
}

  render() {
    const { monsters, searchString } = this.state;
    const {onSearchChange} =  this;
    const filteredMonsters = monsters.filter((monster)=>monster.name.toLocaleLowerCase().includes(searchString));

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
}

export default App;
