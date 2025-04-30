package com.devsuperior.dsmeta.services;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;

import com.devsuperior.dsmeta.dto.SaleDTO;
import com.devsuperior.dsmeta.services.exceptions.DatabaseException;
import com.devsuperior.dsmeta.services.exceptions.ResourceNotFoundExceotion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.devsuperior.dsmeta.entities.Sale;
import com.devsuperior.dsmeta.repositories.SaleRepository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;

@Service
public class SaleService {

	@Autowired
	private SaleRepository repository;
    @Autowired
    private SaleRepository saleRepository;

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

	@Transactional
	public SaleDTO insert(SaleDTO dto) {
		Sale entity = new Sale();
		copyDtoToEntity(dto, entity);
		entity = saleRepository.save(entity);
		return new SaleDTO(entity);
	}

	@Transactional
	public SaleDTO update(Long id, SaleDTO dto) {
		try {
			Sale entity = saleRepository.getReferenceById(id);
			copyDtoToEntity(dto, entity);
			entity = saleRepository.save(entity);
			return new SaleDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundExceotion("Recurso não encontrado");
		}
	}

	@Transactional(propagation = Propagation.SUPPORTS)
	public void delete(Long id) {
		try {
			saleRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundExceotion("Recurso não encontrado");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Falha de integridade referencial");
		}

	}

	private void copyDtoToEntity(SaleDTO dto, Sale entity) {
		entity.setSellerName(dto.getSellerName());
		entity.setVisited(dto.getVisited());
		entity.setDeals(dto.getDeals());
		entity.setAmount(dto.getAmount());
		entity.setDate(dto.getDate());
	}
}

