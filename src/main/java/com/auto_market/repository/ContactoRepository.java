package com.auto_market.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.auto_market.entity.Contacto;

@Repository
public interface ContactoRepository extends JpaRepository<Contacto, Long> {

}
