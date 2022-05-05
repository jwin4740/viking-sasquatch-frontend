import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTree, MatTreeNestedDataSource } from '@angular/material/tree';
import { faker } from '@faker-js/faker';
import { environment } from 'src/environments/environment';
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
export class AppComponent implements OnInit, AfterViewInit {
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
  // @ViewChild('tree') tree;
  // ngAfterViewInit() {
  //   this.tree.treeControl.expandAll();
  // }
  @ViewChild(MatTree) tree: any;
  ngAfterViewInit() {
    // this.tree.treeControl.expandAll();
  }

  getAllFactories(): void {
    this.httpClient
      .get<FactoryWithChildrenNode[]>(environment.baseUrl + '/api/factory')
      .subscribe((data) => {
        this.dataSource.data = data;
        this.treeControl.dataNodes = data;
        this.tree.treeControl.expandAll();
        console.log(this.tree.treeControl);
        // this.dataSource.data.forEach((val) => {
        //   console.warn(val);
        // });
        // console.warn(`factories data: ${JSON.stringify(data)}`);
      });
  }

  hasChild = (_: number, node: FactoryWithChildrenNode) =>
    !!node.children && node.children.length > 0;

  deleteFactoryById(factoryNode: any): void {
    console.log('emitter received');
    this.httpClient
      .delete(environment.baseUrl + '/api/factory/' + factoryNode.id)
      .subscribe((data) => this.getAllFactories());
    //after 200 response delete node from this.datasource
    // console.log(factoryNode);
  }

  generateRandomFactory(numChildren: number): void {
    this.httpClient
      .post(environment.baseUrl + '/api/factory', {
        name:
          faker.name.firstName('male') +
          ' and ' +
          faker.name.firstName('female'),
        numberOfChildren: numChildren,
        lowerBoundChildNodes: 1,
        upperBoundChildNodes: 15,
      })
      .subscribe((data) => this.getAllFactories());
  }

  generateRandChildren(j: any): void {
    this.httpClient
      .patch(environment.baseUrl + '/api/factory/' + j.id, {
        name: j.name,
        lowerBoundChildNodes: j.lowerBoundChildNodes,
        upperBoundChildNodes: j.upperBoundChildNodes,
        numberOfChildren: j.numberOfChildren,
      })
      .subscribe((data) => this.getAllFactories());
  }
}
