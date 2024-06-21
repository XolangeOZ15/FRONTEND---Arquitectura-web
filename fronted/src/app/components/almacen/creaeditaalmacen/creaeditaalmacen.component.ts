import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgIf } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Almacen } from '../../../models/almacen';
import { Clasificacion } from '../../../models/clasificacion';
import { ClasificacionService } from '../../../services/clasificacion.service';
import { AlmacenService } from '../../../services/almacen.service';


@Component({
  selector: 'app-creaeditaalmacen',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    CommonModule,
    NgIf,
    MatNativeDateModule,
    MatDatepickerModule,
    ReactiveFormsModule],
  templateUrl: './creaeditaalmacen.component.html',
  styleUrl: './creaeditaalmacen.component.css'
})
export class CreaeditaalmacenComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  almacen: Almacen = new Almacen();
  listaClasificacion: Clasificacion[] = [];
  id:number=0;
  edicion:boolean=false;
  
  constructor(
    private cS: ClasificacionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private aS: AlmacenService,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.Init()
    });
    this.form = this.formBuilder.group({
      c1: ['', Validators.required],
      c2: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(300),
          
        ],
      ],
      c3: [
        '', Validators.required
      ],
    });
    this.cS.list().subscribe((data) => {
      this.listaClasificacion = data;
    });
  }
   aceptar(): void {
    if (this.form.valid) {
      this.almacen.capacidadAlmacen = this.form.value.c1;
      this.almacen.direccionAlmacen = this.form.value.c2;
      this.almacen.clasificacion.idClasificacion = this.form.value.c3;
      if(this.edicion){
      this.aS.update(this.almacen).subscribe((data) => {
        this.aS.list().subscribe((data) => {
          this.aS.setList(data);
        });
      });}
      else {
        this.aS.insert(this.almacen).subscribe((data) => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
        });
      this.router.navigate(['almacenes']);
    }}
  }
  Init() {
    if (this.edicion){
      this.aS.listId(this.id).subscribe((data)=>{
        this.form = new FormGroup({
          c1: new FormControl(data.capacidadAlmacen),
          c2: new FormControl(data.direccionAlmacen),
          c3: new FormControl(data.clasificacion.idClasificacion)
        });
      });
    }
  }

}


