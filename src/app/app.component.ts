import { Component, OnInit } from '@angular/core';
import { IAccount } from './model/i-account';
import { SelectItem } from './model/select-item';
import { CommonService } from './service/common.service';
import { MessageService } from './service/message.service';

@Component({
  selector: 'ep-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'poc';
  cars1: IAccount[];
  cars2: IAccount[];
  brands: SelectItem[];
  clonedCars: { [s: string]: IAccount; } = {};

  constructor(private carService: CommonService) { }

  ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars1 = cars);
        this.carService.getCarsSmall().then(cars => this.cars2 = cars);

        this.brands = [
            {label: 'Audi', value: 'Audi'},
            {label: 'BMW', value: 'BMW'},
            {label: 'Fiat', value: 'Fiat'},
            {label: 'Ford', value: 'Ford'},
            {label: 'Honda', value: 'Honda'},
            {label: 'Jaguar', value: 'Jaguar'},
            {label: 'Mercedes', value: 'Mercedes'},
            {label: 'Renault', value: 'Renault'},
            {label: 'VW', value: 'VW'},
            {label: 'Volvo', value: 'Volvo'}
        ];
    }

    onRowEditInit(car: IAccount) {
        this.clonedCars[car.vin] = {...car};
    }

    onRowEditSave(car: IAccount) {
        car.newVal = true;
        console.log('Car'+ JSON.stringify(car));
        console.log('Car Model '+ JSON.stringify(this.cars2));
        if (car.year > 0) {
            delete this.clonedCars[car.vin];
            // this.messageService.add({severity:'success', summary: 'Success', detail:'Car is updated'});
        }
        else {
            // this.messageService.add({severity:'error', summary: 'Error', detail:'Year is required'});
        }
    }

    onRowEditCancel(car: IAccount, index: number) {
        this.cars2[index] = this.clonedCars[car.vin];
        delete this.clonedCars[car.vin];
    }

    paginate(evt){
        console.log('Paginator event: ' + evt);
    }

    save(){
        console.log('Model Data : ' + JSON.stringify(this.cars2));
    }
}
