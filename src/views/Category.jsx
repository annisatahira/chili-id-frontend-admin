import React from "react";
import Table from "components/Table.jsx";
import Category from "services/Category.js";
import dayjs from "dayjs";
import querystring from "querystring";
import FilterList from "components/FilterList.jsx";
import Header from "components/Headers/Header.jsx";
// import Tables from "views/examples/Tables.jsx"
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";

class CategoryList extends FilterList {
  constructor(props) {
    super(props);
    const params = querystring.parse(props.location.search.substring(1));
    this.state = {
      data: [],
      paging: {
        page: params.page || 1
      },
      isLoading: true,
      filter: {
        type: params.type || "",
        start_at: params.start_at || dayjs().format("YYYY-MM-DD"),
        end_at:
          params.end_at ||
          dayjs()
            .add(1, "day")
            .format("YYYY-MM-DD")
      }
    };

    this.columns = [
      {
        name: "Nama",
        selector: "name",
        grow: 2,
        sortable: true
      },
      {
        name: "Description",
        selector: "description",
        grow: 2,
        sortable: false
      },
      {
        name: "Action",
        selector: "_id",
        sortable: false,
        grow: 2,
        center: true,
        cell: (row) => (
          <Row noGutters={true}>
            <Col>
              <Button
                style={{ backgroundColor: "#FFD600", color: "white" }}
                onClick={() => this.onClickEdit(row)}
                size="sm"
                title="Edit"
              >
                <i className="fas fa-pen" />
              </Button>
            </Col>
            <Col>
              <Button
                color="danger"
                onClick={() => this.onClickDelete(row)}
                size="sm"
                title="Delete"
              >
                <i className="fas fa-trash" />
              </Button>
            </Col>
          </Row>
        )
      }
    ];
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    return Category.get({}).then((result) => {
      console.log(`Category data ${JSON.stringify(result)}`);
      this.setState({
        data: result.data,
        isLoading: false,
        paging: {
          total: result.meta.total,
          limit: result.meta.limit,
          page: result.meta.page,
          pages: result.meta.pages
        }
      });
    });
  }

  onClickEdit = (selectedTask) => {
    console.log(`Click Edit ${JSON.stringify(selectedTask)}`);
  };

  onClickDelete = (selectedTask) => {
    console.log(`Cilck Delete ${JSON.stringify(selectedTask)}`);
  };

  render() {
    const { data, filter, paging, isLoading, role } = this.state;

    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">List Category</h3>
                </CardHeader>
                <CardBody>
                  <Table
                    data={data}
                    columns={this.columns}
                    progressPending={isLoading}
                    paging={paging}
                  />
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default CategoryList;
