package com.auto_market.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.auto_market.entity.Caracteristica;

@Repository
public interface CaracteristicaRepository extends JpaRepository<Caracteristica, Long> {

}
