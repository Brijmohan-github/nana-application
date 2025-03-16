
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
    access_token = "ya29.c.c0ASRK0GbIpULOyJG8WSallcEdAulDkXMz7hx1ZRfbl_nxj2oypCGC66OaOhpg_L7lu89yzS12UcBgFqEUF7dAggJT1MAl14ukTZkyNh3UUw0lNN-Gx2ziiat5UTQvKujac_QUT_sXk-PmIrim98NvybPLCwfSl_S0DsPZilFbp-Icl_Bj0CJiH5fSH91yBvkf-3L4NL34Dk_mYDReXcmC2_K79KWRs9mjag5Vx7IhbIRKQcFjKafZFhrxQZYclo3Y1WhWz4asEvzQd83TjE6GcLK2I4RspzVNpvbBIyGv4QBPCjIGETU8nX3OwaRgaCx_JjcfNtCf_4AGMaTdFNtsqrpEdrnHwB72HlyD_jVoHS3qJsqc68CisCVuE385C1UauY-nSM7rmyOvJvRVvbg0BModSYYaZVe1q74RyXQxnW_Wh46i_Ip6y8Rdgx9VZxUjIVScyybY-Rzej8c3FtJW2s7e4UU514nbj5W4BZ0pzcZsIJ16RuhOpUcjmyMvW7haW1QOBbkhQeYR21mQScjio5Zox0SZkd3nnlxhi7oz712S9WvnYQYywcaz3cSo3i7kqJ7qkQeQ0wexni31nJfe76O-cxVU-Bx7r4I_Wjx--hSzh3e26Jm5Mcnak0xoRjda1Swd_uwm0x73s7m1Ry4kVfM3nd_xchZnlM-M8h_xpjc1M7B3J2dZsvz830hrQzm37Yp6Qinhl1bu-h-5l-sQyk4jozj9XxhvMnsUOvM8cuz_t_fFFYyb_vBg_sOvgUn_42nI9lnd_t_aUero1rWo7z5VUj7F7IIMtUqUej1eqogQRx7kek4cY0g58YXuMxdfn4eIhSOIO9i3_bXvy5zZQS_eM0pj3c82RMmaM21RZFo1lke8hwRRl4RJjlWesjzModtxybS4Vy8kXjWqsORsfmS5ViUuRdMyIoncSgQY6Iaf2SVOh_h-pMYvoms5SrWyVpyassFxwth1pc3hpwum6S_5ZqbmrIhne8FSZ2WJ5F8Xbsj8Jr4aVwR"

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
            body = "रमज़ान के लिए बेहतर डील खरीदें,Angur 1 kg 90 rs केला 1 kg 45 rs  सेब   1 kg 160 rs  चीकू 1 kg 80  rs  खरबूजा 1 kg 55 rs  तरबूज 1 kg  30 rs संतरा  1 kg  60 rs खीरा  1 kg  25 rs  टमाटर  1 kg  20 rs Nimbu 250 gm 35 rs Papita 1 kg 50 rs Hari mirch 250 gm 15 rs Adrak 250 gm 20 rs Roohafza 01 bottel 150 rs, ✅ फलों और ✅ मिठाइयों पर विशेष छूट"
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
