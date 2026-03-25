package com.auto_market.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "calificaciones")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Calificacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer puntuacion;


    private String comentario;

    @ManyToOne
    @JoinColumn(name = "transaccion_id")
    private Transaccion transaccion;

    @ManyToOne
    @JoinColumn(name = "calificador_id")
    private Usuario calificador;

    @ManyToOne
    @JoinColumn(name = "calificado_id")
    private Usuario calificado;
}