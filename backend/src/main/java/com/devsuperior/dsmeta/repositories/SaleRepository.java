package com.devsuperior.dsmeta.repositories;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.devsuperior.dsmeta.entities.Sale;
import org.springframework.data.repository.query.Param;

public interface SaleRepository extends JpaRepository<Sale, Long> {

	@Query("SELECT s FROM Sale s WHERE s.date BETWEEN :min AND :max AND LOWER(s.sellerName) LIKE LOWER(CONCAT('%', :name, '%'))")
	Page<Sale> findSales(@Param("min") LocalDate min, @Param("max") LocalDate max, @Param("name") String name, Pageable pageable);

}