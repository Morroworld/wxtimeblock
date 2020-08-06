package com.pomo.wxtimeblock;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
@Controller
public class WxtimeblockApplication {

    @GetMapping("/")
    public String index() {
        return "redirect:swagger-ui.html";
    }

    public static void main(String[] args) {
        SpringApplication.run(WxtimeblockApplication.class, args);
    }

}
