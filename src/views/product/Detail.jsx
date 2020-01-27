import React from "react";
import Category from "services/Category";
import Product from "services/Product";
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

const IMAGE_URL = "http://localhost:3300/";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoding: true,
      name: "",
      stok: "",
      price: "",
      category: "",
      isPreOrder: "",
      preorder_date_end: "",
      images: [],
      description: "",
      selectedCategory: {},
      categories: []
    };
  }
  getData() {
    console.log(this.props);
    Product.get({ slug: this.props.match.params.slug }).then((result) => {
      const showImage = result.data.images_path
        ? result.data.images_path[0].path
        : "";
      this.setState({
        name: result.data.name,
        stok: result.data.stok,
        price: result.data.price,
        category: result.data.category_id.name,
        isPreOrder: result.data.isPreOrder,
        preorder_date_end: result.data.preorder_date_end,
        image: showImage ? `${IMAGE_URL}${showImage}` : [],
        images: result.data.images_path ? result.data.images_path : [],
        description: result.data.description
      });
      console.log(showImage ? `${IMAGE_URL}${showImage}` : []);
    });
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

  componentDidMount() {
    this.getData();
    this.getCategories();
  }

  render() {
    const {
      name,
      stok,
      price,
      category,
      isPreOrder,
      preorder_date_end,
      description,
      images
    } = this.state;

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
                      <h3 className="mb-0">Detail Produk</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="pl-lg-4">
                    <Row>
                      <div className="detailImagesWrapper align-items-center">
                        {images.map((image) => (
                          <img
                            className="detailImages"
                            alt=""
                            width="40%"
                            border-radius="4px"
                            src={`${IMAGE_URL}${image.path}`}
                          />
                        ))}
                      </div>
                      <br></br>

                      <Col lg="12">
                        <table
                          style={{
                            borderCollapse: "separate",
                            borderSpacing: "0 1em"
                          }}
                        >
                          <tr>
                            <td style={{ verticalAlign: "bottom" }}>
                              Nama Produk
                            </td>
                            <p></p>
                            <td style={{ verticalAlign: "bottom" }}>:</td>
                            <td style={{ verticalAlign: "bottom" }}>{name}</td>
                          </tr>

                          <tr>
                            <td style={{ verticalAlign: "top" }}>Stok</td>
                            <p></p>
                            <td style={{ verticalAlign: "top" }}>:</td>
                            <td style={{ verticalAlign: "bottom" }}>{stok}</td>
                          </tr>
                          <tr>
                            <td style={{ verticalAlign: "top" }}>Harga</td>
                            <p></p>
                            <td style={{ verticalAlign: "top" }}>:</td>
                            <td style={{ verticalAlign: "bottom" }}>{price}</td>
                          </tr>
                          <tr>
                            <td style={{ verticalAlign: "top" }}>Kategori</td>
                            <p></p>
                            <td style={{ verticalAlign: "top" }}>:</td>
                            <td style={{ verticalAlign: "bottom" }}>
                              {category}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ verticalAlign: "top" }}>Pre Order</td>
                            <p></p>
                            <td style={{ verticalAlign: "top" }}>:</td>
                            <td style={{ verticalAlign: "bottom" }}>
                              {isPreOrder}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ verticalAlign: "top" }}>
                              Batas Pre Order
                            </td>
                            <p></p>
                            <td style={{ verticalAlign: "top" }}>:</td>
                            <td style={{ verticalAlign: "bottom" }}>
                              {preorder_date_end}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ verticalAlign: "top" }}>Deskripsi</td>
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
                            this.props.history.push("/app/product")
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
