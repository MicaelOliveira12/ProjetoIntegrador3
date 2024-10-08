package com.senacsp.backend.produto;

import jakarta.persistence.*;
import lombok.*;

@ToString
@Table (name = "produto")
@Entity (name = "Produto")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode (of = "id")
public class ProdutoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeProduto;
    private String descricaoProduto;
    private double precoProduto;
    private int qtdEstoque;
    private String ativoInativo;
    private String imagemPrincipal;

    public ProdutoModel (ProdutoRecordConstructor produto) {

        if(produto.produto().id() != null){
            this.id = produto.produto().id();
        }
        this.nomeProduto = produto.produto().nomeProduto();
        this.descricaoProduto = produto.produto().descricaoProduto();
        this.precoProduto = produto.produto().precoProduto();
        this.qtdEstoque = produto.produto().qtdEstoque();
        this.ativoInativo = produto.produto().ativoInativo();
        this.imagemPrincipal = produto.produto().imagemPrincipal();

    }
}

