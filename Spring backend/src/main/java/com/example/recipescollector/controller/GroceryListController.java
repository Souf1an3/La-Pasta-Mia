package com.example.recipescollector.controller;

import com.example.recipescollector.entity.GroceryItem;
import com.example.recipescollector.entity.GroceryList;
import com.example.recipescollector.service.GroceryListService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@AllArgsConstructor
public class GroceryListController {


    private final GroceryListService groceryListService;


    @GetMapping("/grocery/add/1/{item}")
    public List<GroceryItem> addItemToGrocery(@PathVariable("item") String item) {
        groceryListService.addItem(new GroceryItem(item), 1L);
        // sending back to list as a test for instasnt update
        return groceryListService.getGrocerList(1L);
    }

    @GetMapping("/grocery/remove/{id}")
    public void removeItemFromGrocery(@PathVariable("id") Long id) {
        groceryListService.removeItemFromGrocery(id);
    }

    @GetMapping("/grocery/1/add-recipe/{ingredients}")
    public void addRecipeIngredientsToGroceryList(@PathVariable("ingredients") String[] ingredients) {
        for (String ingredient : ingredients) {
            groceryListService.addItem(new GroceryItem(ingredient), 1L);

        }

    }

    @GetMapping("/grocery/toggle/{id}")
    public void changeEnabledStatus(@PathVariable("id") Long id) {
        groceryListService.changeEnabledStatus(id);
    }

    @GetMapping("grocery/list/{id}")
    public List<GroceryItem> getGroceryList(@PathVariable("id") Long id) {
        return groceryListService.getGrocerList(id);
    }

    @PostMapping("grocery/new-list")
    public void saveGroceryList(@RequestBody GroceryList groceryList) {
        groceryListService.saveGroceryList(groceryList);
    }

    @GetMapping("grocery/clear")
    public void clearGroceryList() {
        groceryListService.removeAllCheckedItem();
    }

}
