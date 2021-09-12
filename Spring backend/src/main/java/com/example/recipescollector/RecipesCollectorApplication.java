package com.example.recipescollector;


import com.example.recipescollector.entity.*;
import com.example.recipescollector.service.GroceryListService;
import com.example.recipescollector.service.RecipeService;
import lombok.AllArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;
import java.util.*;

@SpringBootApplication
@AllArgsConstructor
public class RecipesCollectorApplication {

    private RecipeService recipeService;
    private GroceryListService groceryListService;

    public static void main(String[] args) {
        SpringApplication.run(RecipesCollectorApplication.class, args);
    }

    @PostConstruct
    public void init() {

        Recipe muffin = new Recipe("Muffin", 25, 180, false, "muffin.jpg",
                RecipeCategory.DESSERT,
                "A tojást robotgéppel fehéredésig verjük, hozzáadjuk a cukrot és alaposan összedolgozzuk. Minden maradék hozzávalót beleteszünk és robotgéppel alaposan eldolgozzuk. Az egyik adag tetjére fehércsokit reszeltem, a másik közepébe összetört banánt tettem és a tetejére tejcsokit reszeltem. Előmelegített sütőben alsó-felső funkción sütjük. ",
                new HashSet<>(Arrays.asList(new Ingredient("liszt", "bödgre", 2),
                        new Ingredient("cukor", "bögre", 1),new Ingredient("tej", "ml", 300),new Ingredient("tojás","db",1),new Ingredient("sütőpor","csomag",0.5 ))),4);
        recipeService.saveRecipe(muffin);


        // create starting Grocery List
        List<GroceryItem> startingGroceryList = new ArrayList<>(Collections.singletonList(new GroceryItem("pasta")));
        GroceryList grocerList = new GroceryList(startingGroceryList);
        groceryListService.saveGroceryList(grocerList);

    }



}
