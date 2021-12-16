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

export default function Home() {
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
        onSubmit={console.log}
        initialValues={{
          carat: null,
          color: null,
          cut: null,
          clarity: null,
        }}
      >
        {({ handleSubmit, handleChange, values, touched, isSubmitting, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="g-2 mb-4">
              <Form.Group as={Col} md="6" controlId="validationCarat" className="position-relative">
                <FloatingLabel label="Carats">
                  <Form.Control
                    type="number"
                    name="carat"
                    value={values.carat}
                    onChange={handleChange}
                    isValid={touched.firstName && !errors.firstName}
                  ></Form.Control>
                </FloatingLabel>
                <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationColor" className="position-relative">
                <FloatingLabel label="Color">
                  <Form.Select name="color" value={values.color} onChange={handleChange} aria-label="Select a color">
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

                <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="g-2 mb-4">
              <Form.Group as={Col} md="6" controlId="validationCut" className="position-relative">
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

                <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationClarity" className="position-relative">
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

                <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Stack className="col-md-5 mx-auto">
              <Button
                variant="primary"
                size="lg"
                type="submit"
                disabled={Object.keys(errors).length > 0 || isSubmitting}
              >
                Calculate
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </div>
  );
}
