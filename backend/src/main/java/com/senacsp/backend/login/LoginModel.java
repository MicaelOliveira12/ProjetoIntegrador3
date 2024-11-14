package com.senacsp.backend.login;

import com.senacsp.backend.service.Criptografia;
import jakarta.persistence.*;
import lombok.*;

@Table(name = "logins")
@Entity(name = "login")
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class LoginModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String emailUsuario;
    private String senhaUsuario;
    private String nomeUsuario;

    public LoginModel(LoginRecord login) {
        this.emailUsuario = login.email();
        this.senhaUsuario = new Criptografia().encriptar(login.senha());
    }
}
