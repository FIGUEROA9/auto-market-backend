package com.auto_market.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "vehiculo_imagenes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehiculoImagen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url;

    @ManyToOne
    @JoinColumn(name = "vehiculo_id")
    private Vehiculo vehiculo;
}
