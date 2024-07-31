package com.gustavo.vendasapi.customer;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/customers")
@CrossOrigin("*")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping
    public ResponseEntity<CustomerFormRequest> save(@RequestBody CustomerFormRequest customerFormRequest) {
        CustomerEntity customer = customerFormRequest.toModel();
        customerRepository.save(customer);
        return ResponseEntity.ok(CustomerFormRequest.fromModel(customer));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody CustomerFormRequest customerFormRequest) {
        Optional<CustomerEntity> customerExists = customerRepository.findById(id);

        if (customerExists.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        CustomerEntity customer = customerFormRequest.toModel();
        customer.setId(id);
        customerRepository.save(customer);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerFormRequest> getById(@PathVariable Long id) {
        Optional<CustomerEntity> customerExists = customerRepository.findById(id);

        return customerExists.map(customerEntity -> ResponseEntity.ok(CustomerFormRequest.fromModel(customerEntity))).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Optional<CustomerEntity> customerExists = customerRepository.findById(id);
        if(customerExists.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        customerRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public List<CustomerFormRequest> getAll() {
        return customerRepository.findAll().stream().map(CustomerFormRequest::fromModel).toList();
    }
}
