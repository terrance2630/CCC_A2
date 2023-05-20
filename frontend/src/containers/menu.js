import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

function Menu() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/scenario1">Scenario1</Nav.Link>
            <Nav.Link href="/scenario2">Scenario2</Nav.Link>
            <Nav.Link href="/scenario3">Scenario3</Nav.Link>
            <Nav.Link href="/mastodon">Mastodon</Nav.Link>
            <NavDropdown title="Test" id="basic-nav-dropdown">
              <NavDropdown.Item href="/chart">TestChart</NavDropdown.Item>
              <NavDropdown.Item href="/mapbox">Mapbox</NavDropdown.Item>
              <NavDropdown.Item href="/wordcloud">WordCloud</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/sentiment">SentimentChart</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
