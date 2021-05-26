import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Footer from "./Footer";
import { deleteTodo, getTodos, saveTodo, toggleTodo } from "../lib/service";
import { filterTodos } from "../lib/utils";

export default class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentText: "",
      todos: [],
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    getTodos()
      .then(({ data }) => {
        this.setState({ todos: data });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  }

  handleTextChange(ev) {
    this.setState({ currentText: ev.target.value });
  }

  handleDelete(id) {
    deleteTodo(id).then(() => {
      this.setState({
        todos: this.state.todos.filter((t) => t.id !== id),
      });
    });
  }

  handleToggle(id) {
    const index = this.state.todos.findIndex((t) => t.id === id);

    const todo = { ...this.state.todos[index] };
    todo.isComplete = !todo.isComplete;

    toggleTodo(todo).then(({ data }) => {
      this.setState((state) => ({
        todos: state.todos.map((t) => (t.id === data.id ? data : t)),
      }));
    });
  }

  handleFormSubmit(ev) {
    ev.preventDefault();

    const newTodo = { name: this.state.currentText, isComplete: false };

    saveTodo(newTodo)
      .then(({ data }) => {
        this.setState({
          todos: this.state.todos.concat(data),
          currentText: "",
        });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  }

  render() {
    const remaining = this.state.todos.filter((t) => !t.isComplete).length;

    return (
      <Router>
        <div>
          <header className="header">
            <h1>Todo List</h1>
            {this.state.error && <span className="error">oh no!</span>}
            <TodoForm
              text={this.state.currentText}
              textHandler={this.handleTextChange}
              submitHandler={this.handleFormSubmit}
            />
          </header>
          <section className="main">
            <Route
              path="/:filter?"
              render={({ match }) => {
                return (
                  <TodoList
                    todos={filterTodos(this.state.todos, match.params.filter)}
                    handleDelete={this.handleDelete}
                    handleToggle={this.handleToggle}
                  />
                );
              }}
            />
          </section>
          <Footer remaining={remaining} />
        </div>
      </Router>
    );
  }
}
