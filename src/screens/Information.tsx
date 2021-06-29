import React, { FC } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PopUpState } from '../redux/types/ModalTypes';
import { RootState } from '../redux/store';
import * as modalInteractors from '../redux/interactors/modalInteractors';
import { useStyles } from '../styles/InformationStyles';
import Login from '../components/NavbarComponents/UserLogin';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

interface StateProps {
  modal: PopUpState;
}

interface DispatchProps {
  closePopUpInteractor: typeof modalInteractors.showPopUpInteractor;
}
interface Props extends StateProps, DispatchProps {}

function getSteps() {
  return ['Catálogo de productos', 'Pedir asistencia', 'Hay asistentes disponibles', 'No hay asistentes disponibles'];
}

function getStepContent(step: any) {
  switch (step) {
    case 0:
      return `En la tienda se puede ver el catálogo disponible de los productos que están a la venta, en
              cada uno de los dispositivos.`;
    case 1:
      return `Si el cliente requiere de asistencia para saber más sobre un producto, 
              debe apretar "Details" del producto y luego en la parte inferior de la 
              pantalla apretar el botón "Get assistance".`;
    case 2:
      return `Si hay asistentes disponibles, se desplegará un mensaje indicándole al
              cliente que debe acercarse a la tablet de asistencia de la tienda.
              Desde aquí se podrá contactar mediante una videollamada con un asistente
              que le ayudará con todas sus dudas.`;
    case 3:
      return `En caso que no hayan asistentes disponibles, se desplegará un mensaje infromándole 
              al cliente y luego si este lo desea, podrá dejar su mail para que un asistente lo contacte posteriormente.`;
  }
}

const VerticalLinearStepper: FC<Props> = (props: Props) => {
  const { modal } = props;
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const closeModal = (): void => {
    props.closePopUpInteractor();
  };

  return (
    <div className={classes.root}>
      <Typography variant="h3" gutterBottom>
        Funcionamiento de la plataforma
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Virual Assistant es una plataforma que ofrece asistencia y ayuda a los clientes con el proceso de compra de
        manera virtual, a través de una videollamada. Esto permite que en tiempos de pandemia nuestros clientes puedan
        comprar de manera segura e informada, cubriendo todas las dudas que les puedan surgir. Aquí se puede encontrar
        información de los pasos que el cliente debe seguir.
      </Typography>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <div className={classes.textContainer}>
                <Typography>{getStepContent(index)}</Typography>
              </div>
              <div className={classes.actionsContainer}>
                <div>
                  <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                    Back
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>Now you are ready to use Virtual Assistance!</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
      {modal.open && <Login closePopUp={closeModal} />}
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    modal: state.modal,
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  ...bindActionCreators(
    {
      ...modalInteractors,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(VerticalLinearStepper);
