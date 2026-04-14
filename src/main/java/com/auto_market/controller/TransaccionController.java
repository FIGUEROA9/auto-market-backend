package com.auto_market.controller;

import java.util.List;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.auto_market.entity.Transaccion;
import com.auto_market.repository.TransaccionRepository;

@RestController
@RequestMapping("/transacciones")
public class TransaccionController {

        @Autowired
        private TransaccionRepository transaccionRepository;


        @GetMapping
        public List<Transaccion> mostrarTransacciones() {
            return transaccionRepository.findAll();
        }


        @PostMapping
        public Transaccion crearTransaccion(@Valid @RequestBody Transaccion transaccion) {
            return transaccionRepository.save(transaccion);
        }


        @GetMapping("/{id}")
        public Transaccion mostrarTransaccionPorId(@PathVariable Long id) {
            return transaccionRepository.findById(id).orElse(null);
        }


        @DeleteMapping("/{id}")
        public void eliminarTransaccion(@PathVariable Long id) {
            transaccionRepository.deleteById(id);
        }

}



