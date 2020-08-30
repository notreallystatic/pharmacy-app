import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ChipInput from 'material-ui-chip-input';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';

export const AddMedicines = (props) => {
  const { addToast } = useToasts();
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    if (!props.user) props.history.push('/');
  }, []);

  useEffect(() => {
    console.log(medicines);
  });

  const handleDeleteMedicines = (chip, index) => {
    const filterdMedicines = medicines.filter((m) => {
      return m != chip;
    });
    setMedicines(filterdMedicines);
  };

  const onSubmit = () => {
    if (!medicines.length) {
      addToast(`You need to enter at least one medicine.🥱`, {
        appearance: 'warning',
        autoDismiss: true,
      });
    } else {
      axios
        .post('api/add', {
          meds: medicines,
          id: props.user._id,
        })
        .then((response) => {
          addToast(`Successfully added your new meds!🤩`, {
            appearance: 'success',
            autoDismiss: true,
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
      props.history.push('/');
    }
  };

  return (
    <Container className='my-3'>
      <Row className='justify-content-center'>
        <h3 className='text-center w-100 my-2'>Add new medicines:</h3>
        <Col xs={12} md={5} className='my-2'>
          <ChipInput
            style={{ width: '100%' }}
            value={medicines}
            onAdd={(chip) => setMedicines([...medicines, chip])}
            onDelete={(chip, index) => handleDeleteMedicines(chip, index)}
            placeholder='Add new medicines here!'
          />
        </Col>
      </Row>
      <Row className='flex centerH my-4'>
        <Button variant='dark' size='lg' onClick={onSubmit}>
          Add!
        </Button>
      </Row>
    </Container>
  );
};
