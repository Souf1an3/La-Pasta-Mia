import React, {useContext, useEffect, useState} from 'react';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import SearchBar from "./Search";
import {LoadingSpinnerPasta} from './LoadingSpinnerPasta';
import {Checkbox} from '@material-ui/core';
import {Favorite, FavoriteBorder} from '@material-ui/icons';
import {UserContext} from "../utils/UserContext";
import {RecipesGrid} from "./RecipesGrid";
import {RecipeProvider} from "../utils/RecipeProvider";


export const RecipeCollection = () => {

    const {recipes} = useContext(RecipeProvider)
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRecipes, setFilterRecipes] = useState('');
    const {filterFavorites,setFilterFavorites} = useContext(UserContext)

    const toggleChecked = () => {
        setFilterFavorites((prev) => !prev);
    };




    useEffect(() => {

        if (recipes) {
            setLoading(false)
        }
            // getRecipes().catch(e => console.log(e))
        },
        [recipes]);

    useEffect(() => {
        const filterRecipesByNameSearch = (recipesData, query) => {
            if (filterFavorites) {
                recipesData = recipesData.filter(post => post.favorite);
            }
            if (!query) {
                return recipesData;
            }

            return recipesData.filter((post) => {
                    const postName = post.name.toLowerCase();
                    return postName.includes(query);
                }
            );
        };
        setFilterRecipes(filterRecipesByNameSearch(recipes, searchQuery))}, [recipes, searchQuery,filterFavorites])

    useEffect(() => {
        const filterFavoriteRecipes = (recipesData) => {
            if (!filterFavorites) {
                return recipesData;
            }
            return recipesData.filter((post) => {
                return post.favorite
            })
        }
        setFilterRecipes(filterFavoriteRecipes(recipes))
    }, [filterFavorites,recipes])




    return (
        <>
            <h2 className={"grocery-head"}>Receptgyüjtemény</h2>
            <div className="recipeCollection">
                <SearchBar searchQuery={searchQuery}
                           setSearchQuery={setSearchQuery}/>
                <p>Csak kedvencek <Checkbox
                    checked={filterFavorites}
                    onClick={toggleChecked}
                    icon={<FavoriteBorder/>}
                    checkedIcon={<Favorite/>}
                    name="checkedH"/></p>


                {loading && <LoadingSpinnerPasta/>}
                {!loading && <RecipesGrid loading={loading} recipes={filterRecipes}/>}

            </div>

        </>

    );

}