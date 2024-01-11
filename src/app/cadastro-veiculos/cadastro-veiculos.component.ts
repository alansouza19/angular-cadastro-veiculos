import { Component, OnInit } from '@angular/core';
import { VeiculosService } from '../service/veiculosService.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IVeiculo } from '../models/veiculo.interface';


@Component({
  selector: 'app-cadastro-veiculos',
  templateUrl: './cadastro-veiculos.component.html',
  styleUrls: ['./cadastro-veiculos.component.scss']
})
export class CadastroVeiculosComponent {


  veiculoForm = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(''),
    marca: new FormControl(''),
    modelo: new FormControl(''),
    foto: new FormControl(''),
    valor: new FormControl(''),
    quilometro: new FormControl('')
  });

  constructor(
   
    private readonly veiculosService: VeiculosService,
    private readonly route: Router,
    private readonly router: ActivatedRoute,
  ){
    this.router.queryParams.subscribe({
      next: (params) => {
        if(params?.['veiculoId']){
          this.veiculosService.buscarPorId(params?.['veiculoId']).subscribe({
            next: veiculo => {
              this.veiculoForm.get('id')?.setValue(veiculo.id)
              this.veiculoForm.get('nome')?.setValue(veiculo.nome)
              this.veiculoForm.get('marca')?.setValue(veiculo.marca)
              this.veiculoForm.get('modelo')?.setValue(veiculo.modelo)
              this.veiculoForm.get('foto')?.setValue(veiculo.foto)
              this.veiculoForm.get('valor')?.setValue(veiculo.valor)
              this.veiculoForm.get('quilometro')?.setValue(veiculo.quilometro)
            }

          })
        }
      }
    })

  }

  
  submit() {
    if(this.veiculoForm.get('id')?.value){
      this.veiculosService.atualizarVeiculo(this.veiculoForm.value as IVeiculo).subscribe({
        next: () =>{
          alert("Veículo atualizado com sucesso");
          this.route.navigate(['/home']);
        }
      })
    } else{
    this.veiculosService.cadastrarVeiculo(this.veiculoForm.value as IVeiculo).subscribe({
      next: veiculo =>{
        alert("Veículo cadastrado com sucesso");
          this.route.navigate(['/home']);
        }
      });
    }
  }



}
