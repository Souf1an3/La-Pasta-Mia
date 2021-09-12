package com.example.recipescollector.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.util.List;


@Entity
@Setter
@Getter
@Table(name = "grocery_list")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class GroceryList {

    @Id
    @GeneratedValue
    private Long id;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "grocery_list_id")
    private List<GroceryItem> groceryItems;



    public GroceryList(List<GroceryItem> groceryItems) {
        this.groceryItems = groceryItems;
    }

    public GroceryList() {

    }

    public void addGroceryItem (GroceryItem groceryItem) {
        groceryItem.setGroceryList(this);
        groceryItems.add(groceryItem);

    }

//    public void removeGroceryItem (GroceryItem groceryItem) {
//        groceryItems.remove(groceryItem);
//        groceryItem.setGroceryList(null);
//    }

    //    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "user_id", referencedColumnName = "id")
//    private AppUser user;


}
