package com.senacsp.backend.login;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface LoginUsuarioRepository extends JpaRepository<LoginModel, Long> {

    Optional<LoginModel> findByEmailUsuario(String email);
}
