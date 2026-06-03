import os
import time
import requests
import json

# Printful API Key
PRINTFUL_API_KEY = os.getenv("PRINTFUL_API_KEY", "your_printful_api_key")
PRINTFUL_URL = "https://api.printful.com/orders"

def fetch_pending_orders():
    # In a real scenario, this would query MongoDB for orders with fulfillmentStatus == 'pending'
    # Mocking pending order data
    return [
        {
            "id": "ord_12345",
            "recipient": {
                "name": "Tony Stark",
                "address1": "10880 Malibu Point",
                "city": "Malibu",
                "state_code": "CA",
                "country_code": "US",
                "zip": "90265"
            },
            "items": [
                {
                    "sync_variant_id": 1234567, # ID from Printful
                    "quantity": 1
                }
            ]
        }
    ]

def dispatch_to_printful(order):
    headers = {
        "Authorization": f"Bearer {PRINTFUL_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "recipient": order["recipient"],
        "items": order["items"]
    }
    
    print(f"[SYS.AURA] Dispatching Order {order['id']} to Printful...")
    
    response = requests.post(PRINTFUL_URL, headers=headers, json=payload)
    
    if response.status_code in [200, 201]:
        print(f"[SYS.AURA] Order {order['id']} Successfully Dispatched.")
        # Update MongoDB Order status to 'sent_to_printful'
    else:
        print(f"[SYS.AURA] FAILED to dispatch {order['id']}: {response.text}")

def run_sync_daemon():
    print("[SYS.AURA] Initializing Printful Sync Daemon...")
    while True:
        pending_orders = fetch_pending_orders()
        for order in pending_orders:
            dispatch_to_printful(order)
            
        time.sleep(300) # Poll every 5 minutes

if __name__ == "__main__":
    # Ensure dependencies are met
    # pip install requests
    run_sync_daemon()
