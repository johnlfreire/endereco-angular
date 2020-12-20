import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cidade } from '../Cidade';
import { Estado } from '../Estado';
import { HttpClient } from '@angular/common/http';
import { EnderecoService } from './endereco.service';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css'],
})
export class EnderecoComponent implements OnInit {
  form: FormGroup;
  cidades: Cidade[] = [];
  estados: Estado[] = [];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private estado: EnderecoService
  ) {
    this.form = this.fb.group({
      cep: [''],
      logradouro: [''],
      numero: [''],
      complemento: [''],
      bairro: [''],
      uf: [''],
      cidade: [''],
    });
  }
  ngOnInit(): void {
    this.estado.getEstadosBr().subscribe((estados) => (this.estados = estados));
  }

  searchCep() {
    this.estado
      .getCep(this.form.get('cep')?.value.replace('-', ''))
      .subscribe((data) => {
        this.carregarCidade((data as any).uf);
        this.form.patchValue({
          logradouro: (data as any).logradouro,
          bairro: (data as any).bairro,
          uf: (data as any).uf,
          cidade: (data as any).localidade,
        });
      });
  }
  dropdownEstado() {
    this.carregarCidade(this.form.get('uf')?.value);
  }

  carregarCidade(siglaEstado: string) {
    let idEstado = this.estados.find((element) => element.sigla == siglaEstado)
      ?.id;
    this.estado.getCidade(idEstado).subscribe((data) => (this.cidades = data));
  }
}
