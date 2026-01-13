import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KpiCardComponent } from './kpi-card.component';

describe('KpiCardComponent', () => {
  let fixture: ComponentFixture<KpiCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpiCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KpiCardComponent);
    fixture.componentInstance.data = {
      label: 'Articles Published (7d)',
      value: 42,
      delta: '+8%',
    };
    fixture.detectChanges();
  });

  it('renders KPI label and value', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Articles Published');
    expect(compiled.textContent).toContain('42');
  });
});
