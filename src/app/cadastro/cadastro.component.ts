import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { ConsultaCepService } from '../service/consulta-cep.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(private router: Router, private cepService: ConsultaCepService) { }

  ngOnInit(): void {
  }

  cadastrar(form : NgForm){
    /*
    if (form.valid){
      this.router.navigate(['./sucesso']);
    }else {
      alert('Formulario invalido')
    }
    */
    console.log(form.controls)

  }

  consultaCep(e : any, f: NgForm) {
    const cep = e.target.value;

    if (cep !== '') {
      this.cepService.getConsultaCep(cep).subscribe(result => {
        this.populandoEndereco(result, f)
      });
    }

  }
  populandoEndereco (dados: any, f: NgForm) {
   f.form.patchValue({
    endereco: dados.logradouro,
    complemento: dados.complemento,
    bairro: dados.bairro,
    cidade: dados.localidade,
    estado: dados.uf,
   }) 
  }
}
