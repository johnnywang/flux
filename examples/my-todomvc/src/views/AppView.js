import React from 'react';

function AppView(props) {
  return (
    <div>
      <Header {...props} />
      <Main {...props} />
      <Footer {...props} />
    </div>
  );
}

function Header(props) {
  return (
    <header id="header">
      <h1>todos</h1>
      <NewTodo {...props} />
    </header>
  );
}

function Main(props) {
  const areAllComplete = props.todos.every(todo => todo.complete);

  return (
    <section id="main">
      <input
        id="toggle-all"
        type="checkbox"
        checked={areAllComplete}
        onChange={props.onToggleAllTodos}
      />
      <label htmlFor="toggle-all">Mark All Complete</label>
      <ul id="todo-list">
        {[...props.todos.values()].reverse().map(todo => (
          <li key={todo.id}>
            <div className="view">
              <input
                className="toggle"
                type="checkbox"
                checked={todo.complete}
                onChange={() => props.onToggleTodo(todo.id)}
              />
              <label>{todo.text}</label>
              <button className="destroy" onClick={() => props.onDeleteTodo(todo.id)}/>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

const ENTER_KEY_CODE = 13;
function NewTodo(props) {
  const onKeyDown = (e) => {
    if (e.keyCode === ENTER_KEY_CODE) {
      props.onAddTodo(props.draft);
    }
  };

  return (
    <input
      autoFocus={true}
      id="new-todo"
      type="text"
      placeholder="What needs to be done?"
      value={props.draft}
      onChange={(e) => props.onUpdateDraft(e.currentTarget.value)}
      onKeyDown={onKeyDown}
    />
  );
}

function Footer(props) {
  if (props.todos.size === 0) {
    return null;
  }

  const remaining = props.todos.filter(todo => !todo.complete).size;
  const phrase = remaining === 1 ? ' item left' : ' items left';

  return (
    <footer id="footer">
      <span id="todo-count">
        <strong>{remaining}</strong>{phrase}
      </span>
      <button id="clear-completed" onClick={props.onClearCompletedTodos}>Clear Completed</button>
    </footer>
  );
}

export default AppView;