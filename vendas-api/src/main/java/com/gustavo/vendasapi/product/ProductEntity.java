package com.gustavo.vendasapi.product;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "produtos")
public class ProductEntity {

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

    public ProductEntity() {
        super();
    }

    public ProductEntity(String nome, String descricao, BigDecimal preco, String sku) {
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.sku = sku;
    }

    public ProductEntity(Long id, String nome, String descricao, BigDecimal preco, String sku, LocalDate dataCadastro) {
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

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public LocalDate getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDate dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    @Override
    public String toString() {
        return "ProductEntity{" +
                "descricao='" + descricao + '\'' +
                ", id=" + id +
                ", nome='" + nome + '\'' +
                ", preco=" + preco +
                ", sku='" + sku + '\'' +
                '}';
    }
}
