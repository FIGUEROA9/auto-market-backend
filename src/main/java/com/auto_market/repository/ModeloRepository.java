package com.auto_market.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.auto_market.entity.Modelo;
import org.springframework.stereotype.Repository;

@Repository
public interface ModeloRepository extends JpaRepository<Modelo, Long>  {
}
