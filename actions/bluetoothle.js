import {BleManager} from 'react-native-ble-plx';
import { Alert } from 'react-native';

const DeviceManager = new BleManager();

export const scan = function scan() {
    console.log("ble scanning.....")
    const subscription = DeviceManager.onStateChange((state) => {
        if (state === 'PoweredOn') {

          //scan for devices
          console.log("powered on")

          DeviceManager.startDeviceScan(null, null, (error, device) => {
            if (error) {
              console.log("error",error);
            }
            if (device !== null) {
                console.log("device found ----> [id,name]", device.id, device.name);
              //dispatch(addBLE(device));
            }
          });

          subscription.remove();
        }
        else{
            console.log("turn on bluetooth")
            Alert("Turn on bluetooth to scan nearby devices.")
        }
    }, true);
}