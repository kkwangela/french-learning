import SwiftUI
import WebKit

// Reusable WKWebView for rendering the local French Learning web app
struct LocalWebView: UIViewRepresentable {
    func makeUIView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        configuration.allowsInlineMediaPlayback = true
        configuration.mediaTypesRequiringUserActionForPlayback = []
        
        let webView = WKWebView(frame: .zero, configuration: configuration)
        webView.scrollView.bounces = true
        webView.isOpaque = false
        webView.backgroundColor = .clear

        // Load index.html from app bundle
        if let htmlPath = Bundle.main.path(forResource: "index", ofType: "html") {
            let fileUrl = URL(fileURLWithPath: htmlPath)
            webView.loadFileURL(fileUrl, allowingReadAccessTo: fileUrl.deletingLastPathComponent())
        } else if let bundleUrl = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "www") {
            webView.loadFileURL(bundleUrl, allowingReadAccessTo: bundleUrl.deletingLastPathComponent())
        }
        
        return webView
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {}
}

struct ContentView: View {
    var body: some View {
        LocalWebView()
            .edgesIgnoringSafeArea(.bottom)
    }
}

@main
struct VerbeMasterApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
