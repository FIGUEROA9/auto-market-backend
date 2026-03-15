package com.auto_market.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "caracteristicas")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Caracteristica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
}