package com.auto_market.controller;

import java.util.List;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.auto_market.entity.Calificacion;
import com.auto_market.repository.CalificacionRepository;


@RestController
@RequestMapping("/calificaciones")
public class CalificacionController {


        @Autowired
        private CalificacionRepository calificacionRepository;

        // Obtener todas las calificaciones
        @GetMapping
        public List<Calificacion> mostrarCalificaciones() {
            return calificacionRepository.findAll();
        }

        // Crear calificación
        @PostMapping
        public Calificacion crearCalificacion(@Valid @RequestBody Calificacion calificacion) {
            return calificacionRepository.save(calificacion);
        }

        // Buscar calificación por id
        @GetMapping("/{id}")
        public Calificacion mostrarCalificacionPorId(@PathVariable Long id) {
            return calificacionRepository.findById(id).orElse(null);
        }

        // Eliminar calificación
        @DeleteMapping("/{id}")
        public void eliminarCalificacion(@PathVariable Long id) {
            calificacionRepository.deleteById(id);
        }

}

