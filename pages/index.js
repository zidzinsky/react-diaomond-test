import { React, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Button, Form, Row, Col, FloatingLabel, Stack } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
const schema = yup.object().shape({
  carat: yup.number().required(),
  color: yup.string().required(),
  cut: yup.string().required(),
  clarity: yup.string().required(),
});

const gridStyles = {
  maxWidth: 650 + 'px',
  border: '1px solid',
  margin: 'auto',
  padding: 10 + 'px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  alignContent: 'center',
  gap: 10 + 'px',
};

export default function Home() {
  const [priceObj, setPriceOb] = useState(null);

  return (
    <div className={styles.container}>
      <Head>
        <title>React UI Test</title>
        <meta name="description" content="Test app to calculate diamonds price" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>
        <a href="">Diamond Calcualtor</a>
      </h1>

      <Formik
        validateOnMount={true}
        validationSchema={schema}
        onSubmit={async (values, actions) => {
          const res = await fetch('/api/price', {
            body: JSON.stringify({ ...values }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          });

          const result = await res.json();
          console.dir(result);
          setPriceOb({ ...result });
          actions.setSubmitting(false);
        }}
        initialValues={{
          carat: null,
          color: null,
          cut: null,
          clarity: null,
        }}
      >
        {({ handleSubmit, handleChange, values, touched, isSubmitting, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <div className="grid" style={gridStyles}>
              <Form.Group
                as={Col}
                md="10"
                controlId="validationColor"
                className="position-relative"
                style={{ width: 100 + '%' }}
              >
                <FloatingLabel label="Carats">
                  <Form.Control
                    type="number"
                    name="carat"
                    value={values.carat}
                    onChange={handleChange}
                    isValid={touched.firstName && !errors.firstName}
                  ></Form.Control>
                </FloatingLabel>
              </Form.Group>
              <Form.Group
                as={Col}
                md="10"
                controlId="validationColor"
                className="position-relative"
                style={{ width: 100 + '%' }}
              >
                <FloatingLabel label="Color">
                  <Form.Select
                    name="color"
                    value={values.color}
                    onChange={handleChange}
                    aria-label="Select a color"
                    style={{ width: 100 + '%' }}
                  >
                    <option value="">Select a color</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                    <option value="H">H</option>
                    <option value="I">I</option>
                    <option value="J">J</option>
                  </Form.Select>
                </FloatingLabel>
              </Form.Group>
              <Form.Group
                as={Col}
                md="10"
                controlId="validationCut"
                className="position-relative"
                style={{ width: 100 + '%' }}
              >
                <FloatingLabel label="Cut">
                  <Form.Select name="cut" value={values.cut} onChange={handleChange} aria-label="Select a Cut">
                    <option value="">Select a cut</option>
                    <option value="Round">Round</option>
                    <option value="Triangle">Triangle</option>
                    <option value="Oval">Oval</option>
                    <option value="Square">Square</option>
                    <option value="Heart">Heart</option>
                  </Form.Select>
                </FloatingLabel>
              </Form.Group>
              <Form.Group
                as={Col}
                md="10"
                controlId="validationClarity"
                className="position-relative"
                style={{ width: 100 + '%' }}
              >
                <FloatingLabel label="Clarity">
                  <Form.Select
                    name="clarity"
                    value={values.clarity}
                    onChange={handleChange}
                    aria-label="Select a Clarity"
                  >
                    <option value="">Select a clarity</option>
                    <option value="IF">IF</option>
                    <option value="VVS1">VVS1</option>
                    <option value="VVS2">VVS2</option>
                    <option value="VS1">VS1</option>
                    <option value="VS2">VS2</option>
                    <option value="SI1">SI1</option>
                    <option value="SI2">SI2</option>
                  </Form.Select>
                </FloatingLabel>
              </Form.Group>
              <Stack gap={6} style={{ marginTop: 60 + 'px' }}>
                <p>
                  <span style={{ fontWeight: 'bold' }}>Price: </span>
                  {!priceObj ? (
                    'Hit Calculate to see the price'
                  ) : priceObj.success ? (
                    `${priceObj.value} ${priceObj.currency}`
                  ) : (
                    <span style={{ color: 'red' }}>{priceObj.msg}</span>
                  )}
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  disabled={Object.keys(errors).length > 0 || isSubmitting}
                >
                  {isSubmitting ? 'Calculating' : 'Calculate'}
                </Button>
              </Stack>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
