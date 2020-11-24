import React, { useRef, useState } from 'react';
import { IonAlert, IonApp, IonContent, IonGrid, IonHeader, IonTitle, IonToolbar, IonRow, IonCol, IonItem, IonLabel, IonInput, IonCard, IonCardContent } from '@ionic/react';
import BmiControls from './components/BmiControls';
import BmiResult from './components/BmiResult';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import InputControl from './components/InputControl';

const App: React.FC = () => {
  const [ calculatedBmi, setCalculatedBmi] = useState<number>();
  const [error, setError] = useState<string>();
  const [calcUnits, setCalcUnits] = useState<'mkg' | 'ftlbs'>('mkg');

  const weightInput = useRef<HTMLIonInputElement>(null); //HTMLIonInputElement generic type, set to null
  const heightInput = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
    const enteredWeight = weightInput.current!.value; //shorthand for ternary function to avoid null pointer error (! means the value will never be null)
    const enteredHeight = heightInput.current!.value;

    if(!enteredHeight || !enteredWeight || +enteredWeight <= 0 || +enteredHeight <= 0 ){
      setError("Please enter a valid (non-negative) input number.");
      return;
    }

    const weightConversionFactor = calcUnits === 'ftlbs' ? 2.2 : 1;
    const heightConversionFactor = calcUnits === 'ftlbs' ? 3.28 : 1;
    const weight = +enteredWeight/ weightConversionFactor;
    const height = +enteredHeight/ heightConversionFactor;

    const bmi = weight / (height * height);

    setCalculatedBmi(bmi);
  };

  const resetInputs = () => {
    weightInput.current!.value = '';
    heightInput.current!.value = '';
  };

  const clearError = () => {
    setError('');
  };

  const selectCalcUnitHandler = (selectedValue: 'mkg' | 'ftlbs') => {
    setCalcUnits(selectedValue);
  };

  return (
  <React.Fragment> 
    <IonAlert isOpen={!!error} message={error} buttons={[{text:'Okay', handler: clearError}]}/> //!! converts string value to a boolean value
    <IonApp>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Bmi Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <InputControl selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler}/>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">
                  Your Height ({calcUnits ==='mkg'? 'meter' : 'feet'})
                </IonLabel>
                <IonInput type="number" ref={heightInput}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
            <IonItem>
                <IonLabel position="floating">
                  Your Weight ({calcUnits === 'mkg'? 'kg' : 'lbs'})
                </IonLabel>
                <IonInput type="number" ref={weightInput}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <BmiControls onCalculate={calculateBMI} onReset={resetInputs}/>
          {calculatedBmi && ( //if this is true, this will be rendered to the dom (keeps the bmi value inspite of reset)
            <BmiResult result={calculatedBmi}/>
          )} 
        </IonGrid>
      </IonContent>
    </IonApp>
  </React.Fragment>);
};

export default App;
