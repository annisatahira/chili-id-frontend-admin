import React from "react";
import Category from "services/Category";
import Header from "components/Headers/Header.jsx";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoding: true,
      name: "",
      description: ""
    };
  }
  getData() {
    console.log(this.props);
    Category.get({ slug: this.props.match.params.slug }).then((result) => {
      this.setState({
        name: result.data.name,
        description: result.data.description
      });
      // console.log(result);
    });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const { name, description } = this.state;
    console.log(name);
    return (
      <>
        <Header />
        <Container className="mt--6" fluid>
          <Row>
            <Col className="order-xl-1" xl="12">
              <Card>
                <CardHeader>
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Detail Category</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <table
                          style={{
                            borderCollapse: "separate",
                            borderSpacing: "0 1em"
                          }}
                        >
                          <tr>
                            <td style={{ verticalAlign: "bottom" }}>Nama</td>
                            <p></p>
                            <td style={{ verticalAlign: "bottom" }}>:</td>
                            <td style={{ verticalAlign: "bottom" }}>{name}</td>
                          </tr>

                          <tr>
                            <td style={{ verticalAlign: "top" }}>
                              Description
                            </td>
                            <p></p>
                            <td style={{ verticalAlign: "top" }}>:</td>
                            <td style={{ verticalAlign: "bottom" }}>
                              {description}
                            </td>
                          </tr>
                        </table>
                      </Col>
                      <Col className="text-right">
                        <Button
                          color="danger"
                          onClick={() =>
                            this.props.history.push("/app/category")
                          }
                        >
                          Back
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Profile;
