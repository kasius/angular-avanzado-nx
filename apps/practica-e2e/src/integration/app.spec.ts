import { getAllRightsReserved, getButton, getCardDetail, getSubTitle, getTitle } from '../support/app.po';
describe('GIVEN: web application country detail view', () => {
  beforeEach(() => cy.visit('/app/country/ASM'));
  context('WHEN: the user visits the country detail page', () => {
    it('THEN: should display welcome message', () => {
      getTitle().contains('Bienvenido!');
    });
    it('THEN: should show an app explanation subtitle', () => {
      getSubTitle().contains('a proyecto Angular Avanzado, en este proyecto podrás ver detalle de regiones continentales, sus países y datos base para cada País!!!...');
    });

    it('THEN: show a button to return to the list of countries', () => {
      getButton().contains('volver').click();
    });

    it('THEN: show detail of the selected country', () => {
      getCardDetail().contains('Capital:');
      getCardDetail().contains('Ubicación');
      getCardDetail().contains('Región:');
    });

    it('THEN: show copyright', () => {
      getAllRightsReserved().contains('Todos los derechos Reservados - Carlos Cifuentes Ulloa 2020-2021').click();
    });
  });
});
