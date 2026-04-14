package com.auto_market.controller;


import java.util.List;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.auto_market.entity.Caracteristica;
import com.auto_market.repository.CaracteristicaRepository;

@RestController
@RequestMapping("/caracteristicas")
public class CaracteristicaController {

    @Autowired
    private CaracteristicaRepository caracteristicaRepository;


    @GetMapping
    public List<Caracteristica> mostrarCaracteristica() {
        return caracteristicaRepository.findAll();
    }


    @PostMapping
    public Caracteristica crearCaracteristica(@Valid @RequestBody Caracteristica caracteristica) {
        return  caracteristicaRepository.save(caracteristica);
    }


    @GetMapping("/{id}")
    public Caracteristica mostrarPorId(@PathVariable Long id) {
        return caracteristicaRepository.findById(id).orElse(null);
    }


    @DeleteMapping("/{id}")
    public void eliminarCaracteristica(@PathVariable Long id) {
        caracteristicaRepository.deleteById(id);
    }

}
