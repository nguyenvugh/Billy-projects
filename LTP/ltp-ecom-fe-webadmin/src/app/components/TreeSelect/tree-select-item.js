import Checkbox from "../Checkbox";

const TreeSelectItem = ({ tree, forceUpdate, onChange }) => {
  const onChangeChecked = (e) => {
    if (tree) {
      let value = e.target.checked;
      tree.checked = value;
      onChange instanceof Function && onChange();
      if (Array.isArray(tree.child)) {
        tree.child.forEach((item) => {
          if (item) {
            item.checked = value;
          }
        });
      }
      forceUpdate instanceof Function && forceUpdate();
    }
  };

  const onChangeChild = () => {
    if (tree && Array.isArray(tree.child)) {
      tree.checked = tree.child.every((item) => item?.checked);
      onChange instanceof Function && onChange();
    }
  };

  return (
    <li>
      <Checkbox
        label={tree?.label}
        checked={tree?.checked}
        onChange={onChangeChecked}
        indeterminate={
          !tree?.checked &&
          Array.isArray(tree?.child) &&
          !tree?.child.every((item) => item?.checked === false)
        }
      />
      {Array.isArray(tree?.child) && tree.child.length > 0 && (
        <ul>
          {tree.child.map((item) => (
            <TreeSelectItem
              key={item?.id}
              tree={item}
              forceUpdate={forceUpdate}
              onChange={onChangeChild}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeSelectItem;
