import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-multi-select-tag',
  templateUrl: './multi-select-tag.component.html',
  styleUrls: ['./multi-select-tag.component.scss']
})
export class MultiSelectTagComponent implements OnInit {
  @Input() inputData: any [] = [];
  selectedItems: string[] = [];
  dropdownOpen: boolean = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleSelection(data: string) {
    const index = this.selectedItems.indexOf(data);

    if (index === -1 && this.selectedItems.length < 3) {
      this.selectedItems.push(data);
    } else if (index !== -1 && this.selectedItems.length === 3) {
      this.selectedItems.splice(index, 1);
    }else if(index !== -1){
      this.selectedItems.splice(index, 1);
    }

  }

  isSelected(data: string): boolean {
    return this.selectedItems.includes(data);
  }

  removeItem(item: string) {
    const index = this.selectedItems.indexOf(item);
    if (index >= 0) {
      this.selectedItems.splice(index, 1);
    }
  }


  ngOnInit(): void {
  }

}
