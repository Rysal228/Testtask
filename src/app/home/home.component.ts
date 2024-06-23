import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HousingLocation} from '../HousingLocationComponent/HousingLocationComponent.component';
import { PeriodicElement } from '../housing-location-component';
import { HousingService } from '../housing.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule,
    HousingLocation ],
  template: `
<section>
</section>
<section class="results" >
    <app-HousingLocationComponent >
    </app-HousingLocationComponent>
</section>
  `,
})
export class HomeComponent {
        HousingLocationComponentList:PeriodicElement[]=[];
    
        housingService: HousingService = inject(HousingService);
        filteredLocationList: PeriodicElement[] = [];
}
