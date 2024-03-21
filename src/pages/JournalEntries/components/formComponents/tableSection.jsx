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
        },
        {
          key: "credit",
          type: "int",
          required: false,
        },
      ]}
      initData={formInitData?.transaction_accounts ?? []}
      fullspan="true"
      onChange={(data) => {
        var sum = 0;
        data.forEach((item) => {
          sum += item.credit - item.debit;
        });
        console.log(sum);
        console.log(form.setFieldValue("sum", sum));
        console.log(form.getFieldValue("sum"));
      }}
    />
  );
};
export default App;
