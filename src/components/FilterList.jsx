import React from "react";
import querystring from "querystring";
import { pickBy, identity } from "lodash";

class FilterList extends React.Component {
  updateFilter = (value, filterProp) => {
    let newFilter = { ...this.state.filter };

    if (filterProp) {
      newFilter[filterProp] = value;
    }

    if (typeof value === "object") {
      newFilter = { ...newFilter, ...value };
    }

    this.setState(
      {
        filter: {
          ...this.state.filter,
          ...newFilter
        }
      },
      () => {
        if (this.getData) {
          this.getData();
        }

        if (this.updateSearchParams) {
          this.updateSearchParams();
        }
      }
    );
  };

  updatePaging = ({ page, limit }) => {
    const { paging } = this.state;

    this.setState(
      {
        paging: {
          ...paging,
          page: page || paging.page,
          limit: limit || paging.limit
        }
      },
      () => {
        if (this.getData) {
          this.getData();
        }

        if (this.updateSearchParams) {
          this.updateSearchParams();
        }
      }
    );
  };

  updateSearchParams = () => {
    const { history, location } = this.props;
    const { paging, filter } = this.state;
    const params = {
      ...filter,
      page: paging.page
    };

    history.push({
      pathname: location.pathname,
      search: "?" + querystring.stringify(pickBy(params, identity))
    });
  };
}

export default FilterList;
