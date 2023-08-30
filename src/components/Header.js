import React, { useState, useEffect } from "react";
import { Form, Container, Nav, Navbar, NavDropdown, Row, Col, Image } from "react-bootstrap";
import { EyeFill, HouseFill } from "react-bootstrap-icons";
import { useNavigate, Link, NavLink } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate('');
  const [stories, setStories] = useState([])
  const [categories, setCategories] = useState([])
  const [SearchStory, setSearchStory] = useState("")
  const [user, setUser] = useState(null);
  const [chapteres, setChapteres] = useState([])
  useEffect(() => {
    fetch("http://localhost:9999/Categories")
      .then(res => res.json())
      .then(data => setCategories(data))
  }, [])
  useEffect(() => {
    fetch("http://localhost:9999/chapter")
      .then(res => res.json())
      .then(data => setChapteres(data))
  }, [])
  useEffect(() => {
    fetch("http://localhost:9999/Stories")
      .then(res => res.json())
      .then(data => setStories(data.filter(d => SearchStory.length>0 ? d.name.toUpperCase().startsWith(SearchStory.toUpperCase()): "")))
  }, [SearchStory])
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user"); 
    setUser(null);
    navigate("/login");
  };
  const handleOnclickTop = (e, id) => {
    navigate(`/detail/${id}`);
    setSearchStory("")
  }
  const handleSearchCat = (id) => {
    navigate(`/search?category=${id}`);
  } 
  return (
    <>
      <Container className="">
        <Row>
          <Col xs={4}></Col>
          <Col xs={4} className="position-relative mt-2">
            <Form.Group className="d-flex">
              <Form.Control
                type="search"
                placeholder="Tìm kiếm truyện"
                className="me-2"
                aria-label="Search"
                value={SearchStory}
                onChange={(e) => setSearchStory(e.target.value)}
              />
            </Form.Group>
            <ul style={{ zIndex: 100000 }} className={`list-unstyled m-0 p-0 position-absolute border form-control ${stories.length > 0 ? "" : "d-none"} ${SearchStory.length >= 1 ? "" : "d-none"}`}>
              {
                stories.map((story, index) => index<5?(
                  <li className="px-3" key={story.id}>
                    <Row key={story.id} className={""}>
                      <Col xs={12}>
                        <Row className={`pt-1 pb-1 ${index < stories.length - 1 ? "border-bottom" : ""}`} >
                          <Col xs={4} className="top_container_img" onClick={(e) => handleOnclickTop(e, story.id)}>
                            <img className="top_img_item" src={story.image} alt={story.name}></img>
                          </Col>
                          <Col xs={8}>
                            <ul className="top_container_detail p-0 m-0" id="collasible-nav-dropdown">
                              <li onClick={(e) => handleOnclickTop(e, story.id)} className="top_name_item pt-1 fw-bold">{story.name}</li>
                              <li>
                                <Row>
                                  <Col xs={7}>
                                    <p className="m-0 top_chapter_item">Chương {chapteres.length}</p>
                                  </Col>
                                  <Col xs={5}>
                                    <p className="m-0 top_view_item d-flex"><span className="m-0 me-1"><EyeFill /></span><span className="m-0">{story.view}</span></p>
                                  </Col>
                                </Row>
                              </li>
                              <li className="top_name_item fw-bold text-info">{story.author}</li>
                              <li className="top_name_item">
                                {
                                  categories.map(category => {
                                    return story.categoryId.map((s, i) => {
                                      if (category.id === s && i < story.categoryId.length - 1) {
                                        return category.name + ", "
                                      } else if (category.id === s && i < story.categoryId.length) {
                                        return category.name
                                      }
                                      return false
                                    })
                                  })
                                }
                              </li>
                            </ul>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </li>
                ):"")
              }
            </ul>
          </Col>
          <Col xs={4}>
            <Navbar collapseOnSelect expand="lg" className="">
              <Navbar.Collapse id="responsive-navbar-nav">
                {
                  user === null ?
                    (
                      <Nav>
                        <Nav.Link as={Link} className="fw-bold" to="/login">Đăng nhập</Nav.Link>
                        <Nav.Link as={Link} className="fw-bold" eventKey={2} to="/register">Đăng ký</Nav.Link>
                      </Nav>
                    ) :
                    (
                      <>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                        <NavDropdown className="fw-bold" title={<><Image className="rounded-5 border me-1" width={40} src={`${user.img === "" ? "https://cdn.landesa.org/wp-content/uploads/default-user-image.png" : user.img}`} alt={user.username} /> <span>{user.username}</span></>} id="basic-nav-dropdown">
                          <NavDropdown.Item as={Link} to="/author/addeditstory">Tạo truyện mới</NavDropdown.Item> 
                          {user.role === 2 && (<NavDropdown.Item as={Link} to="/author/mystory">Truyện của tôi</NavDropdown.Item> )} 
                          <NavDropdown.Item onClick={handleLogout}>
                            Logout
                          </NavDropdown.Item>
                        </NavDropdown>
                      </>
                    )
                }
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>
      </Container>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container className="">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link as={Link} to="/"><HouseFill className="pb-1" size={19} /><span className="ms-1 mt-1 fw-bold">Trang Chủ</span></Nav.Link>
            </Nav>
            <Nav className=""> 
              <NavDropdown title="Thể loại" id="collasible-nav-dropdown" className="fw-bold" >
                <Row>
                  <Col xs={4} className="">
                    <ul className="list-unstyled m-0 p-0 header_dropdown_width">
                      {
                        categories.map((category, index) => (
                          parseInt(categories.length / 3) > index ?
                            (
                              <li key={category.id} onClick={() => handleSearchCat(category.id)} className="px-3 pt-1 pb-1 fw-normal name_chapter"><Link to={"/"} className="text-decoration-none text-dark">{category.name}</Link> </li>
                            ) : ""
                        ))
                      }
                    </ul>
                  </Col>
                  <Col xs={4} className="">
                    <ul className="list-unstyled m-0 p-0">
                      {
                        categories.map((category, index) => (
                          parseInt(categories.length / 3) <= index && index < parseInt(categories.length / 3) * 2 ?
                            (
                              <li key={category.id} onClick={() => handleSearchCat(category.id)} className="px-3 pt-1 pb-1 fw-normal name_chapter"><Link to={"/"} className="text-decoration-none text-dảktext-decoration-none text-dark">{category.name}</Link> </li>
                            ) : ""
                        ))
                      }
                    </ul>
                  </Col>
                  <Col xs={4} className="">
                    <ul className="list-unstyled m-0 p-0">
                      {
                        categories.map((category, index) => (
                          parseInt(categories.length / 3) * 2 <= index ?
                            (
                              <li key={category.id} onClick={() => handleSearchCat(category.id)} className="px-3 pt-1 pb-1 fw-normal name_chapter"><Link to={"/"} className="text-decoration-none text-dảktext-decoration-none text-dark">{category.name}</Link> </li>
                            ) : ""
                        ))
                      }
                    </ul>
                  </Col>
                </Row>
              </NavDropdown>
            </Nav>
            <Nav className="me-auto">
            <Nav.Link as={Link}  to="/search"><span className="fw-bold">Tìm Truyện</span></Nav.Link>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
