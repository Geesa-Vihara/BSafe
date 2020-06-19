package com.bsafe;
 
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;
 

public class BluetoothModule  extends ReactContextBaseJavaModule  {
    public BluetoothModule(ReactApplicationContext reactContext) {
        super(reactContext); //required by React Native
    }
 
    @Override
    //getName is required to define the name of the module represented in JavaScript
    public String getName() { 
        return "Bluetooth";
    }
    
    //use this method to get the scanned bluetooth devices count
    @ReactMethod
    public void scanBluetoothDevices(Callback errorCallback, Callback successCallback) {
        try {
            successCallback.invoke("Send number of scanned devices");
        } catch (IllegalViewOperationException e) {
            errorCallback.invoke(e.getMessage());
        }
    }
}