package com.devsuperior.dsmeta.dto;

import com.devsuperior.dsmeta.entities.Sale;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

public class SaleDTO {

    private Long id;

    @NotBlank
    private String sellerName;

    @NotNull
    @Min(0)
    private Integer visited;

    @NotNull
    @Min(0)
    private Integer deals;

    @NotNull
    @DecimalMin("0.0")
    private Double amount;

    @NotNull
    private LocalDate date;

    public SaleDTO(Long id, String sellerName, Integer visited, Integer deals, Double amount, LocalDate date) {
        this.id = id;
        this.sellerName = sellerName;
        this.visited = visited;
        this.deals = deals;
        this.amount = amount;
        this.date = date;
    }

    public SaleDTO(Sale entity) {
        id = entity.getId();
        sellerName = entity.getSellerName();
        visited = entity.getVisited();
        deals = entity.getDeals();
        amount = entity.getAmount();
        date = entity.getDate();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSellerName() {
        return sellerName;
    }

    public void setSellerName(String sellerName) {
        this.sellerName = sellerName;
    }

    public Integer getVisited() {
        return visited;
    }

    public void setVisited(Integer visited) {
        this.visited = visited;
    }

    public Integer getDeals() {
        return deals;
    }

    public void setDeals(Integer deals) {
        this.deals = deals;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

}
