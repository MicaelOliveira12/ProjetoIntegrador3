package com.senacsp.backend.controller;

import com.senacsp.backend.login.LoginModel;
import com.senacsp.backend.login.LoginRecord;
import com.senacsp.backend.login.LoginUsuarioRepository;
import com.senacsp.backend.service.Criptografia;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/login")
@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class LoginController {

    @Autowired
    private LoginUsuarioRepository Loginrepository;

    @PostMapping("")
    @Transactional
    public ResponseEntity <LoginModel> login (@RequestBody LoginRecord login) {
        System.out.println(login);
        String senha = new Criptografia().encriptar(login.senha());

        Optional<LoginModel> loginModel = Loginrepository.findByEmailUsuario(login.email());

        LoginModel response = loginModel.get();

        if(verificarSenha(loginModel.get().getSenhaUsuario(), senha)){
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.notFound().build();
    }

    private boolean verificarSenha (String senha1, String senha2){
        return senha1.equals(senha2);
    }
}
