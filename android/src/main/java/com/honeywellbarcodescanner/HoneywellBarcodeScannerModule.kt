package com.honeywellbarcodescanner

import android.util.Log
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.honeywell.aidc.*

class HoneywellBarcodeScannerModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private var aidcManager: AidcManager? = null
    private var barcodeReader: BarcodeReader? = null
    private var isInitialized = false

    override fun getName(): String {
        return "HoneywellBarcodeScanner"
    }

    private fun initializeScanner() {
        if (isInitialized) return

        try {
            AidcManager.create(reactContext) { manager ->
                aidcManager = manager
                try {
                    barcodeReader = manager.createBarcodeReader()
                    barcodeReader?.let { reader ->
                        reader.claim()
                        reader.addBarcodeListener(object : BarcodeReader.BarcodeListener {
                            override fun onBarcodeEvent(event: BarcodeReadEvent) {
                                val params = Arguments.createMap()
                                params.putString("data", event.barcodeData)
                                reactContext
                                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                                    ?.emit("onBarcodeRead", params)
                            }

                            override fun onFailureEvent(event: BarcodeFailureEvent) {
                                Log.e("HoneywellBarcodeScanner", "Barcode read failed: ${event}")
                                val params = Arguments.createMap()
                                params.putString("error", event.toString())
                                reactContext
                                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                                    ?.emit("onBarcodeError", params)
                            }
                        })
                        isInitialized = true
                    }
                } catch (e: Exception) {
                    Log.e("HoneywellBarcodeScanner", "Error creating barcode reader: ${e.message}")
                }
            }
        } catch (e: Exception) {
            Log.e("HoneywellBarcodeScanner", "Error creating AidcManager: ${e.message}")
        }
    }

    @ReactMethod
    fun startScan(promise: Promise) {
        Log.d("HoneywellBarcodeScanner", "User pressed start scan button")
        try {
            if (!isInitialized) {
                initializeScanner()
            }

            barcodeReader?.let { reader ->
                reader.softwareTrigger(true)
                promise.resolve("Started")
            } ?: run {
                promise.reject("ERROR", "Barcode reader not initialized")
            }
        } catch (e: Exception) {
            promise.reject("StartError", e.message ?: "Unknown error")
        }
    }

    @ReactMethod
    fun stopScan(promise: Promise) {
        try {
            if (!isInitialized) {
                promise.reject("ERROR", "Barcode reader not initialized")
                return
            }

            barcodeReader?.let { reader ->
                reader.softwareTrigger(false)
                promise.resolve("Stopped")
            } ?: run {
                promise.reject("ERROR", "Barcode reader not initialized")
            }
        } catch (e: Exception) {
            promise.reject("StopError", e.message ?: "Unknown error")
        }
    }

    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        try {
            barcodeReader?.release()
            aidcManager?.close()
            isInitialized = false
        } catch (e: Exception) {
            Log.e("HoneywellBarcodeScanner", "Error releasing resources: ${e.message}")
        }
    }
}
