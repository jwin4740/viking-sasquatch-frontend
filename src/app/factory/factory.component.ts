import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FactoryWithChildrenNode } from '../app.component';

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.scss'],
})
export class FactoryComponent implements OnInit, OnChanges {
  public factoryName: string;
  lowerBound = '1';
  upperBound = '15';
  currentNode: FactoryWithChildrenNode | undefined;
  @Input() factoryNode: FactoryWithChildrenNode | undefined;
  @Output() deleteNodeEmitter = new EventEmitter<FactoryWithChildrenNode>();

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
    this.generateRandomChildrenEmitter.emit(4);
  }
}
