import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Cidade } from '../Cidade';
import { Estado } from '../Estado';
import { delay, tap, take, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class EnderecoService {
  constructor(private http: HttpClient) {}

  getEstadosBr() {
    return this.http.get<Estado[]>('./assets/dados/Estados.json');
  }
  getCidade(id: any) {
    return this.http
      .get<Cidade[]>('./assets/dados/Cidades.json')
      .pipe(map((cidades: Cidade[]) => cidades.filter((c) => c.estado == id)));
  }
  getCep(cep: string) {
    return this.http
      .get('https://viacep.com.br/ws/' + cep + '/json')
      .pipe(take(1));
  }
}
