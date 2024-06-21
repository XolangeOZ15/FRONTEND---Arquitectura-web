import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListaralmacenComponent } from './listaralmacen/listaralmacen.component';

@Component({
  selector: 'app-almacen',
  standalone: true,
  imports: [RouterOutlet,ListaralmacenComponent],
  templateUrl: './almacen.component.html',
  styleUrl: './almacen.component.css'
})
export class AlmacenComponent implements OnInit{
  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {}
  
}
