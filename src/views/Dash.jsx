import React from "react";
import FilterList from "components/FilterList.jsx";
import DashboardHospital from "../views/category/Dash.jsx";
import DashboardAdmin from "../../src/views/Index.jsx";
import Cookies from "js-cookie";

class Index extends FilterList {
  render() {
    return (
      <>
        <DashboardAdmin {...this.props} />}
      </>
    );
  }
}
export default Index;
