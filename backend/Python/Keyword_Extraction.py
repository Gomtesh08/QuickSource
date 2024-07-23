from flask import Flask, request, jsonify


app = Flask(__name__)


@app.route('/process', methods=['POST'])
def process():
    data = request.get_json()
    sentence = data['sentence']
    keywords = extract_keywords(sentence)
    return jsonify({'keywords': keywords})

def extract_keywords(sentence):
    keywords = ['backend', 'frontend', 'courses', 'react', 'nodejs']  # Example keywords
    extracted_keywords = [keyword for keyword in keywords if keyword in sentence.lower()]
    return extracted_keywords

if __name__ == '__main__':
    app.run(debug=True)
