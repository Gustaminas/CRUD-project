package com.studgustas.Payroll.service.domain;

import jakarta.annotation.Generated;
import jakarta.persistence.*;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.Objects;

import static jakarta.persistence.GenerationType.AUTO;
@Entity
@ComponentScan("com.studgustas.Payroll.service")
@EnableJpaRepositories(basePackages = {"com.studgustas.Payroll.service"})
@Table(name = "employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String position;
    private float payroll;

    private String username;
    private String password;
    private String roles;

    //CONSTRUCTORS
    //Used by JPA
    public Employee (){}

    public Employee(String firstName, String lastName) {
         this.firstName = firstName;
         this.lastName = lastName;
    }
    public Employee(String firstName, String lastName, String email, String position, float payroll, String username, String password, String roles) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.position = position;
        this.payroll = payroll;

        this.username = username;
        this.password = password;
        this.roles = roles;
    }

    //GET SET METHODS
    public Long getId() {return id;}
    public void setId(Long id) {
        this.id = id;
    }

    public String getLastName() {return lastName;}
    public void setLastName(String lastName) {this.lastName = lastName;}

    public String getFirstName() {return firstName;}
    public void setFirstName(String firstName) {this.firstName = firstName;}

    public String getEmail() {return email;}
    public void setEmail(String email) {this.email = email;}

    public String getPosition() {return position;}
    public void setPosition(String position) {this.position = position;}

    public float getPayroll() {return payroll;}
    public void setPayroll(float payroll) {this.payroll = payroll;}

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public String getRoles() {
        return roles;
    }
    public void setRoles(String roles) {
        this.roles = roles;
    }
    //EQUALS
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Employee employee = (Employee) o;
        return Float.compare(employee.payroll, payroll) == 0 && Objects.equals(id, employee.id) && Objects.equals(firstName, employee.firstName) && Objects.equals(lastName, employee.lastName) && Objects.equals(email, employee.email) && Objects.equals(position, employee.position);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstName, lastName, email, position, payroll);
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", position='" + position + '\'' +
                ", payroll=" + payroll +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", roles='" + roles + '\'' +
                '}';
    }
}
