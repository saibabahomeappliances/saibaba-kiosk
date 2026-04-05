import requests
try:
    print("Fetching products...")
    r = requests.get('http://localhost:8000/api/products')
    print(f"Status: {r.status_code}")
    print(f"Body: {r.text}")
except Exception as e:
    print(f"Error: {e}")
