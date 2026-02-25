package com.auto_market.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "categorias_vehiculo")
public class CategoriaVehiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombre;

    public CategoriaVehiculo() {
    }

    public CategoriaVehiculo(Integer id, String nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}