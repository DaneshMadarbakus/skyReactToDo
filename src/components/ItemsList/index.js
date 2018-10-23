import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteItem, toggleCompleteItem } from '../../logic/todos';
import './styles.css';

export const ItemsList = ({ items, onDelete, onToggleComplete }) => {
  return (
    <div>
      <ul className="itemsList-ul">
        {items.length < 1 && <p id="items-missing">Add some tasks above.</p>}
        {items.map((item) => <li key={item.id}><p>{item.content}</p>
          <input
            className="remove-button"
            type="button"
            value="Remove task"
            onClick={() => {
              onDelete(item.id);
            }}
          /><label>Check as complete <input className="check-box" type="checkbox" name="completion" onChange={() => {
            onToggleComplete(item.id);
          }} /></label>
          
        </li>)}
      </ul>
    </div>
  );
};

ItemsList.propTypes = {
  items: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return { items: state.todos.items };
};

const mapDispatchToProps = (dispatch) => ({
  onDelete: (id) => dispatch(deleteItem(id)),
  onToggleComplete: (id) => dispatch(toggleCompleteItem(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
