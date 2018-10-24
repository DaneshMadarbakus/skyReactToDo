import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteItem, toggleCompleteItem, toggleHideItems } from '../../logic/todos';
import './styles.css';

export const ItemsList = ({ hideCompletedItems, items, onDelete, onToggleComplete, onToggleHide }) => {
  return (
    <div>
      <label className="toggle-hide">Hide/show completed items<input className="check-box" type="checkbox" name="completion" onChange={() => {
        onToggleHide();
      }} /></label>
      <ul className="itemsList-ul">
        {items.length < 1 && <p id="items-missing">Add some tasks above.</p>}
        {items.map((item) => {
          const hide = hideCompletedItems && item.isCompleted ? { display: 'none' } : {};
          return (
            <li style={hide} key={item.id}><p>{item.content}</p>
              <input
                className="remove-button"
                type="button"
                value="Remove task"
                onClick={() => {
                  onDelete(item.id);
                }}
              /><label>Check as complete <input className="check-box" type="checkbox" name="completion" onChange={() => {
                onToggleComplete(item.id);
              }} checked={item.isCompleted} /></label>

            </li>
          )
        }
        )}
      </ul>
    </div>
  );
};

ItemsList.propTypes = {
  items: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onToggleHide: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    hideCompletedItems: state.todos.hideCompletedItems,
    items: state.todos.items
  };
};

const mapDispatchToProps = (dispatch) => ({
  onDelete: (id) => dispatch(deleteItem(id)),
  onToggleComplete: (id) => dispatch(toggleCompleteItem(id)),
  onToggleHide: () => dispatch(toggleHideItems()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
