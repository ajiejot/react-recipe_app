import React from 'react';
import logo from './logo.svg';
import './App.css';
import Recipe from './components/Recipe'
import RecipeModal from './components/RecipeModal'

// https://www.edamam.com/ API
const APP_ID='YOUR APP ID HERE'
const APP_KEY='YOUR APP KEY HERE'


class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      recipes: [],
      searchQuery: '',
      showModal: '',
      isLoaded: false
    }
  }
  componentDidMount(){
    this.setState({
      isLoaded: true
    })
  }

  onChangeHandle(e){
    this.setState({
      searchQuery: e.target.value
    })
  }

  onSubmitHandle(e){
    e.preventDefault()
    if (this.state.searchQuery!==''){
        const request = async () => {
          const response = await fetch(`https://api.edamam.com/search?q=${this.state.searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`)
          const json = await response.json();
          console.log(json)
          if (json){
            this.setState({recipes: json.hits,isLoaded:true})
          }
        }
      request()
      // fetching loading status
      this.setState({
        isLoaded:false
      })
    }
  }

  showRecipeModal(index){
    
    if (index==='close'){
      this.setState({
        showModal: ''
      })
    }
    else{
      this.setState({
        showModal: this.state.recipes[index]
      })
    }
  }

  render(){
    if (this.state.isLoaded){
      return(
        <div className="App">
          <center><h1> React.js using API: Recipe App</h1></center>
          <br />
           {this.state.showModal!=='' 
            ?
              <RecipeModal
                label={this.state.showModal.recipe.label} 
                image={this.state.showModal.recipe.image} 
                ingredients={this.state.showModal.recipe.ingredients} 
                source={this.state.showModal.recipe.source}
                url={this.state.showModal.recipe.url}
                closeModal={this.showRecipeModal.bind(this)}
                />
            :
          <div> 
          <form className='search-form' onSubmit={this.onSubmitHandle.bind(this)}>
            <input placeholder='Search here....e.g. chicken, beef' className='search-bar' value={this.state.searchQuery} onChange={this.onChangeHandle.bind(this)} type="text" />
            <button className='search-button' type="submit">SEARCH</button>
          </form>
          <div className="recipes">
            { this.state.recipes.map((data,index)=>{
              return(
                <Recipe
                  key={index}
                  index={index}
                  label={data.recipe.label}
                  healthLabels={data.recipe.healthLabels}
                  // ingredients={data.recipe.ingredients}
                  image={data.recipe.image}
                  // calories={data.recipe.calories}
                  url={data.recipe.url}
                  source={data.recipe.source}
                  showRecipeModal={this.showRecipeModal.bind(this)}
                />
              )
            })}
          </div>
          {this.state.recipes.length===0 ? <center><i>No results, please search.</i></center> : ''}
          </div>
            }
        </div>
      )
    }
    else{
      // Loading here.
      return(
        <div>
          <form className='search-form' onSubmit={this.onSubmitHandle.bind(this)}>
            <input placeholder='Search here....' className='search-bar' value={this.state.searchQuery} onChange={this.onChangeHandle.bind(this)} type="text" />
            <button className='search-button' type="submit">SEARCH</button>
          </form>
          <div className="blink">
            <center><h2>Fetching data from the server.....</h2></center>
          </div>
        </div>
      )

    }
  }
}

export default App;
