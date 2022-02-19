import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Turno} from "../../Models/turno";

@Injectable({
  providedIn: 'root'
})
export class ComunService {

  public requestUrl = 'https://localhost:7001/api/v1/Turno'

  constructor(private http: HttpClient) { }

  getConfig() {
    return this.http.get<Turno[]>(this.requestUrl);
  }

}
