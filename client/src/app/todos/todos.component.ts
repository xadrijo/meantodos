import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../model/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[];

  constructor(private _todoService: TodoService) { }

  ngOnInit() {
    this.todos = [];
    this._todoService.getTodos()
      .subscribe(todos => {
        this.todos = todos;
      });
  }

  addTodo(event, todoText){
    var result;
    var newTodo = {
      text: todoText.value,
      isCompleted: false
    };

    result = this._todoService.saveTodo(newTodo);
    result.subscribe(x => {
      this.todos.push(newTodo);
      todoText.value = '';
    });
  }

}
