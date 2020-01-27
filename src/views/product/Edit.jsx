import React from "react";
import Category from "services/Category";
import { toast } from "react-toastify";
// core components
import Header from "components/Headers/Header.jsx";
import Select from "components/Select.jsx";
import { find } from "lodash";
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
  Col,
  Spinner
} from "reactstrap";

// import "react-dropzone-uploader/dist/styles.css";

class EditProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: ""
    };
  }

  getData() {
    Product.get({ slug: this.props.match.params.slug }).then((result) => {
      this.setState({
        name: result.data.name,
        description: result.data.description
      });
    });
  }

  componentWillMount() {
    this.getData();
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ isSubmitting: true, formError: "" });
    const { name, description } = this.state;
    Product.update({
      name,
      description,
      slug: this.props.match.params.slug
    })
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
    const { isSubmitting, name, description, isLoading } = this.state;

    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col>
                      <h3 className="mb-0">Edit Kategory</h3>
                    </Col>
                  </Row>
                </CardHeader>

                <CardBody>
                  {isLoading ? (
                    <div className="text-center">
                      <Spinner
                        color="dark"
                        style={{ width: "4rem", height: "4rem" }}
                        type="grow"
                      />
                    </div>
                  ) : (
                    <Form role="form" onSubmit={this.onSubmit}>
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-name"
                              >
                                Nama
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
                                htmlFor="input-address"
                              >
                                Deskripsi
                              </label>
                              <Input
                                className="form-control-alternative"
                                value={description}
                                onChange={(event) =>
                                  this.setState({
                                    description: event.target.value
                                  })
                                }
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>

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
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default EditProduct;
