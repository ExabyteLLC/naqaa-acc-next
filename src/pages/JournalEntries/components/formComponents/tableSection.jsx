import { Form } from "antd";
import FormTable from "../../../../assets/modals/formTable";
import useDataPageModel from "../../../../models/dataPageModel";

const App = () => {
  const form = Form.useFormInstance();
  const { deps, formInitData } = useDataPageModel();

  console.log(formInitData);
  
  return (
    <FormTable
      columns={[
        {
          title: "account",
          key: "account_id",
          type: "int",
          options: deps.accounts,
          optionsTitleRender: (o) => `${o.id} - ${o.name}`,
          optionsTree: true,
          onOption: (o) => ({
            disabled: o.master === 1,
          }),
          required: true,
        },
        {
          key: "currency",
          name: "account_transaction_currency_id",
          options: deps.currencies,
          optionsTitleKey: "id",
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
