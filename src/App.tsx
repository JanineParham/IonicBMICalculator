import React, { useRef, useState } from 'react';
import { IonApp, IonContent, IonGrid, IonHeader, IonTitle, IonToolbar, IonRow, IonCol, IonItem, IonLabel, IonInput, IonCard, IonCardContent } from '@ionic/react';
import BmiControls from './components/BmiControls';

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

const App: React.FC = () => {
  const [ calculatedBmi, setCalculatedBmi] = useState<number>();

  const weightInput = useRef<HTMLIonInputElement>(null); //HTMLIonInputElement generic type, set to null
  const heightInput = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
    const enteredWeight = weightInput.current!.value; //shorthand for ternary function to avoid null pointer error (! means the value will never be null)
    const enteredHeight = heightInput.current!.value;

    if(!enteredHeight || !enteredWeight){
      return;
    }

    const bmi = +enteredWeight / (+enteredHeight * +enteredHeight);

    setCalculatedBmi(bmi);
  };

  const resetInputs = () => {
    weightInput.current!.value = '';
    heightInput.current!.value = '';
  };

  return (
  <IonApp>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Bmi Calculator</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">
                Your Height
              </IonLabel>
              <IonInput ref={heightInput}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
          <IonItem>
              <IonLabel position="floating">
                Your Weight
              </IonLabel>
              <IonInput ref={weightInput}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <BmiControls onCalculate={calculateBMI} onReset={resetInputs}/>
        {calculatedBmi && ( //if this is true, this will be rendered to the dom (keeps the bmi value inspite of reset)
        <IonRow>
          <IonCol>
            <IonCard>
              <IonCardContent>
                <h2>{calculatedBmi}</h2>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>)}
      </IonGrid>
    </IonContent>
  </IonApp>);
};

export default App;
