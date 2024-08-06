package com.gustavo.vendasapi.customer;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Entity
@Table(name = "clientes")
public class CustomerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter
    private Long id;

    private String cpf;
    private String nome;
    private String endereco;
    private String telefone;
    private String email;

    @Column(name = "data_nascimento")
    private LocalDate dataNascimento;

    @Setter
    @Column(name = "data_cadastro")
    private LocalDate dataCadastro;


    public CustomerEntity() {
        super();
    }

    public CustomerEntity(
            Long id,
            String nome,
            String email,
            String telefone,
            String cpf,
            String endereco,
            LocalDate dataNascimento,
            LocalDate dataCadastro
    ) {
        this.id = id;
        this.nome = nome;
        this.dataCadastro = dataCadastro;
        this.email = email;
        this.cpf = cpf;
        this.endereco = endereco;
        this.telefone = telefone;
        this.dataNascimento = dataNascimento;
    }

    public CustomerEntity(
            String nome,
            String email,
            String telefone,
            String cpf,
            String endereco,
            LocalDate dataNascimento,
            LocalDate dataCadastro
    ) {
        this.nome = nome;
        this.dataCadastro = dataCadastro;
        this.telefone = telefone;
        this.endereco = endereco;
        this.email = email;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
    }
    @PrePersist
    public void prePersist() {
        setDataCadastro(LocalDate.now());
    }
}
