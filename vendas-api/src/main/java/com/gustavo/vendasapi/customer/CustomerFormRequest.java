package com.gustavo.vendasapi.customer;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

public class CustomerFormRequest {

    private Long id;
    private String nome;
    private String email;
    private String telefone;
    private String cpf;
    private String endereco;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataNascimento;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataCadastro;


    public CustomerFormRequest() {
        super();
    }

    public CustomerFormRequest(Long id, String nome, String email, String telefone, String cpf, String endereco, LocalDate dataNascimento, LocalDate dataCadastro) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.cpf = cpf;
        this.endereco = endereco;
        this.dataNascimento = dataNascimento;
        this.dataCadastro = dataCadastro;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public LocalDate getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDate dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public CustomerEntity toModel() {
        return new CustomerEntity(id, nome, email, telefone, cpf, endereco, dataNascimento, dataCadastro);
    }

    public static CustomerFormRequest fromModel(CustomerEntity customerEntity) {
        return new CustomerFormRequest(
                customerEntity.getId(),
                customerEntity.getNome(),
                customerEntity.getEmail(),
                customerEntity.getTelefone(),
                customerEntity.getCpf(),
                customerEntity.getEndereco(),
                customerEntity.getDataNascimento(),
                customerEntity.getDataCadastro()
        );
    }
}
