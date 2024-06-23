import { Injectable } from '@angular/core';
import { PeriodicElement } from './housing-location-component';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  url = 'http://localhost:3000/PeriodicElement';

async getAllHousingLocations(): Promise<PeriodicElement[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
}

async getHousingLocationById(id: number | string): Promise<PeriodicElement | undefined> {
  const data = await fetch(`${this.url}/${id}`);
  return await data.json() ?? {};
}

async addHousingLocation(newLocation: PeriodicElement): Promise<PeriodicElement> {
  const response = await fetch(this.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newLocation)
  });
  return await response.json();
}

async removeHousingLocation(id: string | undefined | number): Promise<void> {
  await fetch(`${this.url}/${id}`, {
    method: 'DELETE'
  });
}

async updateHousingLocation(id: number | string, updatedLocation: Partial<PeriodicElement>): Promise<PeriodicElement> {
  const response = await fetch(`${this.url}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedLocation)
  });
  return await response.json();
}

  constructor() { }
}
