import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormValidations } from '../form-validator';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent implements OnInit {

  //@Input() mostrarErro: boolean = false 
  //@Input() msgErro: string = ''

  @Input() control: any
  @Input() label: string = ''

  constructor() { }

  ngOnInit(): void {
  }

  get errorMsg(){
    for(const propertyName in this.control.errors){
      if(this.control.errors.hasOwnProperty(propertyName) && this.control.touched){
        return FormValidations.getErrorMessage(this.label, propertyName, this.control.errors[propertyName])
      }
    }

    return null
  }

}
