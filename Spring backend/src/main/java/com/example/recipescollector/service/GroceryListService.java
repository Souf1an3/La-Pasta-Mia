package com.example.recipescollector.service;

import com.example.recipescollector.entity.GroceryItem;
import com.example.recipescollector.entity.GroceryList;
import com.example.recipescollector.repository.GroceryItemRepository;
import com.example.recipescollector.repository.GroceryListRepository;
import lombok.AllArgsConstructor;
import lombok.var;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class GroceryListService {

    private final GroceryListRepository groceryListRepository;
    private final GroceryItemRepository itemApi;

    public void saveGroceryList(GroceryList groceryList) {
        groceryListRepository.save(groceryList);

    }


    public void removeItemFromGrocery(Long id) {
        itemApi.delete(itemApi.getById(id));
    }

    public void changeEnabledStatus(Long id) {
        try {

            GroceryItem changedItem = itemApi.findById(id).get();
            changedItem.setEnabled(!changedItem.isEnabled());
            itemApi.save(changedItem);
        } catch (Exception e) {
            System.out.println("API is slow or " + e.getMessage());
        }
    }

    public void addItem(GroceryItem item, Long id) {

        if (!groceryListRepository.findById(id).isPresent()) {
            return;
        }
        GroceryList groceryList = groceryListRepository.findById(id).get();
        groceryList.addGroceryItem(item);
        groceryList.setGroceryItems(groceryList.getGroceryItems());
        groceryListRepository.save(groceryList);
    }


    public List<GroceryItem> getGrocerList(Long id) {
        return groceryListRepository.findById(id).get().getGroceryItems();
    }

    public void removeAllCheckedItem() {
        List<GroceryItem> everyItem =itemApi.findAll();
        for (GroceryItem groceryItem : everyItem) {
            if (!groceryItem.isEnabled()) {
                itemApi.delete(groceryItem); // concurrent modification ex?
            }
        }


    }
}

//TODO: Optional.get-s without isPresent check
