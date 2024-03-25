export default function MapSelectOptions(
  options = [],
  {
    valueKey = "id",
    titleKey = "name",
    titleKeyProp = "title",
    titleRender,
    onOption,

    tree = false,
    treeCurrId = "id",
    treeParentId = "parent_id",
  } = {}
) {
  if (tree) {
    return listToTree(options, {
      currId: treeCurrId,
      parentId: treeParentId,
      additions: (option) => {
        return {
          value: option[valueKey],
          [titleKeyProp]: titleRender ? titleRender(option) : option[titleKey],
          ...(onOption && onOption(option)),
        };
      },
    });
  } else {
    return options.map((option) => {
      return {
        value: option[valueKey],
        [titleKeyProp]: titleRender ? titleRender(option) : option[titleKey],
        ...(onOption && onOption(option)),
      };
    });
  }
}

function listToTree(
  arr,
  {
    currId = "id",
    parentId = "parent_id",
    childKey = "children",
    cValue = null,
    additions,
  } = {}
) {
  const treeList = [];
  for (let item of arr) {
    if (item[parentId] == cValue) {
      item = { ...item };
      let children = listToTree(arr, {
        currId,
        parentId,
        childKey,
        cValue: item[currId],
        additions,
      });
      if (children.length > 0) item[childKey] = children;
      if (additions) item = { ...additions(item), children: children };
      treeList.push(item);
    }
  }
  return treeList;
}
