import React, { Component } from "react";
import { Container } from "semantic-ui-react";

class Home extends Component {
  state = {
    isLoading: false,
  };

  render() {
    const { isLoading } = this.state;
    return isLoading ? (
      <></>
    ) : (
      <Container>
        <div>HomePage</div>
      </Container>
    );
  }
}

export default Home;
