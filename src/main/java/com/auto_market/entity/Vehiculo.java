package com.auto_market.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "vehiculos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vehiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codigoInterno;

    private Integer anio;

    private Integer kilometraje;

    private BigDecimal precioVenta;

    private String departamento;

    private String ciudad;

    private String descripcion;

    private String titulo;

    private String estadoPublicacion;

    private Integer vistas;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private CategoriaVehiculo categoria;

    @ManyToOne
    @JoinColumn(name = "marca_id")
    private Marca marca;
}
