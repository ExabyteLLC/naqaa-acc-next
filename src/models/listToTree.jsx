export default function listToTree(
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
      if (additions) item = { ...item, ...additions(item) };
      treeList.push(item);
    }
  }
  return treeList;
}
