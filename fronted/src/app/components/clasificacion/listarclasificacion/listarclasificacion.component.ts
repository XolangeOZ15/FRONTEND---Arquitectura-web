import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Clasificacion } from '../../../models/clasificacion';
import { ClasificacionService } from '../../../services/clasificacion.service';

@Component({
  selector: 'app-listarclasificacion',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,RouterLink,MatTableModule],
  templateUrl: './listarclasificacion.component.html',
  styleUrl: './listarclasificacion.component.css'
})
export class ListarclasificacionComponent implements OnInit {
  displayedColumns: String[]= [
    'codigo',
    'nombre',
    'accion01',
    'accion02'
  ];
  dataSource: MatTableDataSource<Clasificacion> = new MatTableDataSource;
  constructor(private cS:ClasificacionService){}
  ngOnInit(): void {
    this.cS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.cS.getList().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data)
    });
  }
  eliminar(id:number){
    this.cS.eliminar(id).subscribe((data)=>{
      this.cS.list().subscribe((data)=>{
        this.cS.setList(data);
      }); 
    });
  }
}
