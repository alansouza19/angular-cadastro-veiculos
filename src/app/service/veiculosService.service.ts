import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVeiculo } from '../models/veiculo.interface';

@Injectable({
  providedIn: 'root',
})
export class VeiculosService {
  private apiUrl = 'http://127.0.0.1:5000';  

  constructor(private http: HttpClient) {}

  buscarPorId(id:number): Observable<IVeiculo>{
    return this.http.get<IVeiculo>(`${this.apiUrl}/veiculos/${id}`);
  }

  buscarVeiculos(): Observable<IVeiculo[]> {
    return this.http.get<IVeiculo[]>(`${this.apiUrl}/veiculos`);
  }

  cadastrarVeiculo(veiculo: IVeiculo): Observable<IVeiculo> {
    return this.http.post<IVeiculo>(`${this.apiUrl}/veiculos`, veiculo);
  }

  atualizarVeiculo(veiculo: IVeiculo): Observable<IVeiculo> {
    return this.http.put<IVeiculo>(`${this.apiUrl}/veiculos`, veiculo);
  }

  deletarVeiculo(veiculoId: number): Observable<IVeiculo> {
    return this.http.delete<IVeiculo>(`${this.apiUrl}/veiculos/${veiculoId}`);
  }
}

