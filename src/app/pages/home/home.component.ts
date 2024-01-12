import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IVeiculo } from 'src/app/models/veiculo.interface';
import { VeiculosService } from 'src/app/service/veiculosService.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  veiculos: IVeiculo[] = [];

  constructor(
    private readonly veiculosService: VeiculosService,
    private readonly route: Router,

  ){}
  ngOnInit(): void {
    this.carregarVeiculos();
  }


  carregarVeiculos(): void {
    this.veiculosService.buscarVeiculos().subscribe({
      next: lista => {
        this.veiculos = lista.veiculos;
      }
    });
  }


  cadastroVeiculo(){
    this.route.navigate(['/cadastro-veiculos']);
  }

  editaVeiculo(id:number){
    this.route.navigate(['/cadastro-veiculos'], {queryParams: {veiculoId: id}});
  }


  deletaVeiculo(veiculoId: number): void {
    this.veiculosService.deletarVeiculo(veiculoId).subscribe({
      next: () => {
        alert('Veículo excluído com sucesso!');
        console.log('Veículo excluído com sucesso!');
        this.carregarVeiculos();
      },
      error: error => {
        console.error('Erro ao excluir veículo:', error);
      }
    });
  }
}
