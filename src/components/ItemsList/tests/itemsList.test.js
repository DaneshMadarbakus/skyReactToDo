import React from 'react';
import { shallow, mount } from 'enzyme';
import { ItemsList } from '../index';

const defaultProps = {
  onDelete: (f) => f,
  onToggleComplete: (f) => f,
  onToggleHide: (f) => f,
  hideCompletedItems: false,
  items: [],
};

describe('ItemsList', () => {
  it('renders without crashing', () => {
    shallow(<ItemsList {...defaultProps} />);
  });

  it('should display warning message if no items', () => {
    const renderedItem = shallow(<ItemsList {...defaultProps} items={[]} />);
    expect(renderedItem.find('#items-missing')).toHaveLength(1);
  });

  it('should not display warning message if items are present', () => {
    const items = [{ id: 1, content: 'Test 1' }];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    expect(renderedItem.find('#items-missing')).toHaveLength(0);
  });

  it('should render items as list items', () => {
    const items = [{ id: 1, content: 'Test 1' }, { id: 2, content: 'Test 2' }];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    expect(renderedItem.find('li')).toHaveLength(2);
  });

  it('should call onDelete with the item id', () => {
    const onDeleteMock = jest.fn();
    const items = [{ id: 1, content: 'Test 1' }, { id: 2, content: 'Test 2' }, { id: 3, content: 'Test 3' }];
    const renderedItem = mount(
      <ItemsList {...defaultProps} items={items} onDelete={onDeleteMock} />,
    );
    renderedItem.find('.remove-button').first().simulate('click');
    expect(onDeleteMock.mock.calls.length).toBe(1);
    expect(onDeleteMock.mock.calls[0][0]).toBe(1);
  });

  // it('should render one less item after calling onDelete', () => {
  // });

  // it('should call onToggleComplete', () => {
  //   const onToggleCompleteMock = jest.fn();
  //   const items = [
  //     { id: 1, content: 'Call mum', isCompleted: false },
  //     { id: 2, content: 'Buy cat food', isCompleted: false },
  //     { id: 3, content: 'Water the plants', isCompleted: false },
  //   ];
  //   const renderedItem = mount(
  //     <ItemsList {...defaultProps} items={items} onToggleComplete={onToggleCompleteMock} />,
  //   );
  //   renderedItem.find('.check-box').first().simulate('click');
  //   expect(onToggleCompleteMock.mock.calls.length).toBe(1);
  //   expect(onToggleCompleteMock.mock.calls[0][0]).toBe(1);
  // });

  // it('should call onToggleHide', () => {
  // });

  // it('should render items that are not complete only on onToggleHide', () => {
  // });
});
