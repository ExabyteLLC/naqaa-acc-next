import FormTable from "../../../../assets/modals/formTable";
import useDataPageModel from "../../../../models/dataPageModel";
import MapSelectOptions from "../../../../models/mapSelectOptions";

const App = () => {
  const { deps, formData } = useDataPageModel();

  return (
    <FormTable
      columns={[
        {
          title: "account",
          key: "account_id",
          type: "int",
          options: deps.treeAccounts,
          required: true,
        },
        {
          key: "currency",
          options: MapSelectOptions(deps.currencies, { titleKey: "symbol" }),
          initialValue: "EGP",
          required: true,
        },
        {
          key: "rate",
          type: "int",
          initialValue: 1,
          required: true,
        },
        {
          key: "description",
          required: true,
        },
        {
          key: "debit",
          type: "int",
          required: false,
          onChange: (data) => {
            console.log(data.currentTarget.value);
          },
        },
        {
          key: "credit",
          type: "int",
          required: false,
          onChange: (data) => {
            console.log(data.currentTarget.value);
          },
        },
      ]}
      initData={formData?.transaction_accounts ?? []}
      fullspan="true"
    />
  );
};
export default App;
