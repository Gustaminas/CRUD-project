package com.studgustas.Payroll.service.UserDetailsService;

import com.studgustas.Payroll.service.domain.SecurityUser;
import com.studgustas.Payroll.service.repo.EmployeeRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JpaUserDetailsService implements UserDetailsService {
    private final EmployeeRepository employeeRepository;

    public JpaUserDetailsService(EmployeeRepository employeeRepositor) {
        this.employeeRepository = employeeRepositor;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return employeeRepository
                .findByUsername(username)
                .map(SecurityUser::new)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found: " + username));
    }
}
