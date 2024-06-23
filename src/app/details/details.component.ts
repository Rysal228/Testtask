import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { PeriodicElement } from '../housing-location-component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <article>
    <section>
    <h2 class="listing-heading">{{housingLocation?.name}}</h2>
    </section>
    <section class="listing-features">
    <h2 class="section-heading">About this product</h2>
    <ul>
        <li>Product Name: {{housingLocation?.name}}</li>
        <li>Quantity of goods: {{housingLocation?.amount}}</li>
        <li>The quantity of the product: {{housingLocation?.UnitCost}}</li>
        <li>Product description: {{housingLocation?.description}}</li>
    </ul>
    <h3>Change product settings</h3>
    <ul>
        <li> <input type="text" class= "input" placeholder="Name" #nameInput/> </li>
        <li> <input type="number" class= "input" placeholder="Amount" #amountInput/> </li>
        <li> <input type="number" class= "input" placeholder="Unit Cost" #UnitCostInput/> </li>
        <li> <input type="text" class= "input" placeholder="Description" #descriptionInput/> </li>
        <li> <button type="button" (click)="changeSettings(nameInput.value, amountInput.valueAsNumber, UnitCostInput.value, descriptionInput.value)"> Submit </button> </li>
    </ul>
    </section>
  </article>
  `,
  styleUrl: './details.component.css'
})


export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: PeriodicElement | undefined;
  //Для изменения описания продукта
  async changeSettings(name: string, amount: number, unitCost: string, description: string) {
    const updatedData: Partial<PeriodicElement> = {};

    updatedData.name = name || this.housingLocation?.name;
    updatedData.amount = !isNaN(amount) ? amount : this.housingLocation?.amount;
    updatedData.UnitCost = unitCost || this.housingLocation?.UnitCost;
    updatedData.description = description || this.housingLocation?.description;

    if (Object.keys(updatedData).length > 0) {
      const housingLocationId = this.route.snapshot.params['id'];
      await this.housingService.updateHousingLocation(housingLocationId, updatedData);
      this.updateLocalData(updatedData);
    }
  }

  //Чтобы сразу обновлялся details.component.ts
  updateLocalData(updatedData: Partial<PeriodicElement>) {
    if (this.housingLocation) {
      if (updatedData.name) {
        this.housingLocation.name = updatedData.name;
      }
      if (updatedData.amount !== undefined) {
        this.housingLocation.amount = updatedData.amount;
      }
      if (updatedData.UnitCost) {
        this.housingLocation.UnitCost = updatedData.UnitCost;
      }
      if (updatedData.description) {
        this.housingLocation.description = updatedData.description;
      }
    }
  }
  constructor() {
    const housingLocationId = this.route.snapshot.params['id'];
    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
        this.housingLocation = housingLocation;
    });

}



}
