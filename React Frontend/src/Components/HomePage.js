import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {NavLink} from "react-router-dom";
import recipeBook from '../Images/recipe-book.png'
import {RecipesGrid} from "./RecipesGrid";


const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
}));


export const HomePage = () => {
    const getAllRecipes = "https://la-pasta-mia.herokuapp.com/recipes/all"
    const classes = useStyles();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    const getRecipes = async () => {
        setLoading(true)
        const response = await fetch(
            getAllRecipes);
        await response.json().then((json) => setRecipes(json.filter(recipe => recipe.favorite))).then(() => setLoading(false));


    }

    useEffect(() => {
        getRecipes().catch(e => console.log(e))
    },[])

    return (
        <div className={"homePage"}>

            <CssBaseline/>

            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h1" align="center" color="primary" style={{color:"green",fontFamily:"'Amatic SC', cursive"}} gutterBottom>
                            La Pasta Mia
                        </Typography>
                        <Typography variant="h4" align="center" color="textSecondary" style={{fontFamily:"'Amatic SC', cursive"}} paragraph>
                            „A főzés voltaképpen szeretetteljes és önzetlen tevékenység, ami a szakács számára is örömmé válik a hozzáértő vendég révén.”
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item>
<Button color={"primary"} variant={"contained"}>
    <NavLink style={{color:"white",textDecoration:"none"}} to={"/recipes"}>

RECEPTEK
    </NavLink>
</Button>



                                </Grid>
                                <img style={{width:"80px", height:"100px"}} src={recipeBook} alt={"Receptek"}/>
                                <Grid item>
                                    <Button  variant={"contained"} color="primary">
                                        <NavLink style={{color:"white",textDecoration:"none"}} to={"/add-recipe"}>
                                            Új recept
                                        </NavLink>
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <h2 style={{color:"#076620"}}>Virág kedvencei</h2>
              <RecipesGrid loading={loading} recipes={recipes}/>
            </main>

        </div>
    )
}