package com.auto_market.controller;
import java.util.List;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.auto_market.entity.Marca;
import com.auto_market.repository.MarcaRepository;


@RestController
@RequestMapping("/marcas")
public class MarcaController {


        @Autowired
        private MarcaRepository marcaRepository;

        // Obtener todas las marcas
        @GetMapping
        public List<Marca> mostrarMarcas() {
            return marcaRepository.findAll();
        }

        // Crear marca
        @PostMapping
        public Marca crearMarca(@Valid @RequestBody Marca marca) {
            return marcaRepository.save(marca);
        }

        // Buscar marca por id
        @GetMapping("/{id}")
        public Marca mostrarMarcaPorId(@PathVariable Long id) {
            return marcaRepository.findById(id).orElse(null);
        }

        // Eliminar marca
        @DeleteMapping("/{id}")
        public void eliminarMarca(@PathVariable Long id) {
            marcaRepository.deleteById(id);
        }
}

