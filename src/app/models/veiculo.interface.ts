export interface IVeiculo{
    id:number;
    marca:string;
    modelo:string;
    nome:string;
    quilometro:string;
    valor:string;
    foto:string;
}
export interface ListaIVeiculos{
    veiculos:IVeiculo[];
}