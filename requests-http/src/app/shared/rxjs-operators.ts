import { HttpEventType } from '@angular/common/http';
import { filter, map, pipe, tap } from 'rxjs';

export function filterResponse() {
    return pipe(
        filter((event: any) => event.type === HttpEventType.Response),
        map((res: any) => res.body)
    )
}

export function uploadProgress(cb: (progress: number) => void) {
    return tap((event: any) => {
        if(event.type === HttpEventType.UploadProgress){
            cb(Math.round((event.loaded * 100) / event.total!))
        }
    })
}