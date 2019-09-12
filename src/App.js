import React , {useEffect, useState} from 'react';
import Recipe from './components/Recipe'
import './App.css';

const App = ({loading}) => {
  const APP_ID = "edaman ID"
  const APP_KEY = "edaman Key"

  const [recipes , setRecipes] = useState([])
  const [search , setSearch] = useState('')
  const [query , setQuery] = useState('')

  useEffect(()=>{
    getRecipes()
  },[query])

  const updateSearch = e =>{
    setSearch(e.target.value)
    console.log(search)
  }

  const getSearch = e =>{
    e.preventDefault()
    setQuery(search)
    setSearch('')
  }

  const getRecipes = async () =>{
    const exampleReq = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`
    const response = await fetch(exampleReq)
    const data = await response.json()
    console.log(data)

    setRecipes(data.hits)
    
  }

  return (
    <div className="App">
      <form className="search-from" onSubmit={getSearch}>
        <input 
          className="search-bar" 
          type="text"
          value={search} 
          onChange={updateSearch}/>
        <button className="search-button" type="submit">ค้นหา</button>
      </form>
      <div className="recipes">
      {loading ? (<h1>Nofound</h1>):(  
        recipes.map(recipe =>(
        <Recipe
         key={recipe.recipe.label}
         title={recipe.recipe.label}
         calories={recipe.recipe.calories}
         image={recipe.recipe.image}  
         ingredients={recipe.recipe.ingredients}
         />
      )))}
    
      </div>
    </div>
  );
}

export default App;
