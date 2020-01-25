import React from "react";
import Select from "./Select.jsx";
import { find } from "lodash"

// For use with Formik Field
class SelectField extends React.Component {
  render() {
    const { options, field, form, isClearable, isDisabled } = this.props;
    return (
      <Select
        options={options}
        name={field.name}
        value={options && field.value ? find(options, { value: field.value }) : ""}
        onChange={(option) => form.setFieldValue(field.name, option ? option.value : "")}
        onBlur={field.onBlur}
        isClearable={true || isClearable !== undefined}
        isDisabled={isDisabled}
      />
    )
  }
}

export default SelectField;
