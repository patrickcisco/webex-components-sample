import '@momentum-ui/core/css/momentum-ui.min.css';
import '@webex/components/dist/css/webex-components.css';
import React, {useEffect, useState} from 'react';
import Webex from 'webex';
import WebexSDKAdapter from '@webex/sdk-component-adapter';
import {WebexAvatar, WebexDataProvider, WebexMeeting} from '@webex/components';

const webex = new Webex({
  credentials: '<CREDENTIALS>',
});
const adapter = new WebexSDKAdapter(webex);

function App() {
  const [adapterConnected, setAdapterConnected] = useState(false);
  useEffect(() => {
    // This is the suggested way to do async hooks.
    // Ref: https://github.com/facebook/react/issues/14326
    async function doConnect() {
      // Wait for the adapter to connect before rendering.
      await adapter.connect();
      setAdapterConnected(true);
    }
    doConnect();
    // On teardown, disconnect the adapter
    return () => {
      adapter.disconnect();
    }
  }, []);
  return (
    <div className="App">
      {
        adapterConnected && (
          <WebexDataProvider adapter={adapter}>
            <WebexMeeting meetingDestination="<sip, email, meeting id>"/>
          </WebexDataProvider>
        )
      }
    </div>
  );
}

export default App;