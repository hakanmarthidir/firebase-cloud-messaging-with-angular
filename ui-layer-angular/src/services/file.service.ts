import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FileParameter } from 'src/models/file.model';

@Injectable()
export class FileService {


    constructor(private httpClient: HttpClient) { }

    postParameters(fileParameters: FileParameter) {
        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
        return this.httpClient.post<FileParameter>('http://localhost:3000/api/filecreate', fileParameters, options)
            .pipe(catchError(this.handleError<FileParameter>('postParameters')));
    }
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
}
