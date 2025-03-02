
import requests


FIREBASE_URL = "https://fcm.googleapis.com/v1/projects/nanamatrix-33226/messages:send"

# 📌 API URL
API_URL = "https://payload-3-0-notifcation.vercel.app/api/tokens?limit=300&where[project][equals]=679e65c11a796e5f7d1ab61b"
AUTH_TOKEN = "95d876e2-e718-4c52-8619-666857756687"
def fetch_data():
    """Fetches data from the API."""
    headers = {
        "Authorization": f"users API-Key {AUTH_TOKEN}"
    }
    
    try:
        response = requests.get(API_URL,headers=headers)
        response.raise_for_status()
        return response.json()  # Return JSON response
    except requests.exceptions.RequestException as e:
        print(f"❌ Error fetching data: {e}")
        return None





def send_firebase_notification(device_token, title, body):
    """Sends a push notification to a specific device token with title & description."""
    access_token = "ya29.c.c0ASRK0GYtt0DcAKeWHUz2ova1AF-44dUlEKhivUaHKUlHZs7OXAGnRBCJeqGBZmsoJUOjejTG1pm9TiVHDrm2xKxJfhrHJbGQ11SSr8SAmOxHptyMA8M06Y9Zveiuqy3Z8yLeC_kUMont6Av4mr0TZST1sNIrILwGENwz_Djg-N7QBp1gVci67efdlBF5e9I-LBx0GoDtRcUij31hu-RtupVtAyiiN_dBgtyokTZebMd3RHus3yj80RXfls6V1FfDmpPgkzH9MsLTAqhUyJVsIAIli6AjtM5un1arXadXxcPKjrecKsMeAlbtvt8mO1kD5XRfHQ-V5d39th7qAPi4YHLYpAGk7J-y8P0EE-siO5CzKLp6osjsBvTxawT387D6fcZthcm4grX3cn45erOxBZywrqXQc8J674tV25R2sSR2ntIowYdoqRMhoz1I_WU_a-vOrpYBxrsXXg1wp8nFZztg8xfIFvqUwUmdSqa_u4g3IiWvI_slY1tB-zcQxZqoYa28F4FamM_9bw7472qV83n4bmceI6Z5wSlu8-JJyroU55y1JiquiJOy9sU_IS6M57vvOXa5vz3p-tZbxaq-smlcpYaMkZQo5jIks1xQztydphn76qJR2vzRB0dieRt9qiZao9JW14YsYxerMYhwgaX_9p1B0fhb4om6oFz-dMpQlsjZSm2VrVdBgpjYmgf6_VOefsS5myrmlSs5uvtoI4sSVBXs13uQibmZJy1Z0YsbUxXunQjki6_RYSQY7zeXoxO9rexyMS740b3_URwuOFSx88j_ucXt2h7UBmJMsgfWa6v8IJ7lhxqqjizJlY5cMQd1Ra8In4RbggS5Uh7BXUauIyjr3dew4w_r_dlJMWV-6dFdaZ3VO-n1_r_mevznZ1cf8xiwb3wc1Vepsyo2MWYZBkOQc1ty0y8pmVIjgtRQRrz9y3Q278otln7219nwy0ls-kr1x4kyeVqiZuq4c1cB9s9xtIsVOr4nOnQ8MMJ0908O3yI2cF3"

    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }

    payload = {
        "message": {
            "token": device_token,  # 🔹 Target device token
            "notification": {
                "title": title,  # Title of notification
                "body": body  # Description of notification
            }
        }
    }

    try:
        response = requests.post(FIREBASE_URL, headers=headers, json=payload)
        response.raise_for_status()
        print(f"✅ Notification sent successfully: {response.json()}")
    except requests.exceptions.RequestException as e:
        print(f"❌ Error sending notification: {e}")






def get_unique_tokens():
    """Extracts unique tokens from API response."""
    data = fetch_data()

    if data and "docs" in data:
        tokens = [item["token"] for item in data["docs"] if "token" in item]  # Extract tokens
        unique_tokens = list(set(tokens))  # Remove duplicates using set()
        for token in unique_tokens:
            print(token)  # Print each unique token
            title = "रमज़ान मुबारक 📌"
            body = "रमज़ान के लिए बेहतर डील खरीदें, ✅ फलों और ✅ मिठाइयों पर विशेष छूट"
            send_firebase_notification(token, title, body)
        return unique_tokens
    return []

# 📌 EXECUTION
if __name__ == "__main__":
    print("🔍 Fetching data and extracting unique tokens...\n")
    unique_tokens = get_unique_tokens()

    if unique_tokens:
        print(f"✅ Found {len(unique_tokens)} unique tokens:\n")
        print(unique_tokens)  # Print unique tokens array
    else:
        print("❌ No tokens found.")
