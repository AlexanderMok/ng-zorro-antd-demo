import { Component, OnInit, ViewChild } from '@angular/core';
import { Todo } from 'src/domain/entities';
import { TodoComponent } from './todo/todo.component';

@Component({
  selector: 'app-right-control',
  templateUrl: './right-control.component.html',
  styleUrls: ['./right-control.component.less']
})
export class RightControlComponent implements OnInit {
  @ViewChild(TodoComponent, { static: false }) public todoList: TodoComponent;

  constructor() { }

  ngOnInit() {
  }

  add(title: string) {
    this.todoList.add(title);
  }

}
