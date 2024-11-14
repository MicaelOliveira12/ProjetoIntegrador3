package com.senacsp.backend.controller;

import com.senacsp.backend.usuario.UsuarioModel;
import com.senacsp.backend.usuario.UsuarioRecordCREATE;
import com.senacsp.backend.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    @PostMapping
    public UsuarioModel criarUsuario(@RequestBody UsuarioRecordCREATE usuario) {
        System.out.println(usuario);
        return repository.save(new UsuarioModel(usuario));
    }
}
