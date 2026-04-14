package com.auto_market.controller;

import java.util.List;
import com.auto_market.repository.VehiculoImagenRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.auto_market.entity.VehiculoImagen;

@RestController
@RequestMapping("/vehiculoImagenes")
public class VehiculoImagenController {

    @Autowired
    private VehiculoImagenRepository vehiculoImagenRepository;


    @GetMapping
    public List<VehiculoImagen> mostrarImagenes() {
        return vehiculoImagenRepository.findAll();
    }


    @PostMapping
    public VehiculoImagen crearImagen(@Valid @RequestBody VehiculoImagen imagen) {
        return vehiculoImagenRepository.save(imagen);
    }


    @GetMapping("/{id}")
    public VehiculoImagen mostrarImagenPorId(@PathVariable Long id) {
        return vehiculoImagenRepository.findById(id).orElse(null);
    }


    @DeleteMapping("/{id}")
    public void eliminarImagen(@PathVariable Long id) {
        vehiculoImagenRepository.deleteById(id);
    }

}