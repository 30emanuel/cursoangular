import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UploadFileService } from '../upload-file.service';
import { filterResponse, uploadProgress } from '../../shared/rxjs-operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  files!: Set<File>
  progress = 0

  constructor(private service: UploadFileService) { }

  ngOnInit(): void {
  }

  onChange(event: any) {
    console.log(event);
    const selectedFiles = <FileList>event.srcElement.files;

    this.files = new Set();
    for (let i = 0; i < selectedFiles.length; i++) {
      this.files.add(selectedFiles[i])
    }
    this.progress = 0
  }

  onUpload(){
    if(this.files && this.files.size > 0){
      this.service.upload(this.files, environment.BASE_URL + '/upload')
      .pipe(
        uploadProgress(progress =>{
          console.log(progress)
          this.progress = progress
        }),
        filterResponse()
      )
      .subscribe(respons => console.log('Upload concluido.'))

      //.subscribe((event: HttpEvent<Object>) => {
        //console.log(event)
      //  if(event.type === HttpEventType.Response){
          //console.log('Upload concluido.')
      //  }else if (event.type === HttpEventType.UploadProgress){
      //    if (event.total) {
      //      const percentDone = Math.round((event.loaded * 100) / event.total)
            //console.log('progresso', percentDone)
      //      this.progress = percentDone
      //    }
        //}
      //})
    }
  }

  onDownloadExcel(){
    this.service.download(environment.BASE_URL + '/downloadExcel')
    .subscribe((res: any) =>{
      this.service.handleFile(res, 'report.xlsx')
    })
  }

  onDownloadPdf(){
    this.service.download(environment.BASE_URL + '/downloadPDF')
    .subscribe((res: any) =>{
      this.service.handleFile(res, 'report.pdf')
    })
  }
}
