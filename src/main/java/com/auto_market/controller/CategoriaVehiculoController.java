package com.auto_market.controller;
import java.util.List;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.auto_market.entity.CategoriaVehiculo;
import com.auto_market.repository.CategoriaVehiculoRepository;

@RestController
@RequestMapping("/categoriasVehiculo")
public class CategoriaVehiculoController {

    @Autowired
    private CategoriaVehiculoRepository categoriaVehiculoRepository;


    @GetMapping
    public List<CategoriaVehiculo> mostrarCategoriaVehiculo() {
        return categoriaVehiculoRepository.findAll();
    }


    @PostMapping
    public CategoriaVehiculo crearCategoriaVehiculo(@Valid @RequestBody CategoriaVehiculo categoriaVehiculo) {
        return categoriaVehiculoRepository.save(categoriaVehiculo);
    }


    @GetMapping("/{id}")
    public CategoriaVehiculo mostrarCategoriaVehiculo(@PathVariable Long id) {
        return categoriaVehiculoRepository.findById(id).orElse(null);
    }


    @DeleteMapping("/{id}")
    public void eliminarCategoriaVehiculo(@PathVariable Long id) {
        categoriaVehiculoRepository.deleteById(id);
    }

}
