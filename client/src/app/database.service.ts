import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    public loadSortedFonts() {
        return fetch('http://localhost:5000').then(res => res.text());
    }

    public loadAllFonts() {
        return fetch('http://localhost:5000/all').then(res => res.text());
    }

    public updateFonts(fonts: string[]) {
        console.log(fonts.join('\n'));

        return fetch('http://localhost:5000/update', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({content: fonts.join('\n')})
        }).then(res => res.text());
    }
}
