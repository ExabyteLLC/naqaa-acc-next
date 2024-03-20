import { useCallback, useEffect, useState } from "react";
import MyCreateContext from "../../models/context";
import { serialize } from "object-to-formdata";
import myFetch from "../../models/fetch";
import useTranslation from "../../models/translation";

export const CoaModel = MyCreateContext(() => {
  const [dataStatus, setDataStatus] = useState(null);
  const [data, setData] = useState([]);
  const { locale } = useTranslation();

  const deleteFn = ({ id }) => {
    var fd = serialize({ payment_type_id: id });
    myFetch("/admin/accounting/accounts/delete", {
      body: fd,
      onSuccess: () => {
        setData((prev) => prev.filter((o) => o.id !== id));
      },
    });
  };
  const listToTree = useCallback(
    (
      arr,
      {
        currId = "id",
        parentId = "parent_id",
        childKey = "children",
        cValue = null,
        additions,
      } = {}
    ) => {
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
    },
    []
  );
  const fetchingData = useCallback(() => {
    setDataStatus("loading");
    myFetch("/admin/accounting/accounts/get", {
      onLoad: (res, api) => {
        if (!res.ok) {
          setDataStatus("error");
          return;
        }
        if (api.statusText !== "OK") {
          setDataStatus("error");
          return;
        }

        setDataStatus("fetched");
        setData(api.data);
      },
    });
  }, []);

  const sendData = async (values, request = "add") => {
    var fd = serialize(values);
    setDataStatus("loading");
    myFetch(`/admin/accounting/accounts/${request}`, {
      body: fd,
      onLoad: (res, data) => {
        if (!res.ok) {
          setDataStatus("error");
          return;
        }
        if (data.status != 200) {
          setDataStatus("error");
          return;
        }
        setDataStatus("fetched");
      },
    });
  };

  const optionsTree = useCallback(() => {
    let d2 = [...data];
    d2 = d2.filter((o) => o.master === 1);
    let td = listToTree(d2, {
      additions: (o) => {
        return {
          title: `${o.id} - ${locale === "en" ? o.name : o.name_alt}`,
          value: o.id,
        };
      },
    });
    return td;
  }, [data, listToTree, locale]);

  useEffect(() => {
    if (!dataStatus) fetchingData();
  }, [dataStatus, data, fetchingData]);

  return {
    get data() {
      return listToTree(data);
    },
    dataStatus,
    setDataStatus,
    deleteFn,
    fetchingData,
    sendData,
    get optionsTree() {
      return optionsTree();
    },
  };
});
const useCoaModel = CoaModel.Use;
export default useCoaModel;

// get arr from api

// setData(arr)

// arr to tree

// arr to options tree
