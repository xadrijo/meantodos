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

  setEditState(todo, state){
    if(state){
      todo.isEditMode = state;
    } else {
      delete todo.isEditMode;
    }
  }

  updateStatus(todo){
    var _todo = {
      _id: todo._id,
      text: todo.text,
      isCompleted: !todo.isCompleted
    };

    this._todoService.updateTodo(_todo)
      .subscribe(data => {
        todo.isCompleted = !todo.isCompleted;
      });
  }

  updateTodoText(event, todo){
    if(event.which === 13){
      todo.text = event.target.value;
      var _todo = {
        _id: todo._id,
        text: todo.text,
        isCompleted: todo.isCompleted
      };

      this._todoService.updateTodo(_todo)
        .subscribe(data => {
          this.setEditState(todo, false);
        })
    }
  }
}
