package com.example.recipescollector.service;

import com.example.recipescollector.entity.Recipe;
import com.example.recipescollector.entity.RecipeCategory;
import com.example.recipescollector.repository.RecipeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;


    public Optional<Recipe> findRecipeById(Long id) {
        return recipeRepository.findById(id);
    }

    public void saveRecipe(Recipe recipe) {
        recipeRepository.save(recipe);
    }


    public void changeFavoriteRecipe(Long id) {
        if (!findRecipeById(id).isPresent()) {
            return;
        }
        Recipe updatedRecipe = findRecipeById(id).get();
        updatedRecipe.setFavorite(!updatedRecipe.isFavorite());
        recipeRepository.save(updatedRecipe);

    }

    public Optional<List<Recipe>> getFavoriteRecipes() {
        return recipeRepository.findAllByFavoriteTrue();
    }

    // TODO: update recipe

    public Optional<List<Recipe>> findRecipeByCategory(RecipeCategory recipeCategory) {
        return recipeRepository.findRecipeByCategory(recipeCategory);
    }

    public List<Recipe> getAllRecipe() {
        return recipeRepository.findAll();
    }
}
