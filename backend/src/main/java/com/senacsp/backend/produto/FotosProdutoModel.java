package com.senacsp.backend.produto;

import jakarta.persistence.*;
import lombok.*;

@ToString
@Table (name = "fotos_produto")
@Entity (name = "FotosProduto")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class FotosProdutoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long idProduto;
    private String nomeFoto;
    private String urlFoto;
    private String flagImg;

    public FotosProdutoModel (ProdutoModel produto, FotosProdutoRecord fotos ){
        this.idProduto = produto.getId();
        this.nomeFoto = fotos.nomeFoto();
        this.urlFoto = fotos.urlFoto();
        this.flagImg = fotos.flagImg();
    }
}
