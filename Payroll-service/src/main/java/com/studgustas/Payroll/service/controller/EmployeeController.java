package com.studgustas.Payroll.service.controller;

import com.studgustas.Payroll.service.domain.Employee;
import com.studgustas.Payroll.service.domain.SecurityUser;
import com.studgustas.Payroll.service.exception.EmployeeNotFoundException;
import com.studgustas.Payroll.service.repo.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Objects;


@RestController
@RequestMapping(path = "/employees")
//@CrossOrigin(origins = "*")
public class EmployeeController {

    private final EmployeeRepository employeeRepository;

    public EmployeeController(EmployeeRepository repo) {this.employeeRepository = repo;}

    @GetMapping()
    public String Hello(){
        return "Labas, darbuotojau!";
    }

    // GET http://localhost:8080/employees/all
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(path = "all")
    @ResponseBody
    public Iterable<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    // GET http://localhost:8080/employees/single
    @PreAuthorize("hasRole('USER')")
    @GetMapping(path = "single")
    public Employee findByLoggedUser() throws EmployeeNotFoundException {
        SecurityUser secUser = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Employee emp = secUser.getEmployee();
        return emp;
    }
//    @RequestMapping(value = "/username", method = RequestMethod.GET)
//    @ResponseBody
//    public String currentUserName(Principal principal) {
//        // principal.getName();
//        return principal.toString();
//    }

//    @GetMapping(path = "{id}")
//    public Employee findById(@PathVariable Long id) throws EmployeeNotFoundException {
//        return employeeRepository.findById(id).get();
//    }
    //PUT http://localhost:8080/employees/update
    @PreAuthorize("hasRole('USER')")
    @PutMapping(path = "update")
    public String updateEmployeeInfo(@RequestBody Employee empNew){
        SecurityUser secUser = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Employee emp = secUser.getEmployee();
        if (!empNew.getUsername().isBlank()) {emp.setUsername(empNew.getUsername());}
        if (!empNew.getPassword().isBlank()) {
            String encoded = new BCryptPasswordEncoder().encode(empNew.getPassword());
            emp.setPassword(encoded);
        }
        employeeRepository.save(emp);
        return emp.toString();
    }

    //http://localhost:8080/employees/add
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(path = "add")
    public void addNewEmployee(@RequestBody Employee employee){
        String encoded = new BCryptPasswordEncoder().encode(employee.getPassword());
        employee.setPassword(encoded);
        employeeRepository.save(employee);
    }
    //DELETE http://localhost:8080/employees/{id}
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping(path = "{id}")
    public String deleteEmployeeById(@PathVariable Long id){
        employeeRepository.deleteById(id);
        return "Deleted";
    }

}
