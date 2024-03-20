import { useCallback, useEffect, useState } from "react";
import { serialize } from "object-to-formdata";
import MyCreateContext from "./context";
import myFetch from "./fetch";

export const DataPageModel = MyCreateContext(
  ({ IdKey, Route, autoGet = true, hasDeps = false, extraFuncs }) => {
    const [data, setData] = useState([]);
    const [deps, setDeps] = useState({});
    const [dataStatus, setDataStatus] = useState(null);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const getDataApi = useCallback(() => {
      setDataStatus("loading");
      myFetch(`${Route}/get`, {
        onError: () => {
          setDataStatus("error");
        },
        onSuccess: (data) => {
          setDataStatus("fetched");
          setData(data.data);
        },
      });
    }, [Route]);
    const depsDataApi = useCallback(() => {
      setDataStatus("loading");
      myFetch(`${Route}/dependants`, {
        onError: () => {
          setDataStatus("error");
        },
        onSuccess: (data) => {
          setDataStatus("fetched");
          setDeps(data.data);
        },
      });
    }, [Route]);
    const sendData = useCallback(
      async (values, request = "add") => {
        var fd = serialize(values);
        setDataStatus("loading");
        myFetch(`${Route}/${request}`, {
          body: fd,
          onError: () => {
            setDataStatus("error");
          },
          onSuccess: () => {
            getDataApi();
          },
        });
      },
      [Route, getDataApi]
    );
    const addDataAPI = useCallback(
      (values) => {
        sendData(values, "add");
        setAddModal(false);
      },
      [sendData]
    );
    const updDataAPI = useCallback(
      (values, id) => {
        sendData({ [IdKey]: id, ...values }, "update");
        setEditModal(false);
      },
      [sendData, IdKey]
    );
    const delDataAPI = useCallback(
      ({ id }) => {
        var fd = serialize({ [IdKey]: id });
        myFetch(`${Route}/delete`, {
          body: fd,
          onSuccess: () => {
            setData((prev) => prev.filter((o) => o.id !== id));
          },
        });
      },
      [Route, IdKey]
    );

    useEffect(() => {
      if (autoGet && !dataStatus) {
        if (hasDeps) {
          depsDataApi();
        }
        getDataApi();
      }
    }, [autoGet, dataStatus, getDataApi, depsDataApi, hasDeps]);

    const obj = {
      data,
      deps,
      dataStatus,
      getDataApi,
      depsDataApi,
      addDataAPI,
      updDataAPI,
      delDataAPI,
      addModal,
      setAddModal,
      editModal,
      setEditModal,
    };
    return { ...obj, ...(extraFuncs && extraFuncs(obj)) };
  }
);
const useDataPageModel = DataPageModel.Use;
// eslint-disable-next-line react-refresh/only-export-components
export default useDataPageModel;

// get arr from api

// setData(arr)

// arr to tree

// arr to options tree
