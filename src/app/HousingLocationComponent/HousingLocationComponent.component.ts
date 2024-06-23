import { Component, Input, ViewChild, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeriodicElement } from '../housing-location-component';
import { MatTable } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {RouterLink, RouterOutlet} from '@angular/router';
import { HousingService } from '../housing.service';

@Component({
    selector: 'app-HousingLocationComponent',
    standalone: true,
    imports :[CommonModule, RouterLink, RouterOutlet, MatButtonModule, MatTableModule, MatIconModule],
    templateUrl: '../app.component.html',
    styleUrl:'./HousingLocationComponent.component.css',
})

export class HousingLocation implements OnInit{
    @Input() HousingLocationComponent!: PeriodicElement;
    dataSource: PeriodicElement[] = [];
    columnsToDisplay = ['id','name', 'amount', 'UnitCost'];
    columnsToDisplayWithExpand = [...this.columnsToDisplay];
    expandedElement: PeriodicElement | null = null;
    @ViewChild(MatTable) table!: MatTable<PeriodicElement>;

    constructor(private housingService: HousingService) { }

    async ngOnInit() {
      this.dataSource = await this.housingService.getAllHousingLocations();
      this.table.renderRows();
    }


    async addData(name: string, amount: number, unitCost: string, description: string) {
      const newElement: PeriodicElement = {
        id: this.generateId(),
        name,
        amount: Number(amount),
        UnitCost: `${unitCost} RUB`,
        description
      };
      this.dataSource.push(newElement);
      this.table.renderRows();
      await this.housingService.addHousingLocation(newElement);
    }
    private generateId(): string {
      const randomNumber = Math.floor(Math.random() * 1001);
      return String(randomNumber); 
    }

    async removeData(id: string | undefined | number) {
      await this.housingService.removeHousingLocation(id);
      this.dataSource = this.dataSource.filter(element => element.id !== id);
      this.table.renderRows();
    }

}