import { Clasificacion } from './../../../models/clasificacion';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClasificacionService } from '../../../services/clasificacion.service';
@Component({
  selector: 'app-creaeditaclasificacion',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterLink,
    NgIf,
    CommonModule
  ],
  templateUrl: './creaeditaclasificacion.component.html',
  styleUrl: './creaeditaclasificacion.component.css'
})
export class CreaeditaclasificacionComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  clasificacion: Clasificacion = new Clasificacion();
  edicion: boolean = false;
  mensaje: string = "";
  id: number = 0

  constructor(
    private cS: ClasificacionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.Init()
    });
    this.form = this.formBuilder.group({
      codigo1: [''],
      nombre: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.clasificacion.idClasificacion = this.form.value.codigo1;
      this.clasificacion.nombreClasificacion = this.form.value.nombre;
      if (this.edicion) {
        this.cS.update(this.clasificacion).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      else {
        this.cS.insert(this.clasificacion).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      this.router.navigate(['clasificaciones']);
    }
  }
}

  Init() {
    if (this.edicion){
    this.cS.listId(this.id).subscribe((data)=>{
      this.form = new FormGroup({
        codigo1: new FormControl(data.idClasificacion),
        nombre: new FormControl(data.nombreClasificacion)
      });
    });
  }
  }
}
