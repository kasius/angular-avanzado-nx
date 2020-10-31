import { TestBed } from '@angular/core/testing';
import { PaisDetailComponent } from './pais-detail.component';

describe('GIVEN: an PaisDetailComponent declared in AppModule', () => {
  describe('WHEN: the AppModule is compiled', () => {
    beforeEach((() => {
      TestBed.configureTestingModule({
        declarations: [PaisDetailComponent]
      }).compileComponents();
    }));

    it('THEN: should create the component', () => {
      const fixture = TestBed.createComponent(PaisDetailComponent); const app = fixture.debugElement.componentInstance; expect(app).toBeTruthy();
    });

    it(`THEN: must have a property @Input () public country with null value`, () => {
      const fixture = TestBed.createComponent(PaisDetailComponent);
      const app = fixture.debugElement.componentInstance; expect(app.pais).toEqual(null);
    })

    it(`THEN: it should represent Capital`, () => {
      const fixture = TestBed.createComponent(PaisDetailComponent); fixture.detectChanges();
      const compiled1 = fixture.debugElement.nativeElement; expect(compiled1.querySelector('span.one').textContent).toContain('Capital');
    });

    it(`THEN: it should represent Ubicación`, () => {
      const fixture = TestBed.createComponent(PaisDetailComponent); fixture.detectChanges();
      const compiled2 = fixture.debugElement.nativeElement; expect(compiled2.querySelector('span.two').textContent).toContain('Ubicación');
    });

    it(`THEN: it should represent Region`, () => {
      const fixture = TestBed.createComponent(PaisDetailComponent); fixture.detectChanges();
      const compiled3 = fixture.debugElement.nativeElement; expect(compiled3.querySelector('span.three').textContent).toContain('Región');
    });
  });
});
