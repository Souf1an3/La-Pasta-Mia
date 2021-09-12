package com.example.recipescollector.entity;


import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "RECIPE")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int preparationTime;
    private int temperature;
    private boolean favorite;
    private String imageName;
    private RecipeCategory category;


    public Recipe(Recipe recipe) {
        Set<Ingredient> ingredientSet = new HashSet<>();

        for (Ingredient ingredient : recipe.getIngredients()) {
            ingredientSet.add(new Ingredient(ingredient.getName(), ingredient.getUnitType(), ingredient.getAmount()));
        }

        this.ingredients = ingredientSet;
        this.name = recipe.getName();
        this.category = RecipeCategory.PASTA;
        this.imageName = recipe.getImageName();
        this.details = recipe.getDetails();
        this.favorite = false;
        this.personForMeal = 2;
        this.temperature = recipe.getTemperature();
        this.preparationTime = recipe.getPreparationTime();
    }

    public Recipe() {
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPreparationTime() {
        return preparationTime;
    }

    public void setPreparationTime(int preparationTime) {
        this.preparationTime = preparationTime;
    }

    public int getTemperature() {
        return temperature;
    }

    public void setTemperature(int temperature) {
        this.temperature = temperature;
    }

    public boolean isFavorite() {
        return favorite;
    }

    public void setFavorite(boolean favorite) {
        this.favorite = favorite;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public RecipeCategory getCategory() {
        return category;
    }

    public void setCategory(RecipeCategory category) {
        this.category = category;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public Set<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(Set<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public Integer getPersonForMeal() {
        return personForMeal;
    }

    public void setPersonForMeal(Integer personForMeal) {
        this.personForMeal = personForMeal;
    }

    private Integer personForMeal;

    @Column(length = 2500)
    private String details;


    @OneToMany(cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JoinColumn(name = "recipe_id")
    @JsonManagedReference
    private Set<Ingredient> ingredients;

    public Recipe(String name, int preparationTime, int temperature, boolean favorite, String imageName, RecipeCategory category, String details, Set<Ingredient> ingredients, int pfM) {
        this.name = name;
        this.preparationTime = preparationTime;
        this.temperature = temperature;
        this.favorite = favorite;
        this.imageName = imageName;
        this.category = category;
        this.details = details;
        this.ingredients = ingredients;
        this.personForMeal = pfM;
    }

}
