package com.auto_market.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "vehiculos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Vehiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codigoInterno;

    @Min(value = 1990, message = "El año mínimo permitido es 1990")
    @Max(value = 2026, message = "El año no puede ser mayor a 2026")
    private Integer anio;

    @Min(value = 0)
    @Max(value = 1000000)
    private Integer kilometraje;

    @Min(value = 1, message = "El precio debe ser mayor a 0")
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
