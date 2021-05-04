import * as React from "react";
import {Button, TextField} from '@material-ui/core';
import {StylesDictionary} from "../../utils/stylesDictionary";
import {useEffect, useState} from "react";
import * as CompanySettingsApi from "../../api/companySettingsApi";
import {getDbUserCompanyId} from "../../utils/userUtil";
import CompanySettings from "../../models/companySettings";

export const CompanySettingsForm: React.FunctionComponent = (props) => {
  // TODO add error on too small values
  const [androidIntervalRecording, setAndroidIntervalRecording] = useState<number|undefined>();
  const [androidIntervalSynchronization, setAndroidIntervalSynchronization] = useState<number|undefined>();

  useEffect(() => {
    (async function() {
      const companySettings = await CompanySettingsApi.getCompanySettings();
      if (companySettings) {
        setAndroidIntervalRecording(companySettings.androidIntervalRecording);
        setAndroidIntervalSynchronization(companySettings.androidIntervalSynchronization);
      }
    })();
  }, []);

  async function onSubmit(event: any) {
    event.preventDefault();

    const companyId = await getDbUserCompanyId();

    if(companyId && androidIntervalRecording && androidIntervalSynchronization) {
      const companySettings = new CompanySettings(companyId, androidIntervalRecording, androidIntervalSynchronization);
      await CompanySettingsApi.editCompanySettings(companySettings)
    }
  }

  return (
      <form onSubmit={(event) => onSubmit(event)} style={styles.container}>
        <div>Android: frequency of data recording to local DB, мс</div>
        <TextField
            value={androidIntervalRecording}
            onChange={event => setAndroidIntervalRecording(+event.target.value)}
            type="number"
            style={styles.textInput}
        />
        <div>Android: frequency of data synchronization with Data processing service, мс</div>
        <TextField
            value={androidIntervalSynchronization}
            onChange={event => setAndroidIntervalSynchronization(+event.target.value)}
            type="number"
            style={styles.textInput}
        />

        <Button disabled={!androidIntervalRecording || !androidIntervalSynchronization} variant='contained' type='submit' color='primary' style={styles.button}>
          Save
        </Button>
      </form>
  );
}

const styles: StylesDictionary  = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 20,
    marginRight: 20
  },
  textInput: {
    width: 300,
    marginTop: 5,
    marginBottom: 5,
  },
  button: {
    width: 200,
    marginTop: 20,
    alignSelf: 'center'
  }
};
