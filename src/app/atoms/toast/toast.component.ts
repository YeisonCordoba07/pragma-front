import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  @Input() message: string = '';
  @Input() duration: number = 5000;
  @Input() toastType: "error" | "warning" | "success" | "neutral" = "neutral";
  imgSource: string = "src/assets/icons/toast_neutral.svg"
  toastClass: string = '';

  constructor() { }

  ngOnInit(): void {
    this.chooseImage();
    this.showToast(); // Mostrar el toast al iniciar
  }


  showToast(): void {

    this.toastClass = 'toast-in';
    setTimeout(() => {
    }, 1000);

    setTimeout(() => {
      this.toastClass = 'toast-out';
    }, 3000);

  }

  chooseImage(): void{
    if(this.toastType === "neutral"){
      this.imgSource = "assets/icons/toast_neutral.svg";
    }else if(this.toastType === "error"){
      this.imgSource = "assets/icons/toast_error.svg";
    }else if(this.toastType === "warning"){
      this.imgSource = "assets/icons/toast_warning.svg";
    }else if(this.toastType === "success"){
      this.imgSource = "assets/icons/toast_success.svg";
    }
  }
}
