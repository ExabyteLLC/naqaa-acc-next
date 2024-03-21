export default function MapSelectOptions(
  options = [],
  { valueKey = "id", titleKey = "name" } = {}
) {
  return options.map((option) => {
    return { value: option[valueKey], title: option[titleKey] };
  });
}
