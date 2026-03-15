package com.auto_market.entity;

import com.auto_market.entity.Marca;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "modelos")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Modelo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @ManyToOne
    @JoinColumn(name = "marca_id")
    private Marca marca;
}