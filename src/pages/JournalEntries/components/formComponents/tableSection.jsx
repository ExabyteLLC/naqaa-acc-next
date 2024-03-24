import { Form } from "antd";
import FormTable from "../../../../assets/modals/formTable";
import useDataPageModel from "../../../../models/dataPageModel";
import MapSelectOptions from "../../../../models/mapSelectOptions";

const App = () => {
  const form = Form.useFormInstance();
  const { deps, formInitData } = useDataPageModel();

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
          name: "account_transaction_currency_id",
          options: MapSelectOptions(deps.currencies, { titleKey: "id" }),
          initialValue: "EGP",
          required: true,
          width: 80,
        },
        {
          key: "rate",
          type: "int",
          name: "currency_rate",
          initialValue: 1,
          required: true,
          width: 60,
        },
        {
          key: "description",
          name: "account_transaction_description",
          required: true,
        },
        {
          key: "debit",
          type: "int",
          required: false,
          width: 100,
        },
        {
          key: "credit",
          type: "int",
          required: false,
          width: 100,
        },
      ]}
      initData={formInitData?.transaction_accounts ?? []}
      fullspan="true"
      onChange={(data) => {
        var sum = 0;
        data.forEach((item) => {
          sum += (item.credit ?? 0) - (item.debit ?? 0);
        });
        form.setFieldValue("sum", sum);
      }}
    />
  );
};
export default App;
