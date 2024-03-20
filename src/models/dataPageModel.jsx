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

    const [formKey, setFormKey] = useState(0);
    const [formOpen, setFormOpen] = useState(null);
    const [formType, setFormType] = useState(null);
    const [formData, setFormData] = useState(null);

    const currForm = (name) => {
      return name === formOpen;
    };
    const openAddForm = () => {
      setFormKey(formKey + 1);
      setFormData(null);
      setFormType("add");
      setFormOpen("main");
    };
    const openEditForm = (data) => {
      setFormKey(formKey + 1);
      setFormData(data);
      setFormType("edit");
      setFormOpen("main");
    };
    const openForm = ({ type, data, name } = {}) => {
      setFormKey(formKey + 1);
      setFormData(data);
      setFormType(type);
      setFormOpen(name);
    };
    const closeForm = useCallback(() => {
      setFormKey(formKey + 1);
      setFormData(null);
      setFormType(null);
      setFormOpen(null);
    }, [formKey]);

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
    const depsDataApi = useCallback(() => {
      setDataStatus("loading");
      myFetch(`${Route}/dependants`, {
        onError: () => {
          setDataStatus("error");
        },
        onSuccess: (data) => {
          setDataStatus("fetched");
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
    const addDataAPI = useCallback(
      (values) => {
        sendData(values, "add");
        closeForm();
      },
      [closeForm, sendData]
    );
    const updDataAPI = useCallback(
      (values, id) => {
        sendData({ [IdKey]: id, ...values }, "update");
        closeForm();
      },
      [closeForm, sendData, IdKey]
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
      editDataAPI: updDataAPI,
      delDataAPI,

      formKey,
      formOpen,
      formType,
      formData,
      currForm,
      openAddForm,
      openEditForm,
      openForm,
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
