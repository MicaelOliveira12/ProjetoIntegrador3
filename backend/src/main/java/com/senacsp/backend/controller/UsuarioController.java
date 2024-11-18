package com.senacsp.backend.controller;

import com.senacsp.backend.usuario.UsuarioModel;
import com.senacsp.backend.usuario.UsuarioRecordCREATE;
import com.senacsp.backend.usuario.UsuarioRecordUPDATE;
import com.senacsp.backend.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.senacsp.backend.service.Criptografia;

import java.util.Optional;

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

    @PutMapping
    public ResponseEntity<UsuarioModel> alterarUsuario(@RequestBody UsuarioRecordUPDATE usuario) {
        Optional<UsuarioModel> usuarioExistente = repository.findById(usuario.id());
        System.out.println(usuario);
        if(usuarioExistente.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        UsuarioModel usuarioAtualizado = usuarioExistente.get();
        usuarioAtualizado.setNomeUsuario(usuario.nomeUsuario());
        usuarioAtualizado.setPaisUsuario(usuario.paisUsuario());
        usuarioAtualizado.setSenhaUsuario(new Criptografia().encriptar(usuario.senhaUsuario()));
        usuarioAtualizado.setDataNascimento(usuario.dataNascimento());
        usuarioAtualizado.setTelefoneUsuario(usuario.telefoneUsuario());

        UsuarioModel usuarioSalvo = repository.save(usuarioAtualizado);

        return ResponseEntity.ok(usuarioSalvo);
    }


}
