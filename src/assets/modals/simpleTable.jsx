import { Flex, Table } from "antd";
import useTranslation from "../../models/translation";

const SimpleTable = ({
  columns,
  data,
  rowKey = "id",
  loading,
  emptyText = "",
  actions = null,
  actionOnCell,
  onRow,
  scroll = { x: "max-content" },
} = {}) => {
  const { t } = useTranslation();

  // cols
  const cols = columns.map((column) => col(t, column));
  if (actions) {
    cols.push({
      key: "actions",
      fixed: "right",
      align: "center",
      onCell:
        actionOnCell ||
        (() => {
          return {
            style: { padding: 0 },
          };
        }),
      render: (_, key) => (
        <Flex align="center" justify="space-around">
          {actions(_, key)}
        </Flex>
      ),
    });
  }

  return (
    <Table
      bordered
      columns={cols}
      dataSource={data}
      loading={loading}
      rowKey={rowKey}
      pagination={false}
      sticky
      sortOrder="descend"
      locale={{ emptyText }}
      scroll={scroll}
      onRow={onRow}
    />
  );
};

export default SimpleTable;

function col(t, { title, key, align, width = "max-content", onCell, render }) {
  key = key ?? title;
  title = title ?? key;

  return {
    dataIndex: key,
    title: t(title),
    key,
    align,
    width,
    onCell,
    render,
  };
}
// function getColumnSearchProps(dataIndex, search, type, options) {
//   if (search) {
//     return {
//       filterDropdown: ({
//         setSelectedKeys,
//         selectedKeys,
//         confirm,
//         clearFilters,
//         close,
//       }) => (
//         <div
//           style={{
//             padding: 8,
//           }}
//           onKeyDown={(e) => e.stopPropagation()}
//         >
//           {(function () {
//             if (options) {
//               return (
//                 <Select
//                   placeholder={`Search ${dataIndex}`}
//                   value={selectedKeys[0]}
//                   onChange={(val) => {
//                     setSelectedKeys([val]);
//                     confirm();
//                   }}
//                   style={{
//                     marginBottom: 8,
//                     display: "block",
//                   }}
//                 >
//                   {options.map((option) => (
//                     <Select.Option key={option?.value} value={option?.value}>
//                       {option?.label}
//                     </Select.Option>
//                   ))}
//                 </Select>
//               );
//             }
//             switch (type) {
//               case "int":
//               case "double":
//               case "decimal":
//               case "float":
//               case "num":
//                 return (
//                   <Input
//                     type="number"
//                     placeholder={`Search ${dataIndex}`}
//                     value={selectedKeys[0]}
//                     onChange={(e) =>
//                       setSelectedKeys(e.target.value ? [e.target.value] : [])
//                     }
//                     onPressEnter={() => confirm()}
//                     style={{
//                       marginBottom: 8,
//                       display: "block",
//                     }}
//                   />
//                 );
//               case "date":
//                 return (
//                   <Input
//                     type="date"
//                     placeholder={`Search ${dataIndex}`}
//                     value={selectedKeys[0]}
//                     onChange={(e) =>
//                       setSelectedKeys(e.target.value ? [e.target.value] : [])
//                     }
//                     onPressEnter={() => confirm()}
//                     style={{
//                       marginBottom: 8,
//                       display: "block",
//                     }}
//                   />
//                 );
//               default:
//                 return (
//                   <Input
//                     placeholder={`Search ${dataIndex}`}
//                     value={selectedKeys[0]}
//                     onChange={(e) =>
//                       setSelectedKeys(e.target.value ? [e.target.value] : [])
//                     }
//                     onPressEnter={() => confirm()}
//                     style={{
//                       marginBottom: 8,
//                       display: "block",
//                     }}
//                   />
//                 );
//             }
//           })()}
//           <Space>
//             {!options && (
//               <Button
//                 type="primary"
//                 onClick={() => confirm()}
//                 icon={<SearchOutlined />}
//                 size="small"
//                 style={{
//                   width: 90,
//                 }}
//               >
//                 Search
//               </Button>
//             )}
//             <Button
//               onClick={() => {
//                 if (clearFilters) {
//                   clearFilters();
//                   confirm();
//                 }
//               }}
//               size="small"
//               style={{
//                 width: 90,
//               }}
//             >
//               Reset
//             </Button>
//             <Button
//               type="link"
//               size="small"
//               onClick={() => {
//                 close();
//               }}
//             >
//               Close
//             </Button>
//           </Space>
//         </div>
//       ),
//       filterIcon: (filtered) => (
//         <SearchOutlined
//           style={{
//             color: filtered ? "#fff" : "rgba(255,255,255,0.3)",
//             fontSize: 20,
//           }}
//         />
//       ),
//       onFilter: (value, record) => {
//         if (options) {
//           return record[dataIndex] === value;
//         } else {
//           return cleanStr(record[dataIndex]).includes(cleanStr(value));
//         }
//         function cleanStr(str) {
//           if (str) {
//             return str.toString().toLowerCase();
//           } else return "";
//         }
//       },
//     };
//   }
// }
