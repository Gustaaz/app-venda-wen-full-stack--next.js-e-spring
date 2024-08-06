package com.gustavo.vendasapi.customer;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
        // return Ok(repo.save(Model))
        /**
         * Entity retornada da View
         */
        CustomerEntity customer = customerFormRequest.toModel();
        /**
         * Reposotorio persiste o Entity
         */
        customerRepository.save(customer);
        /**
         * Response da View
         */
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
    public Page<CustomerFormRequest> getAll(@RequestParam(value="nome", required = false, defaultValue = "") String nome, @RequestParam(value="cpf", required = false, defaultValue = "") String cpf, Pageable pageable) {
       return customerRepository.searchToNameCPF(nome, cpf, pageable).map(CustomerFormRequest::fromModel);
    }
}
