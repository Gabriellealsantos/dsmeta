package com.devsuperior.dsmeta.services;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;

import com.devsuperior.dsmeta.dto.SaleDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.devsuperior.dsmeta.entities.Sale;
import com.devsuperior.dsmeta.repositories.SaleRepository;

@Service
public class SaleService {

	@Autowired
	private SaleRepository repository;

	public Page<SaleDTO> findSales(String minDate, String maxDate, String name, Pageable pageable) {
		LocalDate today = LocalDate.ofInstant(Instant.now(), ZoneId.systemDefault());

		LocalDate min = (minDate == null || minDate.isEmpty()) ? today.minusDays(10000) : LocalDate.parse(minDate);
		LocalDate max = (maxDate == null || maxDate.isEmpty()) ? today : LocalDate.parse(maxDate);
		String sellerName = (name == null) ? "" : name;

		Page<Sale> sales = repository.findSales(min, max, sellerName, pageable);
		return sales.map(sale -> new SaleDTO(
				sale.getId(),
				sale.getSellerName(),
				sale.getVisited(),
				sale.getDeals(),
				sale.getAmount(),
				sale.getDate()
		));
	}
}

