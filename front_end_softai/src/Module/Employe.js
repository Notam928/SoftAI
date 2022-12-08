import React from "react";
import { useState, useEffect } from "react";
import { Form,Table } from "react-bootstrap";
import API2 from "../API2";
import Button from 'react-bootstrap/Button';
import { Trash,PencilSquare } from 'react-bootstrap-icons';

const EmployeModule = ({ onAdd }) => {
  const [matricule, setMatricule] = useState("");
  const [nom, setNom] = useState("");
  const [prenom ,setPrenom] = useState("");
  const [departement, setDepartement] = useState("");
  const [dob, setDob] = useState("");
  const [employeId, setEmployeId] = useState(0);
  const [employes, setEmployes] = useState([]);
  

  useEffect(() => {
    refreshEmployes();
  }, []);

  const refreshEmployes = () => {
    API2.get("/")
      .then((res) => {
        setEmployes(res.data);
      
      })
      .catch(console.error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let item = {matricule, nom , prenom, departement, dob };
    API2.post("/", item).then(() => refreshEmployes());
  };

  const onUpdate = (id) => {
    let item = { matricule, nom , prenom, departement, dob};
    API2.patch(`/${id}/`, item).then((res) => refreshEmployes());
  };

  const onDelete = (id) => {
    API2.delete(`/${id}/`).then((res) => refreshEmployes());
  };

  function selectEmploye(id) {
    let item = employes.filter((employe) => employe.id === id)[0];
    setMatricule(item.matricule);
    setNom(item.nom);
    setPrenom(item.prenom);
    setDepartement(item.departement);
    setDob(item.dob);
    setEmployeId(item.id);
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
        <h3 className="float-left" style={{fontFamily:'garamond'}}><b>Ajouter ou Modifier Employes</b></h3>
<Form onSubmit={onSubmit} className="mt-4" style={{fontFamily:'garamond'}}>
<Form.Group className="mb-3" controlId="formBasicName">
    <Form.Label><b>Matricule</b></Form.Label>
    <Form.Control
      type="text"
      placeholder="Entrer le Matricule de L'employe"
      value={matricule}
      onChange={(e) => setMatricule(e.target.value)}
    />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicName">
    <Form.Label><b>Nom</b></Form.Label>
    <Form.Control
      type="text"
      placeholder="Entrer le nom"
      value={nom}
      onChange={(e) => setNom(e.target.value)}
    />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicName">
    <Form.Label><b>Prenom</b></Form.Label>
    <Form.Control
      type="text"
      placeholder="Enter le prenom"
      value={prenom}
      onChange={(e) => setPrenom(e.target.value)}
    />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicName">
    <Form.Label><b>Departement</b></Form.Label>
    <Form.Control
      type="text"
      placeholder="Enter le Departement"
      value={departement}
      onChange={(e) => setDepartement(e.target.value)}
    />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicGenre">
    <Form.Label><b>Date de Naissance</b></Form.Label>
    <Form.Control
      type="text"
      placeholder="Enter la Date de Naissance"
      value={dob}
      onChange={(e) => setDob(e.target.value)}
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
                onClick={() => onUpdate(employeId)}
                className="mx-2"
                style={{fontFamily:'garamond'}}
              >
                Update
              </Button>
            </div>
          </Form>
        </div>
        <div className="col-md-8 m">
          <h3 className="center" style={{fontFamily:'garamond',padding:'15px'}}><b>Liste des Employes</b></h3>
          <Table striped bordered hover variant="dark">
            <thead style={{fontFamily:'garamond'}}>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Matricule</th>
                <th scope="col">Nom</th>
                <th scope="col">Prenom</th>
                <th scope="col">Departement</th>
                <th scope="col">Dob</th>
                <th scope="col">Update|Delete</th>
              </tr>
            </thead>
            <tbody style={{fontFamily:'garamond'}}>
              {employes.map((employe, index) => {
                return (
                  <tr key="">
                    <th scope="row">{employe.id}</th>
                    <td> {employe.matricule}</td>
                    <td> {employe.nom}</td>
                    <td> {employe.prenom}</td>
                    <td> {employe.departement}</td>
                    <td> {employe.dob}</td>
                    <td>
                      <Button
                        
                        onClick={() => selectEmploye(employe.id)}
                      >
                        <PencilSquare/>
                      </Button>
                      <Button
                        variant = "danger"
                        onClick={() => onDelete(employe.id)}
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

export default EmployeModule;