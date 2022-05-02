import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA = {
  name: 'Vegetables',

  children: [
    {
      name: 'Green',
      children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
    },
    {
      name: 'Orange',
      children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
    },
  ],
};

interface FactoryData {
  id: number;
  name: string;
  lowerBoundChildNodes: number;
  upperBoundChildNodes: number;
  numberChildrenToCreate: number;
  createdDate: string;
  updatedDate: string;
  chidren: Array<any>;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-tree-project';

  mockData: any = TREE_DATA;

  constructor(private httpClient: HttpClient) {}
  ngOnInit(): void {
    // this.httpClient.get('http://localhost:3000/api/factory').subscribe(data => {
    //   console.log(data)
    //   this.httpClient.get('http://localhost:3000/api/child').subscribe(data => {
    //     console.log(data)
    //   // this.dataSource.data = data
    // })
  }

  editParent(): void {}

  hasChild = (_: number, node: FoodNode) =>
    !!node.children && node.children.length > 0;
}