import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.scss'],
})
export class FactoryComponent implements OnInit {
  public factoryName: string;
  public lowerBoundChildNumber: number;
  public upperBoundChildNumber: number;
  constructor() {
    this.factoryName = 'Some name';
    this.lowerBoundChildNumber = 1;
    this.upperBoundChildNumber = 15;
  }

  ngOnInit(): void {}
}
