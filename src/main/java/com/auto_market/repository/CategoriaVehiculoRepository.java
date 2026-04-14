package com.auto_market.repository;

import com.auto_market.entity.CategoriaVehiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CategoriaVehiculoRepository extends JpaRepository<CategoriaVehiculo, Long> {

}