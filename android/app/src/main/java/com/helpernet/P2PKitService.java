package com.helpernet;

import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.util.Log;
import android.support.v4.app.NotificationCompat;

import com.facebook.react.bridge.Callback;

import java.util.UUID;

import ch.uepaa.p2pkit.ConnectionCallbacks;
import ch.uepaa.p2pkit.ConnectionResult;
import ch.uepaa.p2pkit.ConnectionResultHandling;
import ch.uepaa.p2pkit.KitClient;
import ch.uepaa.p2pkit.discovery.InfoTooLongException;
import ch.uepaa.p2pkit.discovery.P2pListener;
import ch.uepaa.p2pkit.discovery.Peer;

/**
 * Created by nico on 03/10/15.
 */
public class P2PKitService {

    private MainActivity mainActivity;
    private Boolean shouldStartP2P = true;
    private int mNotificationId = 001;
    private static final String API_KEY = "eyJzaWduYXR1cmUiOiJieXBGVEtaR1NVNVAzWW56ZmlDMDZ5TnRnRDZTVGRLbWNGQTFpYlpWVllCWGVpUllIazEvbEVpcG8xZVJzMTlyaW5Mb1VFNU53c3ozSk5xNkpYT0hwUVQ0YSthc1RWbHNJM3ZPS3dsOGhSZ2dzNE9zb09FUGY1UmdHZU9raEkvZHoxUzdvWGN3bUxScW45dVAydkF5NWI4anZYZ2xHZ2paajZ6YVBuVTFmb2M9IiwiYXBwSWQiOjEyODgsInZhbGlkVW50aWwiOjE2ODAwLCJhcHBVVVVJRCI6IkQ3MkIxNUM0LThGRjMtNEVDRi04RjY4LUIwQzhBNjEwRkRFMSJ9";
    private enum Topic {EMERGENCY, ASSISTANCE, MISC}
    private Boolean mWantToConnect = true;


    private int aroundCounter = 0;

    public int getPeopleAroundCounter() {
        return aroundCounter;
    }

    public Boolean wantToConnect() {
        return this.mWantToConnect;
    }

    private void pushNotification(Topic topic, String message) {

        String title = "";
        switch (topic) {
            case EMERGENCY:
                title = "Emgergency nearby";
                break;
            case ASSISTANCE:
                title = "Assistance needed";
                break;
            default:
                title = "Misc";
                break;
        }

        Intent notificationIntent = new Intent(mainActivity, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(mainActivity, 0, notificationIntent, 0);

        NotificationCompat.Builder mBuilder = new NotificationCompat.Builder(mainActivity)
                .setSmallIcon(R.drawable.notification_icon)
//                .setSound()
                .setColor(Color.rgb(250, 0, 0))
                .setVibrate(new long[]{0, 900, 500, 900, 500})
                .setContentIntent(pendingIntent)
                .setContentTitle(title)
                .setContentText(message);

        // Gets an instance of the NotificationManager service
        NotificationManager mNotifyMgr = (NotificationManager) this.mainActivity.getApplicationContext().getSystemService(Context.NOTIFICATION_SERVICE);

        // Builds the notification and issues it.
        mNotifyMgr.notify(mNotificationId, mBuilder.build());
        mNotificationId++;
    }

    public P2PKitService(MainActivity mainActivity) {
        this.mainActivity = mainActivity;
    }

    private static final String TAG = "P2PKit";

    public void enableKit() {
        final int statusCode = KitClient.isP2PServicesAvailable(mainActivity);
        if (statusCode == ConnectionResult.SUCCESS) {
            KitClient client = KitClient.getInstance(mainActivity);
            client.registerConnectionCallbacks(mConnectionCallbacks);

            if (client.isConnected()) {
                Log.d(TAG, "Client already initialized");
            } else {
                Log.d(TAG, "Connecting P2PKit client");
                client.connect(API_KEY);
            }
            mWantToConnect = false;
//            startP2PDiscovery();
        } else {
            mWantToConnect = true;
            ConnectionResultHandling.showAlertDialogForConnectionError(mainActivity, statusCode);
        }
    }

    public void disableKit() {
        KitClient.getInstance(mainActivity).disconnect();
        shouldStartP2P = true;
    }

    private final ConnectionCallbacks mConnectionCallbacks = new ConnectionCallbacks() {
        @Override
        public void onConnected() {
            Log.d(TAG, "Connected, about to connect P2P Discovery");
            if(shouldStartP2P) {
                 Log.d(TAG, "Connecting P2P Discovery");
                 startP2PDiscovery();
                 shouldStartP2P = true;
            }
        }

        @Override
        public void onConnectionSuspended() {
            //p2pkit is now disconnected
            Log.d(TAG, "Connection suspended");
            shouldStartP2P = true;
        }

        @Override
        public void onConnectionFailed(ConnectionResult connectionResult) {
            //connection failed, handle connectionResult
            Log.d(TAG, "connection failed");
            shouldStartP2P = true;
        }
    };

    private void startP2PDiscovery() {
        KitClient.getInstance(mainActivity).getDiscoveryServices().addListener(mP2pDiscoveryListener);
    }

    public void setP2PDiscoveryInfo(String message) {
        Log.e(TAG, "message: " + message);
        try {
            KitClient.getInstance(mainActivity).getDiscoveryServices().setP2pDiscoveryInfo(message.getBytes());
        } catch (InfoTooLongException e) {
            Log.e(TAG, "String too long!");
        }
    }

    private void handleMessage(String message, String id) {
        String[] parts = message.split("\\|");

        for (String part : parts) {

            String prefix;
            String payload;

            if (part.length() > 2) {
                prefix = part.substring(0, 2);
                payload = part.substring(2);
            } else {
                prefix = part;
                payload = "";
            }

            if (prefix.equals("NO")) {
                Log.d(TAG, "emergency message");

                pushNotification(Topic.EMERGENCY, payload);
                mainActivity.getEventEmitter().emitEmergency(payload, id, mainActivity.getReactContext());
            } else if (prefix.equals("OT")) {
                Log.d(TAG, "On the way message");
            } else if (prefix.equals("LO")) {
                Log.d(TAG, "location message");
                String[] locationStrings = payload.split(",");

                float lat = Float.parseFloat(locationStrings[0]);
                float lng = Float.parseFloat(locationStrings[1]);

                mainActivity.getEventEmitter().emitLocation(lat, lng, id, mainActivity.getReactContext());
            } else if (prefix.equals("OK")) {
                Log.d(TAG, "standard message");
                pushNotification(Topic.MISC, "OK");
            } else {
                throw new IllegalArgumentException("unsupported prefix");
            }
        }
    }

    private final P2pListener mP2pDiscoveryListener = new P2pListener() {

        @Override
        public void onStateChanged(final int state) {
            Log.d(TAG, "P2pListener | State changed: " + state);
        }

        @Override
        public void onPeerDiscovered(final Peer peer) {
            Log.d(TAG, "P2pListener | Peer discovered: " + peer.getNodeId() + " with info: " + new String(peer.getDiscoveryInfo()));
            // pushNotification(Topic.MISC, "Peer discovered: " + peer.getNodeId());

            aroundCounter++;
            try {
                mainActivity.getEventEmitter().emitAroundChanged(aroundCounter, mainActivity.getReactContext());
            } catch (Exception e) {
                Log.e(TAG, e.getMessage());
            }
            String content = new String(peer.getDiscoveryInfo());
            String id = peer.getNodeId().toString();
            handleMessage(content, id);

        }

        @Override
        public void onPeerLost(final Peer peer) {
            Log.d(TAG, "P2pListener | Peer lost: " + peer.getNodeId());
            if (aroundCounter > 0) {
                aroundCounter--;
                mainActivity.getEventEmitter().emitAroundChanged(aroundCounter, mainActivity.getReactContext());
            }
        }

        @Override
        public void onPeerUpdatedDiscoveryInfo(Peer peer) {
            Log.d(TAG, "P2pListener | Peer updated: " + peer.getNodeId() + " with new info: " + new String(peer.getDiscoveryInfo()));

            String id = peer.getNodeId().toString();
            String content = new String(peer.getDiscoveryInfo());

            handleMessage(content, id);
        }
    };
}
