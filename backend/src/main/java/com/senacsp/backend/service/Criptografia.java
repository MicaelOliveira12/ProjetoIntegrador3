package com.senacsp.backend.service;

import java.util.Base64;

public class Criptografia {

    public String encriptar (String senha) {
        senha = senha + "SENAC2024";
        return Base64.getEncoder().encodeToString(senha.getBytes());
    }

    public String descriptar (String senha){
        String senhaDescripatada = new String(Base64.getDecoder().decode(senha));
        int tamanho = (senhaDescripatada.length() - 9);
        String resultado = senhaDescripatada.substring(0,tamanho );
        return resultado;
    }
}
