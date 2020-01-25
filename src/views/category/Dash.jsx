import React from "react";
import querystring from "querystring";
import FilterList from "components/FilterList.jsx";
import HeaderDash from "components/Headers/HeaderDash.jsx";
import Category from "services/Category";
// import Cookies from "js-cookie";

import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";

class Index extends FilterList {
  constructor(props) {
    super(props);
    const params = querystring.parse(props.location.search.substring(1));
    this.state = {
      show: false,
      data: [],
      images: [],
      paging: {
        page: params.page || 1,
        limit: params.limit || 10
      },
      isLoading: true,
      filter: {},
      alert: null,
      search: ""
    };
  }
  componentWillMount() {
    this.getData();
  }

  getData() {
    Category.get({ slug: this.props.match.params.slug }).then((result) => {
      console.log(result);
      this.setState({
        name: result.data[0].name,
        description: result.data[0].description
      });
    });
  }

  render() {
    const { name, description } = this.state;
    return (
      <>
        <HeaderDash />
        <Container className="mt--6" fluid>
          <Row>
            <Col className="order-xl-1" xl="12">
              <Card>
                <CardHeader>
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h1>Selamat datang, admin</h1>
                      <h3 className="mb-0">Detail Rumah Sakit</h3>
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
                          <tr style={{ verticalAlign: "top" }}>
                            <td>Deskripsi</td>
                            <p></p>
                            <td>:</td>
                            <td>{description}</td>
                          </tr>
                        </table>
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
export default Index;
