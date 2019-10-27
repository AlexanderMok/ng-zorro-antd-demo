import { floorToDate, getTodayTime } from './../../../../../utils/time';
import { takeUntil } from 'rxjs/operators';
import { ListService } from './../../../../services/list/list.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo, List } from 'src/domain/entities';
import { TodoService } from 'src/app/services/todo/todo.service';
import { Subject, combineLatest } from 'rxjs';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd';
import { RankBy } from 'src/domain/type';
import { Router } from '@angular/router';

const rankerGenerator = (type: RankBy = 'title'): any => {
  if (type === 'completeFlag') {
    return (t1: Todo, t2: Todo) => t1.completedFlag && !t2.completedFlag;
  }
  return (t1: Todo, t2: Todo) => t1[type] > t2[type];
};

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
    private todoService: TodoService,
    private nzContextMenuService: NzContextMenuService,
    private router: Router
  ) { }

  ngOnInit() {
    this.listService.lists$
      .pipe(takeUntil(this.destory$))
      .subscribe(lists => this.lists = lists);

    combineLatest(this.listService.currentUuid$, this.todoService.todo$, this.todoService.rank$)
      .pipe(takeUntil(this.destory$))
      .subscribe(sources => this.processTodos(sources[0], sources[1], sources[2]));

    this.todoService.getAll();
    this.listService.getAll();
  }

  ngOnDestroy() {
    this.destory$.next();
  }

  processTodos(listUUID: string, todos: Todo[], rank: RankBy): void {
    const filteredTodos = todos
      .filter(todo => {
        return ((listUUID === 'today' && todo.planAt && floorToDate(todo.planAt) <= getTodayTime())
          || (listUUID === 'todo' && (!todo.listUUID || todo.listUUID === 'todo'))
          || (listUUID === todo.listUUID));
      })
      .map(todo => Object.assign({}, todo) as Todo)
      .sort(rankerGenerator(rank));

    this.todos = [].concat(filteredTodos);
  }

  add(title: string): void {
    this.todoService.add(title);
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent, uuid: string): void {
    this.nzContextMenuService.create($event, menu);
    this.currentContextTodo = this.todos.find(t => t._id === uuid);
  }

  listsExcept(listUUID: string): List[] {
    return this.lists.filter(l => l._id !== listUUID);
  }

  toggle(uuid: string): void {
    this.todoService.toggleTodoComplete(uuid);
  }

  delete(): void {
    this.todoService.delete(this.currentContextTodo._id);
  }

  setToday(): void {
    this.todoService.setTodoToday(this.currentContextTodo._id);
  }

  moveToList(listUuid: string): void {
    this.todoService.moveToList(this.currentContextTodo._id, listUuid);
  }

  close(): void {
    this.nzContextMenuService.close();
  }

  click(uuid: string): void {
    this.router.navigateByUrl(`/main/${uuid}`);
  }
}
