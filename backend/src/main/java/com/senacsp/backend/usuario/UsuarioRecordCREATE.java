package com.senacsp.backend.usuario;

public record UsuarioRecordCREATE(
        Long id,
        String name,
        String country,
        String birthdate,
        String email,
        String password,
        String phone
) {
}
