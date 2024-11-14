package com.senacsp.backend.usuario;

public record UsuarioRecordCREATE(
        String name,
        String country,
        String birthdate,
        String email,
        String password,
        String phone
) {
}
