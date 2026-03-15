package com.auto_market.controller;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.auto_market.entity.Vehiculo;
import com.auto_market.repository.VehiculoRepository;

@RestController
@RequestMapping("/vehiculos")
public class VehiculoController {

    @Autowired
    private VehiculoRepository vehiculoRepository;

    // Obtener todos los vehiculos
    @GetMapping
    public List<Vehiculo> obtenerVehiculos() {
        return vehiculoRepository.findAll();
    }

    // Crear vehiculo
    @PostMapping
    public Vehiculo crearVehiculo(@RequestBody Vehiculo vehiculo) {
        return vehiculoRepository.save(vehiculo);
    }

    // Buscar vehiculo por id
    @GetMapping("/{id}")
    public Vehiculo obtenerVehiculoPorId(@PathVariable Long id) {
        return vehiculoRepository.findById(id).orElse(null);
    }

    // Eliminar vehiculo
    @DeleteMapping("/{id}")
    public void eliminarVehiculo(@PathVariable Long id) {
        vehiculoRepository.deleteById(id);
    }

}
