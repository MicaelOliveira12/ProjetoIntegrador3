package com.senacsp.backend.usuario;

public record UsuarioRecordUPDATE(
        Long id,
        String nomeUsuario,
        String paisUsuario,
        String dataNascimento,
        String senhaUsuario,
        String telefoneUsuario
) {
}
