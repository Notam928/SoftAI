import React from "react";
import { useState, useEffect } from "react";
import { Form,Table } from "react-bootstrap";
import API from "../API";
import Button from 'react-bootstrap/Button';
import { Trash,PencilSquare } from 'react-bootstrap-icons';

const ClientModule = ({ onAdd }) => {
  const [nom, setNom] = useState("");
  const [prenom ,setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [quartier, setQuartier] = useState("");
  const [clientId, setClientId] = useState(0);
  const [clients, setClients] = useState([]);
  

  useEffect(() => {
    refreshClients();
  }, []);

  const refreshClients = () => {
    API.get("/")
      .then((res) => {
        setClients(res.data);
      
      })
      .catch(console.error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let item = {nom , prenom, telephone, adresse, quartier };
    API.post("/", item).then(() => refreshClients());
  };

  const onUpdate = (id) => {
    let item = { nom , prenom, telephone, adresse, quartier };
    API.patch(`/${id}/`, item).then((res) => refreshClients());
  };

  const onDelete = (id) => {
    API.delete(`/${id}/`).then((res) => refreshClients());
  };

  function selectEmploye(id) {
    let item = clients.filter((client) => client.id === id)[0];
    setNom(item.nom);
    setPrenom(item.prenom);
    setTelephone(item.telephone);
    setAdresse(item.adresse);
    setQuartier(item.quartier);
    setClientId(item.id);
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
        <h3 className="float-left" style={{fontFamily:'garamond'}}><b>Ajouter ou Modifier Clients</b></h3>
<Form onSubmit={onSubmit} className="mt-4" style={{fontFamily:'garamond'}}>

  <Form.Group className="mb-3" controlId="formBasicName">
    <Form.Label><b>Nom</b></Form.Label>
    <Form.Control
      type="text"
      placeholder="Entrer votre nom"
      value={nom}
      onChange={(e) => setNom(e.target.value)}
    />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicName">
    <Form.Label><b>Prenom</b></Form.Label>
    <Form.Control
      type="text"
      placeholder="Enter votre prenom"
      value={prenom}
      onChange={(e) => setPrenom(e.target.value)}
    />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicName">
    <Form.Label><b>Telephone</b></Form.Label>
    <Form.Control
      type="text"
      placeholder="Enter votre telephone"
      value={telephone}
      onChange={(e) => setTelephone(e.target.value)}
    />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicGenre">
    <Form.Label><b>Adresse</b></Form.Label>
    <Form.Control
      type="text"
      placeholder="Enter votre adresse"
      value={adresse}
      onChange={(e) => setAdresse(e.target.value)}
    />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicGenre">
    <Form.Label><b>Quartier</b></Form.Label>
    <Form.Control
      type="text"
      placeholder="Enter votre quartier"
      value={quartier}
      onChange={(e) => setQuartier(e.target.value)}
    />
  </Form.Group>
           
            
            
            <div className="float-right">
              <Button
                variant="primary"
                type="submit"
                onClick={onSubmit}
                className="mx-2"
                style={{fontFamily:'garamond'}}
              >
                Enregistrer
              </Button>
              <Button
                variant="warning"
                type="button"
                onClick={() => onUpdate(clientId)}
                className="mx-2"
                style={{fontFamily:'garamond'}}
              >
                Update
              </Button>
            </div>
          </Form>
        </div>


        <div className="col-md-8 m">
          <h3 className="center" style={{fontFamily:'garamond', padding:'15px'}}><b>Liste des Clients</b></h3>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr style={{fontFamily:'garamond'}}>
                <th scope="col">No</th>
                <th scope="col">Nom</th>
                <th scope="col">Prenom</th>
                <th scope="col">Telephone</th>
                <th scope="col">Adresse</th>
                <th scope="col">Quartier</th>
                <th scope="col">Update|Delete</th>
              </tr>
            </thead>
            <tbody style={{fontFamily:'garamond'}}>
              {clients.map((client, index) => {
                return (
                  <tr key="">
                    <th scope="row">{client.id}</th>
                    <td> {client.nom}</td>
                    <td> {client.prenom}</td>
                    <td> {client.telephone}</td>
                    <td> {client.adresse}</td>
                    <td> {client.quartier}</td>
                    <td>
                      <Button
                        
                        onClick={() => selectEmploye(client.id)}
                      >
                        <PencilSquare/>
                      </Button>
                      <Button
                        variant = "danger"
                        onClick={() => onDelete(client.id)}
                      >
                        <Trash/>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ClientModule;