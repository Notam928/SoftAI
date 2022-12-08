import React from "react";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import API2 from "../API2";
import Button from 'react-bootstrap/Button';
import { Trash,PencilSquare } from 'react-bootstrap-icons';

const EditEmploye = ({ onedit }) => {
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
  
const onUpdate = (id) => {
    let item = { nom };
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
<div className="col-md-8 m">
          <table class="table">
            <thead>
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
            <tbody>
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
          </table>
        </div>

  );


}

export default EditEmploye;