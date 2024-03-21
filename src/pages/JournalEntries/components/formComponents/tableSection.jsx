import FormTable from "../../../../assets/modals/formTable";
import useDataPageModel from "../../../../models/dataPageModel";

const App = () => {
  const { deps } = useDataPageModel();
  console.log(deps.treeAccounts);
  return (
    <FormTable
      columns={[
        {
          key: "account_id",
          type: "int",
          options: deps.treeAccounts,
          required: true,
        },
        {
          key: "description",
          required: true,
        },
      ]}
      initData={[{ id: 1, account_id: 1, description: "123" }]}
      fullspan="true"
    />
  );
};
export default App;
