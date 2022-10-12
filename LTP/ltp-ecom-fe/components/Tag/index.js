import { Tag as TagUI, TagCloseButton, TagLabel } from "@chakra-ui/react";

// don't set default data
const Tag = ({ label, data, onRemove, isRemove = true }) => {
  const onClick = () => {
    onRemove instanceof Function && onRemove(data);
  };
  return (
    <TagUI colorScheme="#BCCCFF" variant="outline" border="1px solid #BCCCFF">
      <TagLabel>{label}</TagLabel>
      {isRemove && <TagCloseButton onClick={onClick} />}
    </TagUI>
  );
};
export default Tag;
