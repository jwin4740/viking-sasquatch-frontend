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
  nodeName = '';
  currentNode: FactoryWithChildrenNode | undefined;
  @Input() factoryNode: FactoryWithChildrenNode | undefined;
  @Output() deleteNodeEmitter = new EventEmitter<FactoryWithChildrenNode>();

  @Output() generateRandomChildrenEmitter = new EventEmitter();
  constructor() {
    this.factoryName = 'Some name';
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.currentNode = changes['factoryNode'].currentValue;
    // console.warn(`current node: ${JSON.stringify(this.currentNode)}`);
  }

  deleteFactory(): void {
    this.deleteNodeEmitter.emit(this.currentNode);
  }

  nameUpdated(event: any) {
    if (this.currentNode?.name) {
      this.currentNode.name = event.target.value;
    }
    console.log(this.currentNode);
  }

  generateRandomChildren(): void {
    console.log(`lower bound = ${this.lowerBound}`);
    console.log(`upper bound = ${this.upperBound}`);

    this.generateRandomChildrenEmitter.emit({
      name: this.currentNode?.name,
      id: this.currentNode?.id,
      lowerBoundChildNodes: parseInt(this.lowerBound),
      upperBoundChildNodes: parseInt(this.upperBound),
      numberOfChildren: Math.floor(
        Math.random() *
          (parseInt(this.upperBound) - parseInt(this.lowerBound)) +
          parseInt(this.lowerBound),
      ),
    });
  }
}
