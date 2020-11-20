import { IonButton, IonCol, IonIcon, IonRow } from '@ionic/react/dist/types/components';
import { calculatorOutline, refreshOutline } from 'ionicons/icons';
import React from 'react'

const BmiControls: React.FC<{onCalculate: () => void; onReset: () => void}> = props => { //FC generic type of two functions that do not return anything
    return(
        <IonRow>
          <IonCol class="ion-text-left">
            <IonButton onClick={props.onCalculate}>
              <IonIcon slot="start" icon={calculatorOutline}/>
              Calculate
            </IonButton>
          </IonCol>
          <IonCol class="ion-text-right">
            <IonButton onClick={props.onReset}>
              <IonIcon slot="start" icon={refreshOutline}/>
              Reset
            </IonButton>
          </IonCol>
        </IonRow>
    );
};

export default BmiControls;