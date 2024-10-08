package com.senacsp.backend.produto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FotosProdutoRepository extends JpaRepository <FotosProdutoModel, Long> {

    @Query("SELECT fp FROM FotosProduto fp WHERE fp.idProduto = :produtoId")
    Optional<List<FotosProdutoModel>> buscarFotosPorIdProduto(@Param("produtoId") Long produtoId);

}
