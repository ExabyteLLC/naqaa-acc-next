import { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Modal } from "antd";
import Highlighter from "react-highlight-words";
import useTranslation from "../models/translation";
import { API, UID } from "../params";

const App = () => {
  const [open, setOpen] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  const showModal = (item) => {
    setOpen(item);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchApi = await fetch(
          `${API}admin/accounting/serials/get?UID=${UID}`
        );
        const res = await fetchApi.json();
        setData(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // const handleOk = () => {
  //   setConfirmLoading(true);
  //   setTimeout(() => {
  //     setOpen(null);
  //     setConfirmLoading(false);
  //   }, 2000);
  // };

  const handleCancel = () => {
    setOpen(null);
    setConfirmLoading(false);
  };

  const newData = data?.data?.map((el) => ({
    addstamp: el.addstamp,
    after: el.after,
    before: el.before,
    digits: el.digits,
    id: el.id,
    initial: el.initial,
    name: el.name,
    name_alt: el.name_alt,
    number: el.number,
    updatestamp: el.name_alt,
  }));

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: t("added-date"),
      dataIndex: "addstamp",
      key: "addstamp",
      width: "15%",
      ...getColumnSearchProps("addstamp"),
    },
    {
      title: "after",
      dataIndex: "after",
      key: "after",
      width: "10%",
      ...getColumnSearchProps("after"),
    },
    {
      title: "before",
      dataIndex: "before",
      key: "before",
      width: "10%",
      ...getColumnSearchProps("before"),
    },
    {
      title: "digits",
      dataIndex: "digits",
      key: "digits",
      width: "5%",
      ...getColumnSearchProps("digits"),
    },
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      width: "10%",
      ...getColumnSearchProps("id"),
    },
    {
      title: "initial",
      dataIndex: "initial",
      key: "initial",
      width: "10%",
      ...getColumnSearchProps("initial"),
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
      width: "15%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "name_alt",
      dataIndex: "name_alt",
      key: "name_alt",
      width: "10%",
      ...getColumnSearchProps("name_alt"),
    },
    {
      title: "number",
      dataIndex: "number",
      key: "number",
      width: "10%",
      ...getColumnSearchProps("number"),
    },
    {
      title: "updatestamp",
      dataIndex: "updatestamp",
      key: "updatestamp",
      width: "10%",
      ...getColumnSearchProps("updatestamp"),
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, key) => (
        <>
          <Button onClick={() => showModal(key)}>{t("edit")}</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={newData} rowKey="id" />

      <Modal
        width={"70%"}
        title="Edit"
        open={!!open}
        okButtonProps={{ htmlType: "submit", form: "editForm" }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <form
          id="editForm"
          onSubmit={(evt) => {
            evt.preventDefault();
            let fd = new FormData(evt.target);
            fd.set("serial_id", open?.["id"]);
            setConfirmLoading(true);

            // update api
            (async function () {
              try {
                const fetchApi = await fetch(
                  `${API}admin/accounting/serials/update?UID=${UID}`,
                  { body: fd, method: "POST" }
                );
                const res = await fetchApi.json();
                console.log(res);

                handleCancel();
              } catch (error) {
                console.error("Error fetching data:", error);
              }
            })();
          }}
        >
          <hr />

          <div className="mt-5 grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="Before"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Before:
              </label>
              <input
                type="text"
                id="Before"
                className="bg-gray-50 border p-2 border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Before"
                name="before"
                defaultValue={open?.["before"]}
                required
              />
            </div>
            <div>
              <label
                htmlFor="After"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                After:
              </label>
              <input
                type="text"
                id="After"
                className="bg-gray-50 border p-2 border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="After"
                name="after"
                defaultValue={open?.["after"]}
                required
              />
            </div>
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Digits:
              </label>
              <input
                type="text"
                id="Digits"
                className="bg-gray-50 border p-2 border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Digits"
                required
                name="digits"
                defaultValue={open?.["digits"]}
              />
            </div>
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Initial:
              </label>
              <input
                type="text"
                id="Initial"
                className="bg-gray-50 border p-2 border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Initial"
                name="initial"
                defaultValue={open?.["initial"]}
                required
              />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default App;
