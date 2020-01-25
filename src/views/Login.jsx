import React from "react";
import Auth from "services/Auth";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col
} from "reactstrap";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            formError: "",
            isSubmitting: false
        };
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ isSubmitting: true, formError: "" });
        const { email, password } = this.state;

        Auth.login({
            email,
            password
        })
            .then((result) => {
                this.props.history.push("/app/index");
            })
            .catch(error => {
                let formError = "Error";
                if (error.status === 401 || error.status === 422) {
                    formError = "Username atau password tidak benar";
                } else if (!error.status) {
                    formError = "Silahkan periksa status anda, kalo jomblo ya nyadar lah !!!";
                }

                this.setState({ isSubmitting: false, formError });
            });
    };
    render() {
        const { email, password, formError, isSubmitting } = this.state;
        return (
            <>
                <Col lg="5" md="7">
                    <Card className="bg-secondary shadow border-0">
                        <CardHeader className="bg-transparent pb-5">
                            <div className="text-muted text-center mt-2 mb-3">
                                <small>Sign in with</small>
                            </div>
                            <div className="btn-wrapper text-center">
                                <Button
                                    className="btn-neutral btn-icon"
                                    color="default"
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                >
                                    <span className="btn-inner--icon">
                                        <img
                                            alt="..."
                                            src={require("assets/img/icons/common/github.svg")}
                                        />
                                    </span>
                                    <span className="btn-inner--text">
                                        Github
                                    </span>
                                </Button>
                                <Button
                                    className="btn-neutral btn-icon"
                                    color="default"
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                >
                                    <span className="btn-inner--icon">
                                        <img
                                            alt="..."
                                            src={require("assets/img/icons/common/google.svg")}
                                        />
                                    </span>
                                    <span className="btn-inner--text">
                                        Google
                                    </span>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardBody className="px-lg-5 py-lg-5">
                            <div className="text-center text-muted mb-4">
                                <small>Or sign in with credentials</small>
                            </div>
                            <Form role="form" onSubmit={this.handleSubmit}>
                                <p className="text-danger form-error">
                                    {formError}
                                </p>
                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-email-83" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="Email"
                                            type="email"
                                            value={email}
                                            onChange={event =>
                                                this.setState({
                                                    email: event.target.value
                                                })
                                            }
                                            required
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-lock-circle-open" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="Password"
                                            type="password"
                                            value={password}
                                            onChange={event =>
                                                this.setState({
                                                    password: event.target.value
                                                })
                                            }
                                            required
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <div className="custom-control custom-control-alternative custom-checkbox">
                                    <input
                                        className="custom-control-input"
                                        id=" customCheckLogin"
                                        type="checkbox"
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor=" customCheckLogin"
                                    >
                                        <span className="text-muted">
                                            Remember me
                                        </span>
                                    </label>
                                </div>
                                <div className="text-center">
                                    <Button
                                        className="my-4"
                                        color="primary"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        Sign in
                                    </Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                    <Row className="mt-3">
                        <Col xs="6">
                            <a
                                className="text-light"
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                            >
                                <small>Forgot password?</small>
                            </a>
                        </Col>
                        <Col className="text-right" xs="6">
                            <a
                                className="text-light"
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                            >
                                <small>Create new account</small>
                            </a>
                        </Col>
                    </Row>
                </Col>
            </>
        );
    }
}

export default Login;
