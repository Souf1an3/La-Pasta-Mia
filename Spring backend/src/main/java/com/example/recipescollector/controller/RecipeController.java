package com.example.recipescollector.controller;

import com.example.recipescollector.entity.*;
import com.example.recipescollector.service.RecipeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Optional;



@RestController
@AllArgsConstructor
public class RecipeController {

    private final RecipeService recipeService;



    @GetMapping("/recipe/{id}")
    public Recipe getRecipe(@PathVariable("id") Long id) {
        // TODO : Learn more about Optional and if present handling here
        return recipeService.findRecipeById(id).get();
    }


    @CrossOrigin
    @RequestMapping(value = "/recipe/save", method = RequestMethod.POST)
    public Recipe saveRecipe(@RequestBody Recipe request, HttpServletResponse response) {
        Recipe newRecipe = new Recipe(request);
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.setStatus(200);
        recipeService.saveRecipe(newRecipe);
        return newRecipe;
    }

    @GetMapping("/recipes/{category}")
    public Optional<List<Recipe>> getRecipesByCategory(@PathVariable("category") String category) {
        RecipeCategory recipeCategory = RecipeCategory.valueOf(category);
        return recipeService.findRecipeByCategory(recipeCategory);
    }

    @GetMapping("/recipes/all")
    public List<Recipe> getAllRecipe() {
        return recipeService.getAllRecipe();
    }


    @GetMapping("/recipe/favorite/{id}")
    public void changeFavoriteStatus(@PathVariable Long id) {
        recipeService.changeFavoriteRecipe(id);
    }

}



