package com.gustavo.vendasapi.customer;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface CustomerRepository extends JpaRepository<CustomerEntity, Long> {
    @Query("select c from CustomerEntity c where c.nome like %:nome% and c.cpf like %:cpf%")
    Page<CustomerEntity> searchToNameCPF(@Param("nome") String nome, @Param("cpf") String cpf, @Param("pageable") Pageable pageable);
}
