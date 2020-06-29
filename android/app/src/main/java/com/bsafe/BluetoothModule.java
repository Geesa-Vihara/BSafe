package com.bsafe;
 
import java.lang.Math;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import java.util.ArrayList;
import java.util.List;

import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;

import android.content.BroadcastReceiver;
import android.content.IntentFilter;
import android.content.Intent;
import android.content.Context;

import java.util.*;
import java.util.Set;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;
 

public class BluetoothModule  extends ReactContextBaseJavaModule  {
    
    private ListView lstvw;
    private ArrayAdapter aAdapter;
    private BluetoothAdapter bAdapter = BluetoothAdapter.getDefaultAdapter();
    private static Context context;
    private static ReactApplicationContext reactContext;
    private ArrayList discovered = new ArrayList();
    public String myStr="\n";
    public HashMap<String, Double> hmap = new HashMap<String, Double>();

    //bluetooth discovery
    private final BroadcastReceiver mReceiver = new BroadcastReceiver() {
        public void onReceive(Context context, Intent intent) {
            String action = intent.getAction();

            if (BluetoothAdapter.ACTION_DISCOVERY_STARTED.equals(action)) {
                //discovery starts, we can show progress dialog or perform other tasks
            } else if (BluetoothAdapter.ACTION_DISCOVERY_FINISHED.equals(action)) {
                //discovery finishes, dismis progress dialog
            } else if (BluetoothDevice.ACTION_FOUND.equals(action)) {
                       //bluetooth device found
                
                BluetoothDevice device = (BluetoothDevice) intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
                String devicename = device.getName();
                String macAddress = device.getAddress();
                double rssi = intent.getShortExtra(BluetoothDevice.EXTRA_RSSI,Short.MIN_VALUE);
                double dist=Math.pow(10, (-69-(-1*rssi))/(10*2));
                String myKey="Name: "+devicename+" MAC Address: "+macAddress;
                //if(rssi >= -45 && rssi <= -50) {
                    hmap.put(myKey,rssi);
                //}
                /* if(discovered.contains("Name: "+devicename+"MAC Address: "+macAddress+"Dist: "+dist)!=true) {
                    myStr=myStr+" "+devicename+" "+macAddress+" "+dist+"\n";
                    discovered.add("Name: "+devicename+"MAC Address: "+macAddress+"Dist: "+dist);
                    //showToast("Device found = " + device.getName());
                } */
                
            }
        }
    };

    public BluetoothModule(ReactApplicationContext reactContext) {
        super(reactContext); //required by React Native
        IntentFilter filter = new IntentFilter();
        filter.addAction(BluetoothDevice.ACTION_FOUND);
        filter.addAction(BluetoothAdapter.ACTION_DISCOVERY_STARTED);
        filter.addAction(BluetoothAdapter.ACTION_DISCOVERY_FINISHED);
        hmap.clear();
        reactContext.registerReceiver(mReceiver, filter);
        //this.reactContext = reactContext;
    }
    //bluetooth discovery
    // @Override
    // protected void onCreate(Bundle savedInstanceState) {
    //     IntentFilter filter = new IntentFilter();

    //     filter.addAction(BluetoothDevice.ACTION_FOUND);
    //     filter.addAction(BluetoothAdapter.ACTION_DISCOVERY_STARTED);
    //     filter.addAction(BluetoothAdapter.ACTION_DISCOVERY_FINISHED);

    //     reactContext.registerReceiver(mReceiver, filter);
    //     bAdapter.startDiscovery();
    // }
 
    @Override
    //getName is required to define the name of the module represented in JavaScript
    public String getName() { 
        return "Bluetooth";
    }
    
    //use this method to get the scanned bluetooth devices count
    @ReactMethod
    public void scanBluetoothDevices(Callback errorCallback, Callback successCallback) {
        try {
            if(bAdapter==null){
                System.out.println("Bluetooth Not Supported");
            }
            else{
                Set<BluetoothDevice> pairedDevices = bAdapter.getBondedDevices();
                ArrayList list = new ArrayList();
                String res="";
                if(pairedDevices.size()>0){
                    for(BluetoothDevice device: pairedDevices){
                        String devicename = device.getName();
                        String macAddress = device.getAddress();
                        list.add("Name: "+devicename+"MAC Address: "+macAddress);
                        res=res+"Name: "+devicename+"MAC Address: "+macAddress+"\n";
                    }                    
                }
                successCallback.invoke("Send number of scanned devices "+list.size()+" "+res);
            }
        } catch (IllegalViewOperationException e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    //bluetooth discovery
    @ReactMethod
    public void discoverDevices(Callback errorCallback, Callback successCallback) {
       try {
            if(bAdapter==null){
                System.out.println("Bluetooth Not Supported");
            }
            else{
                if (bAdapter.isDiscovering()){
                    bAdapter.cancelDiscovery();
                }                
                bAdapter.startDiscovery();                
                /* IntentFilter filter = new IntentFilter();

                filter.addAction(BluetoothDevice.ACTION_FOUND);
                filter.addAction(BluetoothAdapter.ACTION_DISCOVERY_STARTED);
                filter.addAction(BluetoothAdapter.ACTION_DISCOVERY_FINISHED);

                reactContext.registerReceiver(mReceiver, filter);
                bAdapter.startDiscovery(); */
                Set set = hmap.entrySet();
                Iterator iterator = set.iterator();
                myStr="\n";
                while(iterator.hasNext()) {
                    Map.Entry mentry = (Map.Entry)iterator.next();
                    myStr=myStr+mentry.getKey()+" "+mentry.getValue()+"\n";
                    /* System.out.print("key is: "+ mentry.getKey() + " & Value is: ");
                    System.out.println(mentry.getValue()); */
      }
                successCallback.invoke("Send discovered devices* "+hmap.size()+" * "+myStr);
           }
        } catch (IllegalViewOperationException e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void stopDiscoverDevices(Callback errorCallback, Callback successCallback) {
       try {
            if(bAdapter==null){
                System.out.println("Bluetooth Not Supported");
            }
            else{               
                if (bAdapter.isDiscovering()){
                    bAdapter.cancelDiscovery();
                }
           }
           successCallback.invoke("Stop discovering devices");

        } catch (IllegalViewOperationException e) {
            errorCallback.invoke(e.getMessage());
        }
    }
}