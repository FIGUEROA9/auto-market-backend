package com.auto_market.entity;

import com.auto_market.entity.Vehiculo;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "marcas")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Marca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @OneToMany(mappedBy = "marca")
    private List<Vehiculo> vehiculos;
}