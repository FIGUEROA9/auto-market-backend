package com.auto_market.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.auto_market.entity.Marca;
import org.springframework.stereotype.Repository;

@Repository
public interface MarcaRepository extends JpaRepository<Marca, Long> {
}
