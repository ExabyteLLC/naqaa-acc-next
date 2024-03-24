import { useCallback, useEffect, useState } from "react";
import { serialize } from "object-to-formdata";
import MyCreateContext from "./context";
import myFetch from "./fetch";

export const DataPageModel = MyCreateContext(
  ({
    IdKey,
    Route,
    autoGet = true,
    hasDeps = false,
    processGetData,
    processDepsData,
    extraFuncs,
    getApiRoute = "get",
  }) => {
    const [data, setData] = useState([]);
    const [deps, setDeps] = useState({});
    const [dataStatus, setDataStatus] = useState(null);
    const [depsStatus, setDepsStatus] = useState(null);

    const [formKey, setFormKey] = useState(0);
    const [formOpen, setFormOpen] = useState(null);
    const [formType, setFormType] = useState(null);
    const [formInitData, setFormInitData] = useState({});
    const [formData, setFormData] = useState({});

    const currForm = (name) => {
      return name === formOpen;
    };
    const openAddForm = (data) => {
      setFormKey(formKey + 1);
      setFormInitData(data ?? {});
      setFormData({});
      setFormType("add");
      setFormOpen("main");
    };
    const openEditForm = (data) => {
      setFormKey(formKey + 1);
      setFormInitData(data ?? {});
      setFormData({});
      setFormType("edit");
      setFormOpen("main");
    };
    const openForm = ({ type, data, name } = {}) => {
      setFormKey(formKey + 1);
      setFormInitData(data ?? {});
      setFormData({});
      setFormType(type);
      setFormOpen(name);
    };
    const closeForm = useCallback(() => {
      setFormKey(formKey + 1);
      setFormInitData({});
      setFormData({});
      setFormType(null);
      setFormOpen(null);
    }, [formKey]);
    const editFormData = useCallback(
      (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
      },
      [setFormData]
    );

    const getDataApi = useCallback(
      (values) => {
        setDataStatus("loading");
        myFetch(`${Route}/${getApiRoute}`, {
          body: values ? serialize(values) : null,
          onError: () => {
            setDataStatus("error");
          },
          onSuccess: (data) => {
            setDataStatus("fetched");
            if (processGetData) {
              setData(processGetData(data.data));
            } else {
              setData(data.data);
            }
          },
        });
      },
      [Route, getApiRoute, processGetData]
    );
    const depsDataApi = useCallback(async () => {
      setDepsStatus("loading");
      return await myFetch(`${Route}/dependants`, {
        onError: () => {
          setDepsStatus("error");
        },
        onSuccess: (data) => {
          setDepsStatus("fetched");
          if (processDepsData) {
            setDeps(processDepsData(data.data));
          } else {
            setDeps(data.data);
          }
        },
      });
    }, [Route, processDepsData]);
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
    const addDataApi = useCallback(
      (values) => {
        sendData(values, "add");
        closeForm();
      },
      [closeForm, sendData]
    );
    const updDataApi = useCallback(
      (values, id) => {
        sendData({ [IdKey]: id, ...values }, "update");
        closeForm();
      },
      [closeForm, sendData, IdKey]
    );
    const delDataApi = useCallback(
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
      (async function () {
        if (autoGet && !dataStatus) {
          if (hasDeps) {
            await depsDataApi();
          }
          getDataApi();
        }
      })();
    }, [autoGet, dataStatus, getDataApi, depsDataApi, hasDeps]);

    const obj = {
      data,
      deps,
      dataStatus,
      depsStatus,
      getDataApi,
      depsDataApi,
      addDataApi,
      updDataApi,
      editDataApi: updDataApi,
      delDataApi,

      formKey,
      formOpen,
      formType,
      formData,
      formInitData,
      currForm,
      openAddForm,
      openEditForm,
      openForm,
      editFormData,
      closeForm,
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
