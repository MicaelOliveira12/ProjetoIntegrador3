package com.senacsp.backend.usuario;

import com.senacsp.backend.service.Criptografia;
import jakarta.persistence.*;
import lombok.*;

import java.util.Optional;
@ToString
@Table(name = "logins")
@Entity(name = "Usuario")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class UsuarioModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeUsuario;
    private String paisUsuario;
    private String emailUsuario;
    private String senhaUsuario;
    private String dataNascimento;
    private String telefoneUsuario;

    public UsuarioModel(UsuarioRecordCREATE usuario) {

        this.nomeUsuario = usuario.name();
        this.paisUsuario = usuario.country();
        this.emailUsuario = usuario.email();
        this.senhaUsuario = new Criptografia().encriptar(usuario.password());
        this.dataNascimento = usuario.birthdate();
        this.telefoneUsuario = usuario.phone();
    }

    public UsuarioModel(UsuarioRecordUPDATE usuario) {

        this.id = usuario.id();
        this.nomeUsuario = usuario.nomeUsuario();
        this.paisUsuario = usuario.paisUsuario();
        this.senhaUsuario = new Criptografia().encriptar(usuario.senhaUsuario());
        this.dataNascimento = usuario.dataNascimento();
        this.telefoneUsuario = usuario.telefoneUsuario();
    }

    public UsuarioModel(Optional<UsuarioModel> usuarioModel) {

        if (usuarioModel.isPresent()) {
            this.id = usuarioModel.get().getId();
            this.nomeUsuario = usuarioModel.get().getNomeUsuario();
            this.paisUsuario = usuarioModel.get().getPaisUsuario();
            this.emailUsuario = usuarioModel.get().getEmailUsuario();
            this.senhaUsuario = new Criptografia().descriptar(usuarioModel.get().getSenhaUsuario());
            this.dataNascimento = usuarioModel.get().getDataNascimento();
            this.telefoneUsuario = usuarioModel.get().getTelefoneUsuario();
        }
    }

}
