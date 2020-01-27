import React from "react";
import Product from "services/Product";
import Category from "services/Category";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
import { toast } from "react-toastify";
// core components
import Header from "components/Headers/Header.jsx";
import Select from "components/Select.jsx";
import { find } from "lodash";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";

const imageMaxSize = 100000; // bytes

class CreateProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      stok: "",
      price: "",
      category: "",
      isPreOrder: "",
      preorder_date_end: "",
      description: "",
      categories: [],
      images_path: []
    };
    this.handleOnDrop = this.handleOnDrop.bind(this);
  }

  handleOnDrop = (fileWithMeta, status, filesWithMeta) => {
    const files = filesWithMeta.map((obj) => obj.file);

    console.log(files);
    if (files && files.length > 0) {
      const img_filter = files.filter((file) => {
        // const currentFileType = file.type
        const currentFileSize = file.size;
        if (currentFileSize > imageMaxSize) {
          alert("File terlalu besar");
          return false;
        }
        return true;
      });
      const currentFile = files[0];

      console.log(currentFile);
      this.setState({ images_path: img_filter });
    }
  };

  componentWillMount() {
    this.getCategories();
  }

  getCategories() {
    return Category.get({ limit: 100 }).then((result) => {
      this.setState({
        categories: result.data.map((category) => {
          return {
            value: category._id,
            label: category.name
          };
        })
      });
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ isSubmitting: true, formError: "" });
    const {
      name,
      stok,
      price,
      category,
      isPreOrder,
      preorder_date_end,
      images_path,
      description
    } = this.state;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("stok", stok);
    formData.append("price", price);
    formData.append("category_id", category);
    formData.append("isPreorder", isPreOrder);
    formData.append("isPreorder", preorder_date_end);
    formData.append("description", description);
    images_path.forEach((image) => {
      formData.append("images_path", image);
    });
    console.log(this.state);
    Product.create(formData)
      .then(() => {
        this.props.history.push("/app/product");
        toast.success("Berhasil!");
      })
      .catch((error) => {
        let formError = "Error";
        if (error) formError = error;
        this.setState({ isSubmitting: false, formError });
      });
  };

  render() {
    const {
      isSubmitting,
      name,
      stok,
      price,
      isPreOrder,
      preorder_date_end,
      description,
      categories,
      category
    } = this.state;
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--5" fluid>
          <Row>
            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col>
                      <h3 className="mb-0">Tambah Produk</h3>
                    </Col>
                  </Row>
                </CardHeader>

                <CardBody>
                  <Form role="form" onSubmit={this.onSubmit}>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-name"
                            >
                              Nama Produk
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={name}
                              onChange={(event) =>
                                this.setState({
                                  name: event.target.value
                                })
                              }
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-name"
                            >
                              Stok
                            </label>
                            <Input
                              className="form-control-alternative"
                              rows="4"
                              value={stok}
                              onChange={(event) =>
                                this.setState({
                                  stok: event.target.value
                                })
                              }
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-name"
                            >
                              Harga
                            </label>
                            <Input
                              className="form-control-alternative"
                              rows="4"
                              value={price}
                              onChange={(event) =>
                                this.setState({
                                  price: event.target.value
                                })
                              }
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-name"
                            >
                              Kategori
                            </label>
                            <Select
                              className="form-control-alternative ft"
                              options={categories}
                              isClearable={true}
                              value={
                                categories
                                  ? find(categories, { value: category })
                                  : ""
                              }
                              onChange={(option) => {
                                this.setState({
                                  category: option.value
                                });
                              }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-name"
                            >
                              Apakah Pre Order
                            </label>
                            <Input
                              className="form-control-alternative"
                              rows="4"
                              value={isPreOrder}
                              onChange={(event) =>
                                this.setState({
                                  isPreOrder: event.target.value
                                })
                              }
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-name"
                            >
                              Batas Pre Order
                            </label>
                            <Input
                              className="form-control-alternative"
                              rows="4"
                              value={preorder_date_end}
                              onChange={(event) =>
                                this.setState({
                                  preorder_date_end: event.target.value
                                })
                              }
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Deskripsi
                            </label>
                            <Input
                              className="form-control-alternative"
                              rows="4"
                              value={description}
                              onChange={(event) =>
                                this.setState({
                                  description: event.target.value
                                })
                              }
                              type="textarea"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <div>
                            <label className="form-control-label">
                              Foto Produk
                            </label>
                            <Dropzone
                              onSubmit={this.handleOnDrop}
                              multiple={false}
                              accept="image/*"
                              inputContent="Upload foto di sini ..."
                              styles={{
                                dropzone: {
                                  minHeight: 300,
                                  maxHeight: 300,
                                  width: 300,
                                  marginLeft: 1
                                }
                              }}
                              autoUpload={false}
                              submitButtonContent={null}
                              onChangeStatus={this.handleOnDrop}
                              SubmitButtonComponent={null}
                            />
                          </div>
                        </Col>
                      </Row>

                      <p></p>
                      <Row>
                        <Col lg="6" className="text-center">
                          <FormGroup>
                            <Button
                              color="danger"
                              onClick={() =>
                                this.props.history.push("/app/product")
                              }
                            >
                              Batal
                            </Button>
                            <Button
                              color="success"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              Kirim
                            </Button>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default CreateProduct;
