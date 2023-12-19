// cypress/integration/list-buildings.component.spec.ts

import { initEnv, mount } from 'cypress-angular-unit-test';
import { ListBuildingsComponent } from './list-buildings.component';
import { BuildingService } from '../../service/Building/building.service';
import Building from '../../model/building';
import { Observable, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('ListBuildingsComponent', () => {
  let buildingServiceStub: Partial<BuildingService>;

  beforeEach(() => {
    // Create the root element
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);

    // Stub the BuildingService to provide fake data for testing
    buildingServiceStub = {
      getBuildings: () => of([
        { 
          id: 1, 
          name: 'Building 1',
          _id: 'fake_id_1',
          localizationoncampus: 'fake_localization_1',
          floors: 1,
          lifts: 1,
          maxCel: [1]
        },
        { 
          id: 2, 
          name: 'Building 2',
          _id: 'fake_id_2',
          localizationoncampus: 'fake_localization_2',
          floors: 2,
          lifts: 2,
          maxCel: [2]
        },
      ])
    };

    initEnv(ListBuildingsComponent, {
      imports: [HttpClientModule],
      providers: [{ provide: BuildingService, useValue: buildingServiceStub }],
    });

    // Mount the Angular component
    mount(ListBuildingsComponent, {
      rootId: 'root',
    });
  });

  it('should load buildings successfully', () => {
    cy.wait(1000); // wait for 1 second
    if (buildingServiceStub.getBuildings) {
      buildingServiceStub.getBuildings().subscribe(buildings => {
        cy.wrap(buildings).as('buildings');
      });
    }
  });

  it('should render correct number of building items', () => {
    cy.get('.main-content > :nth-child(1)').should('exist');
    cy.get('.main-content > :nth-child(2)').should('exist');
  });

  it('should display correct details for each building item', () => {
    // Verify details for the first building
    cy.get('.main-content > :nth-child(1)').within(() => {
      cy.contains('Building 1');
      cy.contains('fake_localization_1');
      cy.contains('1'); // floors
      cy.contains('1'); // lifts
      cy.contains('1'); // maxCel
    });

    // Verify details for the second building
    cy.get('.main-content > :nth-child(2)').within(() => {
      cy.contains('Building 2');
      cy.contains('fake_localization_2');
      cy.contains('2'); // floors
      cy.contains('2'); // lifts
      cy.contains('2'); // maxCel
    });
  });

  it('should handle error when loading buildings', () => {
    // Stub the BuildingService to simulate an error
    buildingServiceStub.getBuildings = () => {
      throw new Error('Simulated error');
    };
    // Check if the component is handling the error correctly
  });
});
