#!/usr/bin/env python3
"""
Simple local development server for the French Learning Web App.
Runs on http://localhost:8080 (or next available port).
"""
import http.server
import socket
import socketserver
import os
import sys
import webbrowser

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

def get_lan_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return None

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Disable caching during development
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def run_server():
    port = PORT
    for attempt in range(10):
        try:
            with socketserver.TCPServer(("", port), Handler) as httpd:
                url = f"http://localhost:{port}"
                lan_ip = get_lan_ip()
                print(f"==================================================")
                print(f"  我要去巴黎 - French Learning App running at:")
                print(f"  Mac    --> {url}")
                if lan_ip:
                    print(f"  iPhone --> http://{lan_ip}:{port}")
                print(f"==================================================")
                print("Press Ctrl+C to stop the server.")
                try:
                    # Open browser if run interactively
                    if "--no-browser" not in sys.argv:
                        webbrowser.open(url)
                except Exception:
                    pass
                httpd.serve_forever()
                break
        except OSError as e:
            if "Address already in use" in str(e):
                port += 1
            else:
                raise e

if __name__ == "__main__":
    run_server()
