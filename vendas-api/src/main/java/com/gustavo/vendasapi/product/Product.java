package com.gustavo.vendasapi.product;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "produtos")
@Getter @Setter
@ToString @EqualsAndHashCode
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false, length = 100)
    private String nome;

    @Column(name = "descricao", nullable = false)
    private String descricao;

    @Column(name = "preco", nullable = false, precision = 16, scale = 2)
    private BigDecimal preco;

    @Column(name = "sku", nullable = false, length = 100)
    private String sku;

    @Column(name = "data_cadastro")
    private LocalDate dataCadastro;

    public Product() {
        super();
    }

    public Product(String nome, String descricao, BigDecimal preco, String sku) {
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.sku = sku;
    }

    public Product(Long id, String nome, String descricao, BigDecimal preco, String sku, LocalDate dataCadastro) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.sku = sku;
        this.dataCadastro = dataCadastro;
    }

    @PrePersist
    public void prePersist() {
       setDataCadastro(LocalDate.now());
    }
}
