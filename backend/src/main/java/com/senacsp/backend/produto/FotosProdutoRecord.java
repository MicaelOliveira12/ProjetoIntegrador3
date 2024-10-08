package com.senacsp.backend.produto;

public record FotosProdutoRecord(
        Integer idProduto,
        String nomeFoto,
        String urlFoto,
        String flagImg
) {
}
