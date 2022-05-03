import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { faker } from '@faker-js/faker';
/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
export interface FoodNode {
  name: string;
  id?: number;
  children?: FoodNode[];
}

interface ChildResponse {
  id: number;
  name: string;
  children: any[];
}

export interface FactoryWithChildrenNode {
  id: number;
  name: string;
  lowerBoundChildren: number;
  upperBoundChildren: number;
  numberOfChildren: number;
  children: ChildResponse[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    id: 1,
    children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
  },
  {
    name: 'Vegetables',
    id: 2,
    children: [{ name: 'Broccoli' }, { name: 'Pea' }, { name: 'Carrot' }],
  },
];

/**
 * @title Tree with nested nodes
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // treeControl = new NestedTreeControl<FoodNode>((node) => node.children);
  // dataSource = new MatTreeNestedDataSource<FoodNode>();

  treeControl = new NestedTreeControl<ChildResponse>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<FactoryWithChildrenNode>();

  constructor(private httpClient: HttpClient) {
    // this.dataSource.data = TREE_DATA;
  }
  ngOnInit(): void {
    this.getAllFactories();
  }

  getAllFactories(): void {
    this.httpClient
      .get<FactoryWithChildrenNode[]>('http://localhost:3000/api/factory')
      .subscribe((data) => {
        this.dataSource.data = data;
        console.warn(`factories data: ${JSON.stringify(data)}`);
      });
  }

  hasChild = (_: number, node: FactoryWithChildrenNode) =>
    !!node.children && node.children.length > 0;

  deleteFactoryById(factoryNode: any): void {
    console.log('emitter received');
    this.httpClient.delete;
    //after 200 response delete node from this.datasource
    console.log(factoryNode);
  }

  generateRandomFactory(numChildren: number): void {
    console.warn('entered generateRandomFactory');

    this.httpClient
      .post('http://localhost:3000/api/factory', {
        name: faker.name.firstName(),
        numberOfChildren: numChildren,
        lowerBoundChildNodes: 1,
        upperBoundChildNodes: 15,
      })
      .subscribe((data) => this.getAllFactories());
  }
}

// /**
//  * Food data with nested structure.
//  * Each node has a name and an optional list of children.
//  */
// interface FoodNode {
//   name: string;
//   children?: FoodNode[];
// }

// const TREE_DATA = {
//   name: 'Vegetables',

//   children: [
//     {
//       name: 'Green',
//       children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
//     },
//     {
//       name: 'Orange',
//       children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
//     },
//   ],
// };

// interface FactoryData {
//   id: number;
//   name: string;
//   lowerBoundChildNodes: number;
//   upperBoundChildNodes: number;
//   numberChildrenToCreate: number;
//   createdDate: string;
//   updatedDate: string;
//   chidren: Array<any>;
// }

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss'],
// })
// export class AppComponent implements OnInit {
//   title = 'angular-tree-project';

//   mockData: any = TREE_DATA;

//   constructor(private httpClient: HttpClient) {}
//   ngOnInit(): void {
//     // this.httpClient.get('http://localhost:3000/api/factory').subscribe(data => {
//     //   console.log(data)
//     //   this.httpClient.get('http://localhost:3000/api/child').subscribe(data => {
//     //     console.log(data)
//     //   // this.dataSource.data = data
//     // })
//   }

//   editParent(): void {}

//   hasChild = (_: number, node: FoodNode) =>
//     !!node.children && node.children.length > 0;
// }
