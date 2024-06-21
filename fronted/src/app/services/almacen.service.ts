import { Subject } from "rxjs/internal/Subject";
import { environment } from "../../environments/environments";
import { Almacen } from "../models/almacen";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class AlmacenService {
    
  private url = `${base_url}/almacenes`;
  private listaCambio = new Subject<Almacen[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Almacen[]>(this.url);
  }
  insert(b: Almacen) {
    return this.http.post(this.url, b);
  }
  setList(listaNueva: Almacen[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Almacen>(`${this.url}/${id}`);
  }
  update(b:Almacen) { 
    return this.http.put(this.url,b);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  
}