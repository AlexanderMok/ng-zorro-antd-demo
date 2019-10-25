import { floorToDate, getTodayTime } from './../../../../../utils/time';
import { takeUntil } from 'rxjs/operators';
import { ListService } from './../../../../services/list/list.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo, List } from 'src/domain/entities';
import { TodoService } from 'src/app/services/todo/todo.service';
import { Subject, combineLatest } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.less']
})
export class TodoComponent implements OnInit, OnDestroy {
  private destory$ = new Subject();
  todos: Todo[] = [];
  lists: List[] = [];
  currentContextTodo: Todo;

  constructor(
    private listService: ListService,
    private todoService: TodoService
  ) { }

  ngOnInit() {
    this.listService.lists$
      .pipe(takeUntil(this.destory$))
      .subscribe(lists => this.lists = lists);

    combineLatest(this.listService.currentUuid$, this.todoService.todo$)
      .pipe(takeUntil(this.destory$))
      .subscribe(sources => this.processTodos(sources[0], sources[1]));

    this.todoService.getAll();
    this.listService.getAll();
  }

  ngOnDestroy() {
    this.destory$.next();
  }

  processTodos(listUUID: string, todos: Todo[]): void {
    const filteredTodos = todos
      .filter(todo => {
        return ((listUUID === 'today' && todo.planAt && floorToDate(todo.planAt) <= getTodayTime())
          || (listUUID === 'todo' && (!todo.listUUID || todo.listUUID === 'todo'))
          || (listUUID === todo.listUUID));
      })
      .map(todo => Object.assign({}, todo) as Todo);

    this.todos = [].concat(filteredTodos);
  }

  add(title: string): void {
    this.todoService.add(title);
  }
}
