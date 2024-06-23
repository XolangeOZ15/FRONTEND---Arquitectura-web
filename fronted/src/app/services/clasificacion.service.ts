import { Injectable } from "@angular/core";
import { environment } from "../../environments/environments";
import { Subject } from "rxjs";
import { Clasificacion } from "../models/clasificacion";
import { HttpClient } from "@angular/common/http";

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ClasificacionService {

  private url = `${base_url}/clasificaciones`;
  private listaCambio = new Subject<Clasificacion[]>();

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Clasificacion[]>(this.url);
  }
  insert(c: Clasificacion) {
    return this.http.post(this.url, c);
  }
  setList(listaNueva: Clasificacion[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Clasificacion>(`${this.url}/${id}`);
  }
  update(c: Clasificacion) {
    return this.http.put(this.url, c);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }


}