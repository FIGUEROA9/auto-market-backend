package com.auto_market.controller;
import java.util.List;

import com.auto_market.repository.ContactoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.auto_market.entity.Contacto;
import com.auto_market.repository.ContactoRepository;

@RestController
@RequestMapping("/contactos")
public class ContactoController {

    @Autowired
    private ContactoRepository contactoRepository;


    @GetMapping
    public List<Contacto> mostrarContactos() {
        return contactoRepository.findAll();
    }


    @PostMapping
    public Contacto crearContactos(@Valid @RequestBody Contacto contacto) {
        return contactoRepository.save(contacto);
    }


    @GetMapping("/{id}")
    public Contacto mostrarContactosPorId(@PathVariable Long id) {
        return contactoRepository.findById(id).orElse(null);
    }


    @DeleteMapping("/{id}")
    public void eliminarContactos(@PathVariable Long id) {
        contactoRepository.deleteById(id);
    }

}
