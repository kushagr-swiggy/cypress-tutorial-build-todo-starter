import React from 'react'

export default props =>
  <form onSubmit={props.submitHandler}>
    <input
      type='text'
      className="new-todo"
      autoFocus
      onChange={props.textHandler}
      value={props.text}
      placeholder="What needs to be done?"/>
  </form>
