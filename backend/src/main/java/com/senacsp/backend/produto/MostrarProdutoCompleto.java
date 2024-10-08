package com.senacsp.backend.produto;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

public class MostrarProdutoCompleto {
    public ProdutoRecordConstructor response(
            ProdutoRepository produtoRepository,
            FotosProdutoRepository fotosProdutoRepository,
            Long id
    ){
        Optional<ProdutoModel> produtoModel = produtoRepository.findById(Integer.parseInt(id.toString()));
        ProdutoRecord produtoRecord =
                new ProdutoRecord(
                        produtoModel.get().getId(),
                        produtoModel.get().getNomeProduto(),
                        produtoModel.get().getDescricaoProduto(),
                        produtoModel.get().getPrecoProduto(),
                        produtoModel.get().getQtdEstoque(),
                        produtoModel.get().getAtivoInativo(),
                        produtoModel.get().getImagemPrincipal()
                );

        LinkedList<FotosProdutoRecord> fotosResponse = new LinkedList<>();

        Optional<List<FotosProdutoModel>> fotosProdutoModel = fotosProdutoRepository.buscarFotosPorIdProduto(id);
        for(FotosProdutoModel fotos : fotosProdutoModel.get()){
            FotosProdutoRecord foto =
                    new FotosProdutoRecord(
                            Integer.parseInt(fotos.getIdProduto().toString()),
                            fotos.getNomeFoto(),
                            fotos.getUrlFoto(),
                            fotos.getFlagImg()
                    );
            fotosResponse.add(foto);
        }
        ProdutoRecordConstructor response = new ProdutoRecordConstructor(produtoRecord, fotosResponse);

        return response;
    }
}
