package com.studgustas.Payroll.service.dataLoader;

import com.studgustas.Payroll.service.domain.Employee;
import com.studgustas.Payroll.service.repo.EmployeeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class LoadData {
    private static final Logger log = LoggerFactory.getLogger(LoadData.class);

//    @Bean
//    CommandLineRunner initDatabase(EmployeeRepository repository, PasswordEncoder encoder) {
//        return args -> {
//            log.info("Preloading " + repository.save(new Employee("Antanas", "Abadauskas", "aabadauskas@gmail.com", "Advokatas", 1800, "aabadauskas",encoder.encode("antanas1"),"ROLE_USER")));
//            log.info("Preloading " + repository.save(new Employee("Balys", "Babarikaitis","bbabarikaitis@gmail.com", "Buhalteris", 1700, "bbabarikaitis", encoder.encode("balys1"), "ROLE_USER")));
//            log.info("Preloading " + repository.save(new Employee("Cecilija", "Calkova","ccalkova@gmail.com", "Cinkuotoja", 1600, "ccalkova", encoder.encode("cecilija1"), "ROLE_USER")));
//            log.info("Preloading " + repository.save(new Employee("Digna", "Dabraitė", "ddabraite@gmail.com", "Dailintoja", 1750, "ddabraite", encoder.encode("digna1"), "ROLE_USER")));
//            log.info("Preloading " + repository.save(new Employee("Gustas", "Lukoševičius", "admin@imone.com", "Administratorius", 2000, "admin", encoder.encode("admin"), "ROLE_USER,ROLE_ADMIN")));
//        };
//    }
}
