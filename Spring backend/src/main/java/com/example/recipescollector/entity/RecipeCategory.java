package com.example.recipescollector.entity;

public enum RecipeCategory {
    DESSERT("Desszert"),PASTA("Tészta"),SOUP("LEVES");

    @Override
    public String toString() {
        return "RecipeCategory{" +
                "name='" + name + '\'' +
                '}';
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    private String name;

    RecipeCategory(String name) {
        this.name = name;
    }
}
