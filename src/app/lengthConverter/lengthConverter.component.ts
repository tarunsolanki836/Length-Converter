import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'length-converter',
  templateUrl: './lengthConverter.component.html',
  styleUrls: ['./lengthConverter.component.scss']
})
export class LengthConverter implements OnInit {
  lengthOptions = [
    {
      id: 0,
      label: 'Kilometre',
      unit: 'km'
    },
    {
      id: 1,
      label: 'Metre',
      unit: 'm'
    },
    {
      id: 2,
      label: 'Centimetre',
      unit: 'cm'
    }
  ];

  value1: number | null = null;
  value2: number | null = null;
  unit1: number = 0; // Default to Kilometre
  unit2: number = 1; // Default to Metre
  lastChanged: number = 1;

  ngOnInit() {
  }

  convert(value: number | null, fromUnit: number, toUnit: number): number | null {
    if (value === null) {
      return null;
    }

    let meters;
    // Convert the input value to meters first
    switch (fromUnit) {
      case 0: // Kilometre
        meters = value * 1000;
        break;
      case 1: // Metre
        meters = value;
        break;
      case 2: // Centimetre
        meters = value / 100;
        break;
      default:
        meters = 0;
    }

    // Convert from meters to the target unit
    let result;
    switch (toUnit) {
      case 0: // Kilometre
        result = meters / 1000;
        break;
      case 1: // Metre
        result = meters;
        break;
      case 2: // Centimetre
        result = meters * 100;
        break;
      default:
        result = 0;
    }
    return result;
  }

  onValue1Change(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value1 = value ? parseFloat(value) : null;
    this.lastChanged = 1;
    this.value2 = this.convert(this.value1, this.unit1, this.unit2);
  }

  onValue2Change(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value2 = value ? parseFloat(value) : null;
    this.lastChanged = 2;
    this.value1 = this.convert(this.value2, this.unit2, this.unit1);
  }

  onUnit1Change(event: Event) {
    this.unit1 = parseInt((event.target as HTMLSelectElement).value, 10);
    if (this.lastChanged === 1) {
      this.value2 = this.convert(this.value1, this.unit1, this.unit2);
    } else {
      this.value1 = this.convert(this.value2, this.unit2, this.unit1);
    }
  }

  onUnit2Change(event: Event) {
    this.unit2 = parseInt((event.target as HTMLSelectElement).value, 10);
    if (this.lastChanged === 2) {
      this.value1 = this.convert(this.value2, this.unit2, this.unit1);
    } else {
      this.value2 = this.convert(this.value1, this.unit1, this.unit2);
    }
  }

  getUnitLabel(unitId: number): string {
    const option = this.lengthOptions.find(opt => opt.id === unitId);
    return option ? option.unit : '';
  }
}