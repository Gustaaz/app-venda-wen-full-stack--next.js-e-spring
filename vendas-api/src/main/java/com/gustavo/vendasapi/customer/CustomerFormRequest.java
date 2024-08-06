package com.gustavo.vendasapi.customer;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;

import java.time.LocalDate;

@Getter
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

    public CustomerFormRequest(
            Long id,
            String nome,
            String email,
            String telefone,
            String cpf,
            String endereco,
            LocalDate dataNascimento,
            LocalDate dataCadastro
    ) {
        this.dataCadastro = dataCadastro;
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.cpf = cpf;
        this.endereco = endereco;
        this.dataNascimento = dataNascimento;
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
