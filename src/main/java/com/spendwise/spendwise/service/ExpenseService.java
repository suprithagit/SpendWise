package com.spendwise.spendwise.service;

import com.spendwise.spendwise.model.Expense;
import com.spendwise.spendwise.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

// Service layer for handling expense-related business logic
@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    @Autowired 
    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public Expense saveExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public Optional<Expense> getExpenseById(Long id) {
        return expenseRepository.findById(id);
    }

    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }

    public List<Expense> getExpensesByDateRange(LocalDate startDate, LocalDate endDate) {
        return expenseRepository.findByDateBetween(startDate, endDate);
    }

    public List<Expense> searchExpensesByCategory(String category) {
        return expenseRepository.findByCategoryContainingIgnoreCase(category);
    }

    public BigDecimal getTotalExpenses() {
        return expenseRepository.findAll().stream()
                .map(Expense::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add); // Sums up all amounts
    }

    public BigDecimal getTotalExpensesByDateRange(LocalDate startDate, LocalDate endDate) {
        return expenseRepository.findByDateBetween(startDate, endDate).stream()
                .map(Expense::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public Map<String, BigDecimal> getExpenseSummaryByCategory() {
        return expenseRepository.findAll().stream()
                .collect(Collectors.groupingBy(
                        Expense::getCategory, // Group by category
                        Collectors.reducing(BigDecimal.ZERO, Expense::getAmount, BigDecimal::add) // Sum amounts for each category
                ));
    }

    public Map<String, BigDecimal> getExpenseSummaryByCategory(LocalDate startDate, LocalDate endDate) {
         return expenseRepository.findByDateBetween(startDate, endDate).stream()
                .collect(Collectors.groupingBy(
                        Expense::getCategory, // Group by category
                        Collectors.reducing(BigDecimal.ZERO, Expense::getAmount, BigDecimal::add) 
                ));
    }

    public Optional<Map.Entry<String, BigDecimal>> getBiggestCategory() {
        Map<String, BigDecimal> summary = getExpenseSummaryByCategory();
        return summary.entrySet().stream()
                      .max(Map.Entry.comparingByValue()); 
    }

     public Optional<Map.Entry<String, BigDecimal>> getBiggestCategory(LocalDate startDate, LocalDate endDate) {
        Map<String, BigDecimal> summary = getExpenseSummaryByCategory(startDate, endDate);
        return summary.entrySet().stream()
                      .max(Map.Entry.comparingByValue()); 
    }

}
