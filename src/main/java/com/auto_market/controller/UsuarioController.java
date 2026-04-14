package com.auto_market.controller;


import java.util.List;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.auto_market.entity.Usuario;
import com.auto_market.repository.UsuarioRepository;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;


    @GetMapping
    public List<Usuario> mostrarUsuarios() {
        return usuarioRepository.findAll();
    }


    @PostMapping
    public Usuario crearUsuario(@Valid @RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }


    @GetMapping("/{id}")
    public Usuario mostrarUsuariosPorId(@PathVariable Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }


    @DeleteMapping("/{id}")
    public void eliminarUsuario(@PathVariable Long id) {
        usuarioRepository.deleteById(id);
    }

}
