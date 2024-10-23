import {Component, forwardRef, Input, OnInit, Optional, Self} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from "@angular/forms";

@Component({
  selector: 'app-multi-select-tag',
  templateUrl: './multi-select-tag.component.html',
  styleUrls: ['./multi-select-tag.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectTagComponent),
      multi: true
    }
  ]
})
export class MultiSelectTagComponent implements ControlValueAccessor {
  @Input() inputData: any [] = [];
  @Input() maxSelectedItems: number = 3;
  selectedItems: string[] = [];
  dropdownOpen: boolean = false;

  /*constructor(
    @Self() @Optional() private ngControl: NgControl
  ) {
    // Si el componente se está usando como control de formulario
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
    // En caso contrario se inicializan las funciones de CVA por defecto
    else {
      this.onChange = () => null;
      this.onTouched = () => null;
    }
    // Se inicializa el control como habilitado
    this.disabled = false;
  }*/

  // Metodos de ControlValueAccessor
  onChange: (value: string[]) => void = () => {
  };
  onTouched: () => void = () => {
  };
  disabled: boolean = false;

  // Abrir o cerrar el dropdown
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // Seleccionar o quitar de la seleccion
  toggleSelection(data: string) {
    const index = this.selectedItems.indexOf(data);

    if (index === -1 && this.selectedItems.length < this.maxSelectedItems) {
      this.selectedItems.push(data);
    } else if (index !== -1) {
      this.selectedItems.splice(index, 1);
    }

    this.onChange(this.selectedItems);

  }

  isSelected(data: string): boolean {
    return this.selectedItems.includes(data);
  }

  removeItem(item: string) {
    const index = this.selectedItems.indexOf(item);
    if (index >= 0) {
      this.selectedItems.splice(index, 1);
    }
    this.onChange(this.selectedItems);
  }


  // Métodos de ControlValueAccessor

  writeValue(value: string[]): void {
    if (value) {
      this.selectedItems = value;
    }
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }



}
