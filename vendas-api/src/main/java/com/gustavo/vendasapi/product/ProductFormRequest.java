package com.gustavo.vendasapi.product;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ProductFormRequest {

    private Long id;
    private String nome;
    private String descricao;
    private BigDecimal preco;
    private String sku;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataCadastro;

    public ProductFormRequest() {
        super();
    }

    public ProductFormRequest(Long id, String nome, String descricao, BigDecimal preco, String sku, LocalDate dataCadastro) {
        super();
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.sku = sku;
        this.dataCadastro = dataCadastro;
    }

    public ProductEntity toModel() {
        return new ProductEntity(id, nome, descricao, preco, sku, dataCadastro);
    }

    public static ProductFormRequest fromModel(ProductEntity product) {
        return new ProductFormRequest(
                product.getId(),
                product.getNome(),
                product.getDescricao(),
                product.getPreco(),
                product.getSku(),
                product.getDataCadastro()
        );
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
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

    public void setDataCadastro(LocalDate data_cadastro) {
        this.dataCadastro = data_cadastro;
    }
}
