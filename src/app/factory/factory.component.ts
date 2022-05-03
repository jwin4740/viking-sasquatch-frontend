import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FoodNode } from '../app.component';

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.scss'],
})
export class FactoryComponent implements OnInit, OnChanges {
  public factoryName: string;
  lowerBound = 0;
  upperBound = 0;
  currentNode: FoodNode | undefined;
  @Input() factoryNode: FoodNode | undefined;
  @Output() deleteNodeEmitter = new EventEmitter<FoodNode>();

  @Output() generateRandomChildrenEmitter = new EventEmitter<number>();
  constructor() {
    this.factoryName = 'Some name';
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.currentNode = changes['factoryNode'].currentValue;
  }

  deleteFactory(): void {
    this.deleteNodeEmitter.emit(this.currentNode);
  }

  generateRandomChildren(): void {
    console.log(`lower bound = ${this.lowerBound}`);
    console.log(`upper bound = ${this.upperBound}`);
    this.generateRandomChildrenEmitter.emit();
  }
}
