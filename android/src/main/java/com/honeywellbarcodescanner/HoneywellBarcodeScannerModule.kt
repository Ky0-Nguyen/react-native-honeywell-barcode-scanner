package com.honeywellscanner

import android.util.Log
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.honeywell.aidc.*

class HoneywellScannerModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private var aidcManager: AidcManager? = null
    private var barcodeReader: BarcodeReader? = null

    override fun getName(): String {
        return "HoneywellScanner"
    }

    init {
        AidcManager.create(reactContext) { manager ->
            aidcManager = manager
            barcodeReader = manager.createBarcodeReader()
            try {
                barcodeReader?.claim()
                barcodeReader?.addBarcodeListener { event ->
                    val params = Arguments.createMap()
                    params.putString("data", event.barcodeData)
                    reactContext
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                        .emit("onBarcodeRead", params)
                }
            } catch (e: Exception) {
                Log.e("HoneywellScanner", "Error claiming reader: ${e.message}")
            }
        }
    }

    @ReactMethod
    fun startScan(promise: Promise) {
        try {
            barcodeReader?.softwareTrigger(true)
            promise.resolve("Started")
        } catch (e: Exception) {
            promise.reject("StartError", e)
        }
    }

    @ReactMethod
    fun stopScan(promise: Promise) {
        try {
            barcodeReader?.softwareTrigger(false)
            promise.resolve("Stopped")
        } catch (e: Exception) {
            promise.reject("StopError", e)
        }
    }
}
