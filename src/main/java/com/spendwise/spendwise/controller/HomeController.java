package com.spendwise.spendwise.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/tracker")
    public String tracker() {
        return "tracker";
    }
    
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        System.out.println("Test controller hit");
        return ResponseEntity.ok("Test works");
    }
}
