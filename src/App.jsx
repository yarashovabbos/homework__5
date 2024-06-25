import React, { Component } from 'react';
import { Container, Table, Button, InputGroup, FormControl, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    contacts: [],
    search: '',
    filter: 'all',
    showModal: false,
    editIndex: null,
    newContact: {
      firstName: '',
      lastName: '',
      phone: '',
      gender: 'male',
    },
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      newContact: {
        ...this.state.newContact,
        [name]: value,
      },
    });
  };

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value });
  };

  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value });
  };

  handleShowModal = (index = null) => {
    if (index !== null) {
      this.setState({
        newContact: this.state.contacts[index],
        editIndex: index,
      });
    } else {
      this.setState({
        newContact: { firstName: '', lastName: '', phone: '', gender: 'male' },
        editIndex: null,
      });
    }
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { contacts, newContact, editIndex } = this.state;

    if (editIndex !== null) {
      contacts[editIndex] = newContact;
      toast.success('Contact updated successfully!');
    } else {
      contacts.push(newContact);
      toast.success('Contact added successfully!');
    }

    this.setState({ contacts, showModal: false });
  };

  handleDelete = (index) => {
    const contacts = this.state.contacts.filter((_, i) => i !== index);
    this.setState({ contacts });
    toast.error('Contact deleted successfully!');
  };

  filterContacts = () => {
    const { contacts, search, filter } = this.state;
    return contacts.filter(contact => {
      const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
      return (
        fullName.includes(search.toLowerCase()) &&
        (filter === 'all' || contact.gender === filter)
      );
    });
  };

  render() {
    const { newContact, showModal } = this.state;

    return (
      <Container className=''>
        <h1 className="my-1 text-center ">Contact App</h1>
        <InputGroup className="mb-0 mt-5  ">
          <FormControl  style={{width: '75%', margin: '0 auto'}}
            placeholder="Qidiruv ..."
            onChange={this.handleSearchChange}
          />
          <Form.Select className='' onChange={this.handleFilterChange}>
            <option value="all">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Select>
          <Button onClick={() => this.handleShowModal()}>Add Contact</Button>
        </InputGroup>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>N</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.filterContacts().map((contact, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{contact.firstName}</td>
                <td>{contact.lastName}</td>
                <td>{contact.phone}</td>
                <td>{contact.gender}</td>
                <td className=''>
                  <Button className='ms-1'  variant="primary" onClick={() => this.handleShowModal(index)}>Edit</Button>
                  <Button className='ms-5' variant="danger" onClick={() => this.handleDelete(index)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton >
            <Modal.Title className=' '>{this.state.editIndex !== null ? 'Edit Contact' : 'Add Contact '}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={newContact.firstName}
                  onChange={this.handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={newContact.lastName}
                  onChange={this.handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={newContact.phone}
                  onChange={this.handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  name="gender"
                  value={newContact.gender}
                  onChange={this.handleInputChange}
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Select>
              </Form.Group>
              <Button type="submit" variant="primary">
                {this.state.editIndex !== null ? 'Update' : 'Add'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <ToastContainer />
      </Container>
    );
  }
}

export default App;
