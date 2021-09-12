import './App.css';
import Header from './Components/Header'
import React, {useEffect, useState} from 'react';
import {ThemeProvider} from '@material-ui/core/styles';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Recipe from './Components/Recipe';
import GroceryList from "./Components/GroceryList";
import {RecipeCollection} from "./Components/RecipeCollection";
import {createTheme} from "@material-ui/core";
import {HomePage} from './Components/HomePage';
import {Footer} from "./Components/Footer";
import {RecipeForm} from "./Components/RecipeForm"
import {UserContext} from "./utils/UserContext";
import {RecipeProvider} from "./utils/RecipeProvider";


const theme = createTheme({
    palette: {
        primary: {
            main: '#076620',
            light: '#ea5454',
            // contrastText: orange[900]

        },
        secondary: {
            main: '#fd263e',
            light: '#076620',
            dark: '#ea5454',
            // contrastText: '#0e0e0e'

        }
    }
});

function App() {

    const [recipes, setRecipes] = useState([])
    const [filterFavorites, setFilterFavorites] = useState(false)
    const getAllRecipes = "https://la-pasta-mia.herokuapp.com/recipes/all"


    const getRecipes = async () => {
        const response = await fetch(
            getAllRecipes);
        await response.json().then((json) => setRecipes(json));
    }


    useEffect(() => {
        getRecipes().catch(e => console.dir(e))
    })


    return (

        <div className="container">

            <Router>
                <Header className="header"/>
                <ThemeProvider theme={theme}>
                    <RecipeProvider.Provider value={{recipes,setRecipes}}>

                        <UserContext.Provider value={{filterFavorites, setFilterFavorites}}>

                    <Switch>
                        <Route path="/recipe/:id"> <Recipe/></Route>
                        <Route path="/recipes"> <RecipeCollection /></Route>
                        <Route path="/grocery"> <GroceryList/> </Route>
                        <Route path="/add-recipe"> <RecipeForm/> </Route>
                        <Route path="/home"> <HomePage/></Route>
                        <Route path="/"> <HomePage/></Route>
                    </Switch>




                </UserContext.Provider>
                        </RecipeProvider.Provider>
                </ThemeProvider>
            </Router>
            <Footer/>




        </div>)
}

export default App;
