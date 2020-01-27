import React from "react";
import Table from "components/Table.jsx";
import Category from "services/Category";
import Product from "services/Product";
import querystring from "querystring";
import FilterList from "components/FilterList.jsx";
import Header from "components/Headers/Header.jsx";
import SweetAlert from "react-bootstrap-sweetalert";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { ReactComponent as Trash } from "../../assets/img/monst/trash.svg";
import { ReactComponent as Pencil } from "../../assets/img/monst/pencil.svg";
import { ReactComponent as Eye } from "../../assets/img/monst/eye.svg";

import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  InputGroupAddon,
  InputGroup,
  Input
} from "reactstrap";

class ProductList extends FilterList {
  constructor(props) {
    super(props);
    const params = querystring.parse(props.location.search.substring(1));
    this.state = {
      show: false,
      data: [],
      paging: {
        page: params.page || 1,
        limit: params.limit || 10
      },
      isLoading: true,
      filter: {},
      alert: null,
      search: ""
    };

    this.columns = [
      {
        name: "Nama Produk",
        selector: "name",
        compact: true,
        sortable: true
      },
      {
        name: "Stok",
        selector: "stok",
        compact: true,
        sortable: true
      },
      {
        name: "Harga",
        selector: "price",
        compact: true,
        sortable: true
      },
      {
        name: "Kategori",
        selector: "category_id.name",
        grow: 2,
        width: "130px",
        sortable: true
      },
      {
        name: "Action",
        selector: "_id",
        sortable: false,
        grow: 2,
        center: true,
        cell: (row) => (
          <Row noGutters={true} className="fixcol">
            <Col>
              <Button
                className="borcor"
                color="info"
                onClick={() => this.onClickDetail(row)}
                size="sm"
                title="Detail"
              >
                <Eye alt="detail" style={{ width: "15px", height: "15px" }} />
              </Button>
            </Col>
            <Col>
              <Button
                className="borcor btn-warn"
                // color="warning"
                onClick={() => this.onClickEdit(row)}
                size="sm"
                title="Edit"
              >
                <Pencil alt="edit" style={{ width: "15px", height: "15px" }} />
              </Button>
            </Col>
            {/* {!Cookies.get("category_admin") && ( */}
            <Col>
              <Button
                className="borcor btn-delete"
                onClick={() => this.onClickDelete(row)}
                size="sm"
                title="Delete"
              >
                <Trash alt="delete" style={{ width: "15px", height: "15px" }} />
              </Button>
            </Col>
            {/* )} */}
          </Row>
        )
      }
    ];
  }

  componentWillMount() {
    this.getData();
    // this.getDetail();
  }
  // getDetail() {
  //   Product.get({ slug: this.props.match.params.slug }).then((result) => {
  //     this.setState({
  //       name: result.data.name,
  //       stok: result.data.stok,
  //       price: result.data.price,
  //       category_id: result.data.category_id.name,
  //       selectedCategory: result.data,
  //       selectedProduct: result.data
  //     });
  //   });
  // }

  getData(name) {
    return Product.get({ ...this.state.paging, name }).then((result) => {
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

  onClickDetail = (selectedTask) => {
    this.props.history.push(`/app/product/${selectedTask.slug}`);
  };

  onClickAdd = () => {
    this.props.history.push(`/app/product/create`);
  };

  onClickEdit = (selectedTask) => {
    this.props.history.push(`/app/product/edit/${selectedTask.slug}`);
  };

  onClickDelete = (selectedTask) => {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Iya"
        cancelBtnText="Tidak"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="default"
        title="Apakah Anda yakin?"
        onCancel={() => this.hideAlert()}
        onConfirm={() => this.handleDelete(selectedTask.slug)}
      >
        <b>{selectedTask.name} akan dihapus lho!</b>
      </SweetAlert>
    );

    this.setState({
      alert: getAlert()
    });
  };

  handleDelete = (slug) => {
    Category.delete(slug).then((result) => {
      this.setState({
        isLoading: true
      });
      if (result.code === 400) {
        this.setState({ isLoading: false });
        toast.error(result.message);
        this.hideAlert();
      } else {
        this.getData();
        toast.success(result.message);
        this.hideAlert();
      }
    });
  };

  hideAlert = () => {
    this.setState({
      alert: null
    });
  };

  render() {
    const { data, paging, isLoading, alert, search } = this.state;

    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  {!Cookies.get("category_admin") && (
                    <Row>
                      <Col sm="6">
                        <Button color="primary" onClick={this.onClickAdd}>
                          <i className="fas fa-plus" />
                        </Button>
                      </Col>
                      <Col sm={{ size: 4, offset: 2 }}>
                        <InputGroup>
                          <Input
                            value={search}
                            placeholder="Cari Nama Kategori"
                            type="text"
                            onChange={(event) =>
                              this.setState({
                                search: event.target.value
                              })
                            }
                            onKeyPress={(event) => {
                              if (event.key === "Enter") {
                                this.getData(search);
                              }
                            }}
                          />
                          <InputGroupAddon addonType="prepend">
                            <Button
                              color="info"
                              onClick={() => this.getData(search)}
                            >
                              <i className="fas fa-search"></i>
                            </Button>
                          </InputGroupAddon>
                        </InputGroup>
                      </Col>
                    </Row>
                  )}
                </CardHeader>
                <CardBody>
                  <Table
                    data={data}
                    columns={this.columns}
                    progressPending={isLoading}
                    paging={paging}
                    onChangePaging={this.updatePaging}
                  />
                  {alert}
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default ProductList;
