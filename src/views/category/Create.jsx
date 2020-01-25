import React from "react";
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
// import Select from "components/Select.jsx";
// import { find } from "lodash";
// import Dropzone from "react-dropzone-uploader";
// import "react-dropzone-uploader/dist/styles.css";

const imageMaxSize = 100000; // bytes

class CreateCategory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: ""
    };
  }

  componentWillMount() {}

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ isSubmitting: true, formError: "" });
    const { name, description } = this.state;
    Category.create({
      name,
      description
    })
      .then(() => {
        this.props.history.push("/app/category");
        toast.success("Berhasil!");
      })
      .catch((error) => {
        let formError = "Error";
        if (error) formError = error;
        this.setState({ isSubmitting: false, formError });
      });
  };

  render() {
    const { isSubmitting, name, description } = this.state;
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
                      <h3 className="mb-0">Tambah Kategori</h3>
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
                              Nama Kategori
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

                      <p></p>
                      <Row>
                        <Col lg="6" className="text-center">
                          <FormGroup>
                            <Button
                              color="danger"
                              onClick={() =>
                                this.props.history.push("/app/category")
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

export default CreateCategory;
