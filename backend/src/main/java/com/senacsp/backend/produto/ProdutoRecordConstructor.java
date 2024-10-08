package com.senacsp.backend.produto;

import java.util.List;

public record ProdutoRecordConstructor (
        ProdutoRecord produto,
        List<FotosProdutoRecord> fotosProdutoRecord){

}