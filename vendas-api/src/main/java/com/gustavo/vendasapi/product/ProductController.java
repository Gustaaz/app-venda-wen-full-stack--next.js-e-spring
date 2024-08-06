package com.gustavo.vendasapi.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
@CrossOrigin("*")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @PostMapping
    public ProductFormRequest save(@RequestBody ProductFormRequest productFormRequest) {

        Product product = productFormRequest.toModel();

        productRepository.save(product);

        productFormRequest = ProductFormRequest.fromModel(product);
        return productFormRequest;
    }

    @GetMapping
    public List<ProductFormRequest> getAll() {
        return productRepository.findAll().stream().map(ProductFormRequest::fromModel).toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductFormRequest> getById(@PathVariable Long id) {
        Optional<Product> productExists = productRepository.findById(id);
        return productExists.map(product -> ResponseEntity.ok(ProductFormRequest.fromModel(product))).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody ProductFormRequest productFormRequest) {
        Optional<Product> productExists = productRepository.findById(id);

        if(productExists.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Product product = productFormRequest.toModel();
        product.setId(id);
        productRepository.save(product);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Optional<Product> productExists = productRepository.findById(id);
        if(productExists.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        productRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
