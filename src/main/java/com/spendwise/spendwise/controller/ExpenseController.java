package com.spendwise.spendwise.controller;

import com.spendwise.spendwise.model.Expense;
import com.spendwise.spendwise.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController 
@RequestMapping("/api/expenses") 
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

   
    @PostMapping
    public ResponseEntity<Expense> addExpense(@Valid @RequestBody Expense expense) {
        Expense savedExpense = expenseService.saveExpense(expense);
        return new ResponseEntity<>(savedExpense, HttpStatus.CREATED); 
    }

 
    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses() {
        List<Expense> expenses = expenseService.getAllExpenses();
        return ResponseEntity.ok(expenses); 
    }
 
    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable Long id) {
        // @PathVariable extracts the ID from the URL path
        Optional<Expense> expense = expenseService.getExpenseById(id);
        return expense.map(ResponseEntity::ok) 
                      .orElseGet(() -> ResponseEntity.notFound().build()); 
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Long id, @Valid @RequestBody Expense expenseDetails) {
        Optional<Expense> expense = expenseService.getExpenseById(id);
        if (expense.isPresent()) {
            Expense existingExpense = expense.get();
            // Update existing expense details
            existingExpense.setCategory(expenseDetails.getCategory());
            existingExpense.setAmount(expenseDetails.getAmount());
            existingExpense.setDescription(expenseDetails.getDescription());
            existingExpense.setDate(expenseDetails.getDate());

            Expense updatedExpense = expenseService.saveExpense(existingExpense);
            return ResponseEntity.ok(updatedExpense); 
        } else {
            return ResponseEntity.notFound().build(); 
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        Optional<Expense> expense = expenseService.getExpenseById(id);
        if (expense.isPresent()) {
            expenseService.deleteExpense(id);
            return ResponseEntity.noContent().build(); 
        } else {
            return ResponseEntity.notFound().build(); 
        }
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<Expense>> getExpensesByDateRange(
            @RequestParam("startDate") LocalDate startDate,
            @RequestParam("endDate") LocalDate endDate) {
        // @RequestParam extracts parameters from the query string
        List<Expense> expenses = expenseService.getExpensesByDateRange(startDate, endDate);
        return ResponseEntity.ok(expenses);
    }

    @GetMapping("/search/category")
    public ResponseEntity<List<Expense>> searchExpensesByCategory(@RequestParam("q") String query) {
        List<Expense> expenses = expenseService.searchExpensesByCategory(query);
        return ResponseEntity.ok(expenses);
    }

    @GetMapping("/total")
    public ResponseEntity<BigDecimal> getTotalExpenses() {
        BigDecimal total = expenseService.getTotalExpenses();
        return ResponseEntity.ok(total);
    }

    @GetMapping("/total/date-range")
    public ResponseEntity<BigDecimal> getTotalExpensesByDateRange(
         @RequestParam("startDate") LocalDate startDate,
         @RequestParam("endDate") LocalDate endDate) {
        BigDecimal total = expenseService.getTotalExpensesByDateRange(startDate, endDate);
        return ResponseEntity.ok(total);
    }

    @GetMapping("/summary/category")
    public ResponseEntity<Map<String, BigDecimal>> getExpenseSummaryByCategory() {
        Map<String, BigDecimal> summary = expenseService.getExpenseSummaryByCategory();
        return ResponseEntity.ok(summary);
    }


    @GetMapping("/summary/category/date-range")
    public ResponseEntity<Map<String, BigDecimal>> getExpenseSummaryByCategory(
        @RequestParam("startDate") LocalDate startDate,
        @RequestParam("endDate") LocalDate endDate) {
        Map<String, BigDecimal> summary = expenseService.getExpenseSummaryByCategory(startDate, endDate);
        return ResponseEntity.ok(summary);
    }


    @GetMapping("/summary/biggest-category")
    public ResponseEntity<Map.Entry<String, BigDecimal>> getBiggestCategory() {
        Optional<Map.Entry<String, BigDecimal>> biggest = expenseService.getBiggestCategory();
        return biggest.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build()); 
    }
    
    @GetMapping("/summary/biggest-category/date-range")
    public ResponseEntity<Map.Entry<String, BigDecimal>> getBiggestCategory(
        @RequestParam("startDate") LocalDate startDate,
        @RequestParam("endDate") LocalDate endDate) {
        Optional<Map.Entry<String, BigDecimal>> biggest = expenseService.getBiggestCategory(startDate, endDate);
        return biggest.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build()); 
    }

}
