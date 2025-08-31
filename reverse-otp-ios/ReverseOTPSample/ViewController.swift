import UIKit

class ViewController: UIViewController {

    let apiKey = "your_api_key" // Replace with your API key

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }

    @IBAction func startVerification(_ sender: UIButton) {
        let sessionId = "user-123" // Replace with a unique session ID for each user

        // Start the verification flow
        startVerification(sessionId: sessionId) { result in
            switch result {
            case .success(let response):
                print("Start verification response:", response)
                // In a real application, you would now display the QR code or the WhatsApp link to the user
                // and wait for them to complete the verification.
            case .failure(let error):
                print("Error:", error)
            }
        }
    }

    func startVerification(sessionId: String, completion: @escaping (Result<[String: Any], Error>) -> Void) {
        let url = URL(string: "https://phone-verif.com/api/start-verification")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")

        let body: [String: Any] = [
            "session_id": sessionId,
            "api_key": apiKey
        ]

        request.httpBody = try? JSONSerialization.data(withJSONObject: body)

        let task = URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                completion(.failure(error))
                return
            }

            guard let data = data else {
                completion(.failure(NSError(domain: "", code: -1, userInfo: [NSLocalizedDescriptionKey: "No data"])))
                return
            }

            do {
                if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any] {
                    completion(.success(json))
                } else {
                    completion(.failure(NSError(domain: "", code: -1, userInfo: [NSLocalizedDescriptionKey: "Invalid JSON"])))
                }
            } catch {
                completion(.failure(error))
            }
        }

        task.resume()
    }
}
