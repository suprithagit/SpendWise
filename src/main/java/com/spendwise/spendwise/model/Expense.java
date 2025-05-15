package com.spendwise.spendwise.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;


@Entity
@Table(name = "expenses") 
public class Expense {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id;

    @NotBlank(message = "Category is required") 
    private String category;

    @NotNull(message = "Amount is required") 
    @DecimalMin(value = "0.01", message = "Amount must be positive") 
    private BigDecimal amount;

    private String description; 

    @NotNull(message = "Date is required") 
    private LocalDate date;

    public Expense() {
        // Default constructor required by JPA
    }

    public Expense(String category, BigDecimal amount, String description, LocalDate date) {
        this.category = category;
        this.amount = amount;
        this.description = description;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "Expense{" +
               "id=" + id +
               ", category='" + category + '\'' +
               ", amount=" + amount +
               ", description='" + description + '\'' +
               ", date=" + date +
               '}';
    }
}
