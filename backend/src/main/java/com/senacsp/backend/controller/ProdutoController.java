package com.senacsp.backend.controller;

import com.senacsp.backend.produto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/produto")
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private FotosProdutoRepository fotosProdutoRepository;

    @PostMapping("/cadastrar-produto")
    public ResponseEntity<Long> cadastrarProduto (@RequestBody ProdutoRecordConstructor produto){

        System.out.println(produto.produto());
        System.out.println(produto);

        ProdutoModel produtoNovo = produtoRepository.save(new ProdutoModel(produto));

        for (FotosProdutoRecord fotoRecord : produto.fotosProdutoRecord()){
            FotosProdutoModel fotosProdutoModel =
                    new FotosProdutoModel(produtoNovo, fotoRecord);
            fotosProdutoRepository.save(fotosProdutoModel);
        }

        Long idProdutoNovo = Long.parseLong(String.valueOf(produtoNovo.getId()));
        return ResponseEntity.ok (idProdutoNovo);
    }

    @GetMapping("/listar")
    public Page<ProdutoModel> listarProdutos(@PageableDefault(size = 20, sort = {"id"}, direction = Sort.Direction.DESC) Pageable pagina){
        return produtoRepository.findAll(pagina);
    }

    @GetMapping("/listar-produto-completo/{id}")
    public ResponseEntity <ProdutoRecordConstructor> mostrarProdutoCompleto(@PathVariable Long id){
        return ResponseEntity.ok(new MostrarProdutoCompleto().response(produtoRepository, fotosProdutoRepository,id));
    }

}