import React, {useState, useEffect} from 'react';
import {View, Text, Button, TextInput, ActivityIndicator} from 'react-native';

import {Dialogflow_V2} from 'react-native-dialogflow';

const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

Dialogflow_V2.setConfiguration(
  'dialogflow-yqqugt@wooliesx-288713.iam.gserviceaccount.com',
  '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCh+XuqYNO6J6Bg\nYafMTfF2JP2aNhl7SiuLJi4Eze3CwrQW6XQkQg0KdpGBHHof1HKx8js+hwZt59ID\nGVAGzn93aiW7Qe2U5MoXyRni5v+7ipJKVNKUYbG6TdMr7nQEz2iHfENgbPQzxikd\nPghPf389T13Ni3gF+CLwvcYQRUvNurcGSYAuyypUOCQqmIyvrG9+BzXC7puoPTFq\nIf1zm7T6Jyx9XUgIQ5kH0lVD9TzwwTr5na3pDZGrIb6iRBP60MUXUDOV4gRpCO3x\nKJy1R7WuI373qK11FZRgTNXXXNLa45lIhRBIBWUGS1qbgL0XGkxvuRp2JrPX/KEp\ntizPJFETAgMBAAECggEAEeHs7NEW3xkL5Egz0eMTEwOfehyZ8JouN4UmFIK1yshb\nQKJSn8QpE2wmwVXnB8eZSBshvlQC+jRbY9syEiZPPVxbQRLUy5j81OZvdLUjK83v\nO8SkoRwuFo8MDvAbIALUHA00lRtCVMr+dAuKuFgvsJGoHg7VV/deyCxzhw1XgqV7\nAv64USdeRJbFghzfQdbDnDXu2DiPnif2244Qjs3y2T+CmuZ2qZtIwi9ERRPnyBTR\n3138eWEvsZ5BDHLzfDPZBf/CcDv4zajUOU5dhpXxE2YjUTFXVjrmsUU8xoy6JyxG\n4oGuDlGUP4w2FNlDvcE6K+epF+9Tpa1jNHDnp9ep9QKBgQDblesMH/jND27naZYM\nt1nJ0CFGcfGwmsnUkN0OH0hpCgoJgO2j6xGLrEZnCM998e1RPDQn5sAA1f1fOyDJ\nBa+VQ93X+SL9CVuUBK7miPjssGuJ+ZAhQiqd54GBdG0sSqofvK9kLa97m7XQB4o7\n3FtEGu33aRfeKS2qLS9rMQ6nNwKBgQC81cxjnDK1uRUXShkc7kqimh5doRORWo+U\nIYm2NhMFfLksK69lRlPzuZ/DaGBA82DffY3mnzHgn7fsdc2nuKtTCRweXikC9tIQ\nM9F6+3KVyFavywkMt98hax83c8cGpPFQH2Oniew+ZbP26a3YtWVcmrZnVUqSorBv\nYHBSPynbBQKBgGzvzkEgp20MCAg0QKWkXJ4bbDanlrD3ycNz7sbvzBuYSGx4kuys\nVPMHD5JUM6QW3pZbmMBm4MBJaT7Sdaxk7rvNhIR969a+yrj/LcnfECdUSrWTouZt\nDflyfbQ8j2DW1dmS4SyA4bsf/63p37Fc28ZI2d/ROm8T3Ly9V/YEy3E3AoGAG212\nXXV/jBOQ86wIj8IwxwNZq8HMpM0hk6N3bCbYhnCCON8zf6NCaGEqymgrquNuy6dh\n6ABxby3jug22TEkvYUUud1632D1fb4kHQTSqhQTvSmNUMiu21hTIGPbRDq8AeeHF\nSL1ouftts0xnutVGHrg+DC5AQaItvE+moNuZyb0CgYEAiP9WEfswhtSlXDrnzsXg\n/vnpGYbI6oNm19NyuI8IV7/A44fRoGyid0O5YvH8tPB6446P8FWtyk0tTI87R8lV\nKd7FPMz1CKkRp+GbXQZvoMRwerPwYlZaUL5vI+gNhuD7Hw6Jb3jv4xzEMzVsQVqo\nGjVl8pwSBc3zKyYZokgbI+8=\n-----END PRIVATE KEY-----\n',
  Dialogflow_V2.LANG_ENGLISH,
  'wooliesx-288713',
);

const Mic = () => {
  const [state, setState] = useState(0);
  const [listening, setListening] = useState(false);
  const [search, setSearch] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    Dialogflow_V2.onListeningStarted(() => {
      setListening(true);
      console.log('onListeningStarted');
    });

    Dialogflow_V2.onListeningCanceled(() => {
      setListening(false);
      console.log('onListeningCanceled');
    });
    Dialogflow_V2.onListeningFinished(() => {
      setListening(false);
      console.log('onListeningFinished');
    });
  }, []);

  const onSend = () => {
    console.log('pressed');

    Dialogflow_V2.requestQuery(
      search,
      (result) => {
        console.log('result', result);
        setResult(result.queryResult.fulfillmentText);
        setSearch('');
      },
      (error) => {
        console.log(error);
      },
    );
  };

  const onChangeText = (val) => {
    setSearch(val);
  };

  const onListen = async () => {
    await timeout(2000);
    if (listening) {
      Dialogflow_V2.finishListening();
      setListening(false);
    } else {
      console.log('in else');

      Dialogflow_V2.startListening(
        (result) => {
          console.log('in else2222');
          console.log(JSON.stringify(result));
        },
        (error) => {
          console.error(JSON.stringify(error));
        },
      );
      setListening(true);
    }
  };

  const getTitle = () => {
    if (!listening) return 'Record';
    if (listening) return 'Recording';
    return 'send';
  };
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 20,
      }}>
      <View style={{flex: 1}}>
        {/* <Button
          onPress={onListen}
          title={getTitle()}
          //   disabled={listening}
          color="#841584"
        /> */}
        <TextInput
          onChangeText={onChangeText}
          style={{
            height: 200,
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#eee',
            marginVertical: 10,
            textAlign: 'left',
            textAlignVertical: 'top',
          }}
          value={search}
        />
        <Button
          onPress={onSend}
          title={'send'}
          //   disabled={listening}
          color="green"
        />
        <ActivityIndicator size="small" color="green" animating={loading} />
        <Text>{result}</Text>
      </View>
    </View>
  );
};

export default Mic;
