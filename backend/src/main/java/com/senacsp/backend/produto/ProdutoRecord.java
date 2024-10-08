package com.senacsp.backend.produto;

public record ProdutoRecord(
        Long id,
        String nomeProduto,
        String descricaoProduto,
        Double precoProduto,
        Integer qtdEstoque,
        String ativoInativo,
        String imagemPrincipal
) {
}
