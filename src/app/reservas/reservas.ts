import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservas',
  standalone: false,
  templateUrl: './reservas.html',
  styleUrl: './reservas.css',
})
export class Reservas implements OnInit {
  reservasForm!: FormGroup;
  destino = ['Paris', 'Nova York', 'Tokio', 'Rio de Janeiro'];

  constructor(private fb: FormBuilder){}

  ngOnInit(){
    this.reservasForm = this.fb.group({
      destino: ['', Validators.required],
      dataIda: ['', Validators.required],
      dataVolta: ['', Validators.required],
      passageiros: [
        '',
        [Validators.required, Validators.min(1), Validators.max(5)]
      ],
      email: ['', [Validators.required, Validators.email]]
    }, { validators: this.validarDatas });

    
    const savedData = localStorage.getItem('reservasForm');
    if (savedData) {
      this.reservasForm.setValue(JSON.parse(savedData));
    }

   
    this.reservasForm.valueChanges.subscribe(value => {
      localStorage.setItem('reservasForm', JSON.stringify(value));
    });
  }

  validarDatas(group: FormGroup) {
    const dataIda = new Date(group.get('dataIda')?.value);
    const dataVolta = new Date(group.get('dataVolta')?.value);
    return dataVolta >= dataIda ? null : { dataInvalida: true };
  }

  onSubmit(){
    if (this.reservasForm.valid){
      console.log(this.reservasForm.value);
      localStorage.removeItem('reservas');
      this.reservasForm.reset();
    }
  }

}

