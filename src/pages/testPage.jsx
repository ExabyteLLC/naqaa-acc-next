import { Table } from "antd";
import useTranslation from "../models/translation";

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

function TestPage() {
const {t} = useTranslation();

  return (
    <>
      <h1>Wahed Koudsi</h1>
      {t('language_name')}
      <Table dataSource={dataSource} columns={columns} />;
    </>
  );
}

export default TestPage;
