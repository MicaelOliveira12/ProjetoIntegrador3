package com.senacsp.backend.usuario;

public record UsuarioRecordUPDATE(
        Long id,
        String nome,
        String pais,
        String dataNascimento,
        String email,
        String senha,
        String telefone
) {
}
