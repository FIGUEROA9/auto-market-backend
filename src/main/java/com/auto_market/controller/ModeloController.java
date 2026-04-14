package com.auto_market.controller;

import java.util.List;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.auto_market.entity.Modelo;
import com.auto_market.repository.ModeloRepository;


@RestController
@RequestMapping("/modelos")
public class ModeloController {


        @Autowired
        private ModeloRepository modeloRepository;

        // Obtener todos los modelos
        @GetMapping
        public List<Modelo> mostrarModelos() {
            return modeloRepository.findAll();
        }

        // Crear modelo
        @PostMapping
        public Modelo crearModelo(@Valid @RequestBody Modelo modelo) {
            return modeloRepository.save(modelo);
        }

        // Buscar modelo por id
        @GetMapping("/{id}")
        public Modelo mostrarModeloPorId(@PathVariable Long id) {
            return modeloRepository.findById(id).orElse(null);
        }

        // Eliminar modelo
        @DeleteMapping("/{id}")
        public void eliminarModelo(@PathVariable Long id) {
            modeloRepository.deleteById(id);
        }

}

