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
        console.log(this.todos);
      });
  }

  addTodo(event, todoText){
    var result;
    var newTodo = {
      _id: '',
      text: todoText.value,
      isCompleted: false
    };

    result = this._todoService.saveTodo(newTodo);
    
    result.subscribe(data => {
      newTodo._id = data._id;
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

  deleteTodo(todo){
    var todos = this.todos;

    this._todoService.deleteTodo(todo._id)
      .subscribe(data => {
        if(data.n == 1){
          for(var i = 0; i < todos.length; i++){
            if(todos[i]._id == todo._id){
              todos.splice(i, 1);
            }
          }
        }
      });
  }
}
