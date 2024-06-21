import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarclasificacionComponent } from './listarclasificacion/listarclasificacion.component';

@Component({
  selector: 'app-clasificacion',
  standalone: true,
  imports: [RouterOutlet,ListarclasificacionComponent],
  templateUrl: './clasificacion.component.html',
  styleUrl: './clasificacion.component.css'
})
export class ClasificacionComponent implements OnInit {
  constructor(public route: ActivatedRoute){}
    
  ngOnInit(): void {

  }

}
