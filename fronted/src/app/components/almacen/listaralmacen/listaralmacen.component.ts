import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Almacen } from '../../../models/almacen';
import { AlmacenService } from '../../../services/almacen.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listaralmacen',
  standalone: true,
  imports: [MatTableModule,RouterLink,MatIconModule,MatButtonModule],
  templateUrl: './listaralmacen.component.html',
  styleUrl: './listaralmacen.component.css'
})
export class ListaralmacenComponent implements OnInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3','c4','accion01','accion02'];
  dataSource: MatTableDataSource<Almacen> = new MatTableDataSource();
  constructor(private aS: AlmacenService) { }

  ngOnInit(): void {
    this.aS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data)
    });
    this.aS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data)
    });
  }
  eliminar(id:number){
    this.aS.eliminar(id).subscribe((data)=>{
      this.aS.list().subscribe((data)=>{
        this.aS.setList(data);
      }); 
    });
  }
}
