package com.example.recipescollector.repository;

import com.example.recipescollector.entity.Recipe;
import com.example.recipescollector.entity.RecipeCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {


    Optional<List<Recipe>> findRecipeByCategory(RecipeCategory recipeCategory);


        Optional<List<Recipe>> findAllByFavoriteTrue();

}
